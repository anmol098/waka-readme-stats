import { __rest } from "tslib";
import { selector as parseSelector } from 'vega-event-selector';
import { isString, stringValue } from 'vega-util';
import { forEachSelection, STORE } from '.';
import { warn } from '../../log';
import { duplicate, keys, logicalExpr, varName } from '../../util';
import { OutputNode } from '../data/dataflow';
import { FilterNode } from '../data/filter';
import { forEachTransform } from './transforms/transforms';
import { DataSourceType } from '../../data';
export function parseUnitSelection(model, selDefs) {
    var _a;
    const selCmpts = {};
    const selectionConfig = model.config.selection;
    for (const name of keys(selDefs !== null && selDefs !== void 0 ? selDefs : {})) {
        const selDef = duplicate(selDefs[name]);
        const _b = selectionConfig[selDef.type], { fields, encodings } = _b, cfg = __rest(_b, ["fields", "encodings"]); // Project transform applies its defaults.
        // Set default values from config if a property hasn't been specified,
        // or if it is true. E.g., "translate": true should use the default
        // event handlers for translate. However, true may be a valid value for
        // a property (e.g., "nearest": true).
        for (const key in cfg) {
            // A selection should contain either `encodings` or `fields`, only use
            // default values for these two values if neither of them is specified.
            if ((key === 'encodings' && selDef.fields) || (key === 'fields' && selDef.encodings)) {
                continue;
            }
            if (key === 'mark') {
                selDef[key] = Object.assign(Object.assign({}, cfg[key]), selDef[key]);
            }
            if (selDef[key] === undefined || selDef[key] === true) {
                selDef[key] = (_a = cfg[key]) !== null && _a !== void 0 ? _a : selDef[key];
            }
        }
        const safeName = varName(name);
        const selCmpt = (selCmpts[safeName] = Object.assign(Object.assign({}, selDef), { name: safeName, events: isString(selDef.on) ? parseSelector(selDef.on, 'scope') : duplicate(selDef.on) }));
        forEachTransform(selCmpt, txCompiler => {
            if (txCompiler.has(selCmpt) && txCompiler.parse) {
                txCompiler.parse(model, selCmpt, selDef, selDefs[name]);
            }
        });
    }
    return selCmpts;
}
export function parseSelectionPredicate(model, selections, dfnode, datum = 'datum') {
    const stores = [];
    function expr(name) {
        const vname = varName(name);
        const selCmpt = model.getSelectionComponent(vname, name);
        const store = stringValue(vname + STORE);
        if (selCmpt.project.timeUnit) {
            const child = dfnode !== null && dfnode !== void 0 ? dfnode : model.component.data.raw;
            const tunode = selCmpt.project.timeUnit.clone();
            if (child.parent) {
                tunode.insertAsParentOf(child);
            }
            else {
                child.parent = tunode;
            }
        }
        if (selCmpt.empty !== 'none') {
            stores.push(store);
        }
        return (`vlSelectionTest(${store}, ${datum}` + (selCmpt.resolve === 'global' ? ')' : `, ${stringValue(selCmpt.resolve)})`));
    }
    const predicateStr = logicalExpr(selections, expr);
    return ((stores.length ? '!(' + stores.map(s => `length(data(${s}))`).join(' || ') + ') || ' : '') + `(${predicateStr})`);
}
export function parseSelectionBinExtent(selCmpt, extent) {
    const encoding = extent['encoding'];
    let field = extent['field'];
    if (!encoding && !field) {
        field = selCmpt.project.items[0].field;
        if (selCmpt.project.items.length > 1) {
            warn('A "field" or "encoding" must be specified when using a selection as a scale domain. ' +
                `Using "field": ${stringValue(field)}.`);
        }
    }
    else if (encoding && !field) {
        const encodings = selCmpt.project.items.filter(p => p.channel === encoding);
        if (!encodings.length || encodings.length > 1) {
            field = selCmpt.project.items[0].field;
            warn((!encodings.length ? 'No ' : 'Multiple ') +
                `matching ${stringValue(encoding)} encoding found for selection ${stringValue(extent.selection)}. ` +
                `Using "field": ${stringValue(field)}.`);
        }
        else {
            field = encodings[0].field;
        }
    }
    return `${selCmpt.name}[${stringValue(field)}]`;
}
export function materializeSelections(model, main) {
    forEachSelection(model, selCmpt => {
        const selection = selCmpt.name;
        const lookupName = model.getName(`lookup_${selection}`);
        model.component.data.outputNodes[lookupName] = selCmpt.materialized = new OutputNode(new FilterNode(main, model, { selection }), lookupName, DataSourceType.Lookup, model.component.data.outputNodeRefCounts);
    });
}
//# sourceMappingURL=parse.js.map