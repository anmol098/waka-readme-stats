import { __rest } from "tslib";
import { array } from 'vega-util';
import { isSingleDefUnitChannel } from '../../../channel';
import * as log from '../../../log';
import { hasContinuousDomain } from '../../../scale';
import { hash, keys, replacePathInField, varName, isEmpty } from '../../../util';
import { TimeUnitNode } from '../../data/timeunit';
export const TUPLE_FIELDS = '_tuple_fields';
export class SelectionProjectionComponent {
    constructor(...items) {
        this.items = items;
        this.hasChannel = {};
        this.hasField = {};
    }
}
const project = {
    has: () => {
        return true; // This transform handles its own defaults, so always run parse.
    },
    parse: (model, selCmpt, selDef) => {
        var _a, _b, _c;
        const name = selCmpt.name;
        const proj = (_a = selCmpt.project) !== null && _a !== void 0 ? _a : (selCmpt.project = new SelectionProjectionComponent());
        const parsed = {};
        const timeUnits = {};
        const signals = new Set();
        const signalName = (p, range) => {
            const suffix = range === 'visual' ? p.channel : p.field;
            let sg = varName(`${name}_${suffix}`);
            for (let counter = 1; signals.has(sg); counter++) {
                sg = varName(`${name}_${suffix}_${counter}`);
            }
            signals.add(sg);
            return { [range]: sg };
        };
        // If no explicit projection (either fields or encodings) is specified, set some defaults.
        // If an initial value is set, try to infer projections.
        // Otherwise, use the default configuration.
        if (!selDef.fields && !selDef.encodings) {
            const cfg = model.config.selection[selDef.type];
            if (selDef.init) {
                for (const init of array(selDef.init)) {
                    for (const key of keys(init)) {
                        if (isSingleDefUnitChannel(key)) {
                            (selDef.encodings || (selDef.encodings = [])).push(key);
                        }
                        else {
                            if (selDef.type === 'interval') {
                                log.warn(log.message.INTERVAL_INITIALIZED_WITH_X_Y);
                                selDef.encodings = cfg.encodings;
                            }
                            else {
                                (selDef.fields || (selDef.fields = [])).push(key);
                            }
                        }
                    }
                }
            }
            else {
                selDef.encodings = cfg.encodings;
                selDef.fields = cfg.fields;
            }
        }
        // TODO: find a possible channel mapping for these fields.
        for (const field of (_b = selDef.fields) !== null && _b !== void 0 ? _b : []) {
            const p = { type: 'E', field };
            p.signals = Object.assign({}, signalName(p, 'data'));
            proj.items.push(p);
            proj.hasField[field] = p;
        }
        for (const channel of (_c = selDef.encodings) !== null && _c !== void 0 ? _c : []) {
            const fieldDef = model.fieldDef(channel);
            if (fieldDef) {
                let field = fieldDef.field;
                if (fieldDef.aggregate) {
                    log.warn(log.message.cannotProjectAggregate(channel, fieldDef.aggregate));
                    continue;
                }
                else if (!field) {
                    log.warn(log.message.cannotProjectOnChannelWithoutField(channel));
                    continue;
                }
                if (fieldDef.timeUnit) {
                    field = model.vgField(channel);
                    // Construct TimeUnitComponents which will be combined into a
                    // TimeUnitNode. This node may need to be inserted into the
                    // dataflow if the selection is used across views that do not
                    // have these time units defined.
                    const component = {
                        timeUnit: fieldDef.timeUnit,
                        as: field,
                        field: fieldDef.field
                    };
                    timeUnits[hash(component)] = component;
                }
                // Prevent duplicate projections on the same field.
                // TODO: what if the same field is bound to multiple channels (e.g., SPLOM diag).
                if (!parsed[field]) {
                    // Determine whether the tuple will store enumerated or ranged values.
                    // Interval selections store ranges for continuous scales, and enumerations otherwise.
                    // Single/multi selections store ranges for binned fields, and enumerations otherwise.
                    let type = 'E';
                    if (selCmpt.type === 'interval') {
                        const scaleType = model.getScaleComponent(channel).get('type');
                        if (hasContinuousDomain(scaleType)) {
                            type = 'R';
                        }
                    }
                    else if (fieldDef.bin) {
                        type = 'R-RE';
                    }
                    const p = { field, channel, type };
                    p.signals = Object.assign(Object.assign({}, signalName(p, 'data')), signalName(p, 'visual'));
                    proj.items.push((parsed[field] = p));
                    proj.hasField[field] = proj.hasChannel[channel] = parsed[field];
                }
            }
            else {
                log.warn(log.message.cannotProjectOnChannelWithoutField(channel));
            }
        }
        if (selDef.init) {
            const parseInit = (i) => {
                return proj.items.map(p => (i[p.channel] !== undefined ? i[p.channel] : i[p.field]));
            };
            if (selDef.type === 'interval') {
                selCmpt.init = parseInit(selDef.init);
            }
            else {
                const init = array(selDef.init);
                selCmpt.init = init.map(parseInit);
            }
        }
        if (!isEmpty(timeUnits)) {
            proj.timeUnit = new TimeUnitNode(null, timeUnits);
        }
    },
    signals: (model, selCmpt, allSignals) => {
        const name = selCmpt.name + TUPLE_FIELDS;
        const hasSignal = allSignals.filter(s => s.name === name);
        return hasSignal.length > 0
            ? allSignals
            : allSignals.concat({
                name,
                value: selCmpt.project.items.map(proj => {
                    const { signals, hasLegend } = proj, rest = __rest(proj, ["signals", "hasLegend"]);
                    rest.field = replacePathInField(rest.field);
                    return rest;
                })
            });
    }
};
export default project;
//# sourceMappingURL=project.js.map