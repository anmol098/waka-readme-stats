import { isArray } from 'vega-util';
import { isColorChannel } from '../../channel';
import { title as fieldDefTitle, valueArray } from '../../channeldef';
import { isContinuousToContinuous } from '../../scale';
import { contains, getFirstDefined } from '../../util';
import { isSignalRef } from '../../vega.schema';
import { guideFormat, guideFormatType } from '../format';
import { getFirstConditionValue } from './encode';
export const legendRules = {
    direction: ({ direction }) => direction,
    format: ({ fieldOrDatumDef, legend, config }) => {
        const { format, formatType } = legend;
        return guideFormat(fieldOrDatumDef, fieldOrDatumDef.type, format, formatType, config, false);
    },
    formatType: ({ legend, fieldOrDatumDef, scaleType }) => {
        const { formatType } = legend;
        return guideFormatType(formatType, fieldOrDatumDef, scaleType);
    },
    gradientLength: params => {
        var _a, _b;
        const { legend, legendConfig } = params;
        return (_b = (_a = legend.gradientLength) !== null && _a !== void 0 ? _a : legendConfig.gradientLength) !== null && _b !== void 0 ? _b : defaultGradientLength(params);
    },
    labelOverlap: ({ legend, legendConfig, scaleType }) => { var _a, _b; return (_b = (_a = legend.labelOverlap) !== null && _a !== void 0 ? _a : legendConfig.labelOverlap) !== null && _b !== void 0 ? _b : defaultLabelOverlap(scaleType); },
    symbolType: ({ legend, markDef, channel, encoding }) => { var _a; return (_a = legend.symbolType) !== null && _a !== void 0 ? _a : defaultSymbolType(markDef.type, channel, encoding.shape, markDef.shape); },
    title: ({ fieldOrDatumDef, config }) => fieldDefTitle(fieldOrDatumDef, config, { allowDisabling: true }),
    type: ({ legendType, scaleType, channel }) => {
        if (isColorChannel(channel) && isContinuousToContinuous(scaleType)) {
            if (legendType === 'gradient') {
                return undefined;
            }
        }
        else if (legendType === 'symbol') {
            return undefined;
        }
        return legendType;
    },
    values: ({ fieldOrDatumDef, legend }) => values(legend, fieldOrDatumDef)
};
export function values(legend, fieldOrDatumDef) {
    const vals = legend.values;
    if (isArray(vals)) {
        return valueArray(fieldOrDatumDef, vals);
    }
    else if (isSignalRef(vals)) {
        return vals;
    }
    return undefined;
}
export function defaultSymbolType(mark, channel, shapeChannelDef, markShape) {
    var _a;
    if (channel !== 'shape') {
        // use the value from the shape encoding or the mark config if they exist
        const shape = (_a = getFirstConditionValue(shapeChannelDef)) !== null && _a !== void 0 ? _a : markShape;
        if (shape) {
            return shape;
        }
    }
    switch (mark) {
        case 'bar':
        case 'rect':
        case 'image':
        case 'square':
            return 'square';
        case 'line':
        case 'trail':
        case 'rule':
            return 'stroke';
        case 'arc':
        case 'point':
        case 'circle':
        case 'tick':
        case 'geoshape':
        case 'area':
        case 'text':
            return 'circle';
    }
}
export function clipHeight(legendType) {
    if (legendType === 'gradient') {
        return 20;
    }
    return undefined;
}
export function getLegendType(params) {
    const { legend } = params;
    return getFirstDefined(legend.type, defaultType(params));
}
export function defaultType({ channel, timeUnit, scaleType }) {
    // Following the logic in https://github.com/vega/vega-parser/blob/master/src/parsers/legend.js
    if (isColorChannel(channel)) {
        if (contains(['quarter', 'month', 'day'], timeUnit)) {
            return 'symbol';
        }
        if (isContinuousToContinuous(scaleType)) {
            return 'gradient';
        }
    }
    return 'symbol';
}
export function getDirection({ legendConfig, legendType, orient, legend }) {
    var _a, _b;
    return ((_b = (_a = legend.direction) !== null && _a !== void 0 ? _a : legendConfig[legendType ? 'gradientDirection' : 'symbolDirection']) !== null && _b !== void 0 ? _b : defaultDirection(orient, legendType));
}
export function defaultDirection(orient, legendType) {
    switch (orient) {
        case 'top':
        case 'bottom':
            return 'horizontal';
        case 'left':
        case 'right':
        case 'none':
        case undefined: // undefined = "right" in Vega
            return undefined; // vertical is Vega's default
        default:
            // top-left / ...
            // For inner legend, uses compact layout like Tableau
            return legendType === 'gradient' ? 'horizontal' : undefined;
    }
}
export function defaultGradientLength({ legendConfig, model, direction, orient, scaleType }) {
    const { gradientHorizontalMaxLength, gradientHorizontalMinLength, gradientVerticalMaxLength, gradientVerticalMinLength } = legendConfig;
    if (isContinuousToContinuous(scaleType)) {
        if (direction === 'horizontal') {
            if (orient === 'top' || orient === 'bottom') {
                return gradientLengthSignal(model, 'width', gradientHorizontalMinLength, gradientHorizontalMaxLength);
            }
            else {
                return gradientHorizontalMinLength;
            }
        }
        else {
            // vertical / undefined (Vega uses vertical by default)
            return gradientLengthSignal(model, 'height', gradientVerticalMinLength, gradientVerticalMaxLength);
        }
    }
    return undefined;
}
function gradientLengthSignal(model, sizeType, min, max) {
    const sizeSignal = model.getSizeSignalRef(sizeType).signal;
    return { signal: `clamp(${sizeSignal}, ${min}, ${max})` };
}
export function defaultLabelOverlap(scaleType) {
    if (contains(['quantile', 'threshold', 'log'], scaleType)) {
        return 'greedy';
    }
    return undefined;
}
//# sourceMappingURL=properties.js.map