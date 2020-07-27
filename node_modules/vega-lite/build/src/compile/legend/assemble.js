import { __rest } from "tslib";
import { LEGEND_SCALE_CHANNELS, SIGNAL_LEGEND_PROP_INDEX } from '../../legend';
import { keys, replaceAll, stringify, vals } from '../../util';
import { isSignalRef } from '../../vega.schema';
import { mergeLegendComponent } from './parse';
function setLegendEncode(legend, part, vgProp, vgRef) {
    var _a, _b, _c;
    legend.encode = (_a = legend.encode) !== null && _a !== void 0 ? _a : {};
    legend.encode[part] = (_b = legend.encode[part]) !== null && _b !== void 0 ? _b : {};
    legend.encode[part].update = (_c = legend.encode[part].update) !== null && _c !== void 0 ? _c : {};
    // TODO: remove as any after https://github.com/prisma/nexus-prisma/issues/291
    legend.encode[part].update[vgProp] = vgRef;
}
export function assembleLegends(model) {
    const legendComponentIndex = model.component.legends;
    const legendByDomain = {};
    for (const channel of keys(legendComponentIndex)) {
        const scaleComponent = model.getScaleComponent(channel);
        const domainHash = stringify(scaleComponent.get('domains'));
        if (legendByDomain[domainHash]) {
            for (const mergedLegendComponent of legendByDomain[domainHash]) {
                const merged = mergeLegendComponent(mergedLegendComponent, legendComponentIndex[channel]);
                if (!merged) {
                    // If cannot merge, need to add this legend separately
                    legendByDomain[domainHash].push(legendComponentIndex[channel]);
                }
            }
        }
        else {
            legendByDomain[domainHash] = [legendComponentIndex[channel].clone()];
        }
    }
    const legends = vals(legendByDomain)
        .flat()
        .map(l => assembleLegend(l, model.config))
        .filter(l => l !== undefined);
    return legends;
}
export function assembleLegend(legendCmpt, config) {
    var _a, _b, _c;
    const _d = legendCmpt.combine(), { disable, labelExpr, selections } = _d, legend = __rest(_d, ["disable", "labelExpr", "selections"]);
    if (disable) {
        return undefined;
    }
    if (config.aria === false && legend.aria == undefined) {
        legend.aria = false;
    }
    if ((_a = legend.encode) === null || _a === void 0 ? void 0 : _a.symbols) {
        const out = legend.encode.symbols.update;
        if (out.fill && out.fill['value'] !== 'transparent' && !out.stroke && !legend.stroke) {
            // For non color channel's legend, we need to override symbol stroke config from Vega config if stroke channel is not used.
            out.stroke = { value: 'transparent' };
        }
        // Remove properties that the legend is encoding.
        for (const property of LEGEND_SCALE_CHANNELS) {
            if (legend[property]) {
                delete out[property];
            }
        }
    }
    if (!legend.title) {
        // title schema doesn't include null, ''
        delete legend.title;
    }
    if (labelExpr !== undefined) {
        let expr = labelExpr;
        if (((_c = (_b = legend.encode) === null || _b === void 0 ? void 0 : _b.labels) === null || _c === void 0 ? void 0 : _c.update) && isSignalRef(legend.encode.labels.update.text)) {
            expr = replaceAll(labelExpr, 'datum.label', legend.encode.labels.update.text.signal);
        }
        setLegendEncode(legend, 'labels', 'text', { signal: expr });
    }
    for (const prop in legend) {
        const propValue = legend[prop];
        if (isSignalRef(propValue)) {
            const propIndex = SIGNAL_LEGEND_PROP_INDEX[prop];
            if (propIndex) {
                const { vgProp, part } = propIndex;
                setLegendEncode(legend, part, vgProp, propValue);
                delete legend[prop];
            }
        }
    }
    return legend;
}
//# sourceMappingURL=assemble.js.map