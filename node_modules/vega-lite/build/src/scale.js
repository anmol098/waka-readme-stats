import { __rest } from "tslib";
import { isString, toSet } from 'vega-util';
import * as CHANNEL from './channel';
import { isColorChannel } from './channel';
import * as log from './log';
import { NOMINAL, ORDINAL, QUANTITATIVE, TEMPORAL } from './type';
import { contains, keys } from './util';
export const ScaleType = {
    // Continuous - Quantitative
    LINEAR: 'linear',
    LOG: 'log',
    POW: 'pow',
    SQRT: 'sqrt',
    SYMLOG: 'symlog',
    IDENTITY: 'identity',
    SEQUENTIAL: 'sequential',
    // Continuous - Time
    TIME: 'time',
    UTC: 'utc',
    // Discretizing scales
    QUANTILE: 'quantile',
    QUANTIZE: 'quantize',
    THRESHOLD: 'threshold',
    BIN_ORDINAL: 'bin-ordinal',
    // Discrete scales
    ORDINAL: 'ordinal',
    POINT: 'point',
    BAND: 'band'
};
/**
 * Index for scale categories -- only scale of the same categories can be merged together.
 * Current implementation is trying to be conservative and avoid merging scale type that might not work together
 */
export const SCALE_CATEGORY_INDEX = {
    linear: 'numeric',
    log: 'numeric',
    pow: 'numeric',
    sqrt: 'numeric',
    symlog: 'numeric',
    identity: 'numeric',
    sequential: 'numeric',
    time: 'time',
    utc: 'time',
    ordinal: 'ordinal',
    'bin-ordinal': 'bin-ordinal',
    point: 'ordinal-position',
    band: 'ordinal-position',
    quantile: 'discretizing',
    quantize: 'discretizing',
    threshold: 'discretizing'
};
export const SCALE_TYPES = keys(SCALE_CATEGORY_INDEX);
/**
 * Whether the two given scale types can be merged together.
 */
export function scaleCompatible(scaleType1, scaleType2) {
    const scaleCategory1 = SCALE_CATEGORY_INDEX[scaleType1];
    const scaleCategory2 = SCALE_CATEGORY_INDEX[scaleType2];
    return (scaleCategory1 === scaleCategory2 ||
        (scaleCategory1 === 'ordinal-position' && scaleCategory2 === 'time') ||
        (scaleCategory2 === 'ordinal-position' && scaleCategory1 === 'time'));
}
/**
 * Index for scale precedence -- high score = higher priority for merging.
 */
const SCALE_PRECEDENCE_INDEX = {
    // numeric
    linear: 0,
    log: 1,
    pow: 1,
    sqrt: 1,
    symlog: 1,
    identity: 1,
    sequential: 1,
    // time
    time: 0,
    utc: 0,
    // ordinal-position -- these have higher precedence than continuous scales as they support more types of data
    point: 10,
    band: 11,
    // non grouped types
    ordinal: 0,
    'bin-ordinal': 0,
    quantile: 0,
    quantize: 0,
    threshold: 0
};
/**
 * Return scale categories -- only scale of the same categories can be merged together.
 */
export function scaleTypePrecedence(scaleType) {
    return SCALE_PRECEDENCE_INDEX[scaleType];
}
export const CONTINUOUS_TO_CONTINUOUS_SCALES = ['linear', 'log', 'pow', 'sqrt', 'symlog', 'time', 'utc'];
const CONTINUOUS_TO_CONTINUOUS_INDEX = toSet(CONTINUOUS_TO_CONTINUOUS_SCALES);
export const QUANTITATIVE_SCALES = ['linear', 'log', 'pow', 'sqrt', 'symlog'];
const QUANTITATIVE_SCALES_INDEX = toSet(QUANTITATIVE_SCALES);
export function isQuantitative(type) {
    return type in QUANTITATIVE_SCALES_INDEX;
}
export const CONTINUOUS_TO_DISCRETE_SCALES = ['quantile', 'quantize', 'threshold'];
const CONTINUOUS_TO_DISCRETE_INDEX = toSet(CONTINUOUS_TO_DISCRETE_SCALES);
export const CONTINUOUS_DOMAIN_SCALES = CONTINUOUS_TO_CONTINUOUS_SCALES.concat([
    'quantile',
    'quantize',
    'threshold',
    'sequential',
    'identity'
]);
const CONTINUOUS_DOMAIN_INDEX = toSet(CONTINUOUS_DOMAIN_SCALES);
export const DISCRETE_DOMAIN_SCALES = ['ordinal', 'bin-ordinal', 'point', 'band'];
const DISCRETE_DOMAIN_INDEX = toSet(DISCRETE_DOMAIN_SCALES);
export const TIME_SCALE_TYPES = ['time', 'utc'];
export function hasDiscreteDomain(type) {
    return type in DISCRETE_DOMAIN_INDEX;
}
export function hasContinuousDomain(type) {
    return type in CONTINUOUS_DOMAIN_INDEX;
}
export function isContinuousToContinuous(type) {
    return type in CONTINUOUS_TO_CONTINUOUS_INDEX;
}
export function isContinuousToDiscrete(type) {
    return type in CONTINUOUS_TO_DISCRETE_INDEX;
}
export const defaultScaleConfig = {
    pointPadding: 0.5,
    barBandPaddingInner: 0.1,
    rectBandPaddingInner: 0,
    minBandSize: 2,
    minFontSize: 8,
    maxFontSize: 40,
    minOpacity: 0.3,
    maxOpacity: 0.8,
    // FIXME: revise if these *can* become ratios of width/height step
    minSize: 9,
    minStrokeWidth: 1,
    maxStrokeWidth: 4,
    quantileCount: 4,
    quantizeCount: 4
};
export function isExtendedScheme(scheme) {
    return !isString(scheme) && !!scheme['name'];
}
export function isSelectionDomain(domain) {
    return domain === null || domain === void 0 ? void 0 : domain['selection'];
}
export function isDomainUnionWith(domain) {
    return domain && domain['unionWith'];
}
const SCALE_PROPERTY_INDEX = {
    type: 1,
    domain: 1,
    domainMax: 1,
    domainMin: 1,
    domainMid: 1,
    align: 1,
    range: 1,
    rangeMax: 1,
    rangeMin: 1,
    scheme: 1,
    bins: 1,
    // Other properties
    reverse: 1,
    round: 1,
    // quantitative / time
    clamp: 1,
    nice: 1,
    // quantitative
    base: 1,
    exponent: 1,
    constant: 1,
    interpolate: 1,
    zero: 1,
    // band/point
    padding: 1,
    paddingInner: 1,
    paddingOuter: 1
};
export const SCALE_PROPERTIES = keys(SCALE_PROPERTY_INDEX);
const { type, domain, range, rangeMax, rangeMin, scheme } = SCALE_PROPERTY_INDEX, NON_TYPE_DOMAIN_RANGE_VEGA_SCALE_PROPERTY_INDEX = __rest(SCALE_PROPERTY_INDEX, ["type", "domain", "range", "rangeMax", "rangeMin", "scheme"]);
export const NON_TYPE_DOMAIN_RANGE_VEGA_SCALE_PROPERTIES = keys(NON_TYPE_DOMAIN_RANGE_VEGA_SCALE_PROPERTY_INDEX);
export function scaleTypeSupportProperty(scaleType, propName) {
    switch (propName) {
        case 'type':
        case 'domain':
        case 'reverse':
        case 'range':
            return true;
        case 'scheme':
        case 'interpolate':
            return !contains(['point', 'band', 'identity'], scaleType);
        case 'bins':
            return !contains(['point', 'band', 'identity', 'ordinal'], scaleType);
        case 'round':
            return isContinuousToContinuous(scaleType) || scaleType === 'band' || scaleType === 'point';
        case 'padding':
        case 'rangeMin':
        case 'rangeMax':
            return isContinuousToContinuous(scaleType) || contains(['point', 'band'], scaleType);
        case 'paddingOuter':
        case 'align':
            return contains(['point', 'band'], scaleType);
        case 'paddingInner':
            return scaleType === 'band';
        case 'domainMax':
        case 'domainMid':
        case 'domainMin':
        case 'clamp':
            return isContinuousToContinuous(scaleType);
        case 'nice':
            return isContinuousToContinuous(scaleType) || scaleType === 'quantize' || scaleType === 'threshold';
        case 'exponent':
            return scaleType === 'pow';
        case 'base':
            return scaleType === 'log';
        case 'constant':
            return scaleType === 'symlog';
        case 'zero':
            return (hasContinuousDomain(scaleType) &&
                !contains([
                    'log',
                    'time',
                    'utc',
                    'threshold',
                    'quantile' // quantile depends on distribution so zero does not matter
                ], scaleType));
    }
}
/**
 * Returns undefined if the input channel supports the input scale property name
 */
export function channelScalePropertyIncompatability(channel, propName) {
    switch (propName) {
        case 'interpolate':
        case 'scheme':
        case 'domainMid':
            if (!isColorChannel(channel)) {
                return log.message.cannotUseScalePropertyWithNonColor(channel);
            }
            return undefined;
        case 'align':
        case 'type':
        case 'bins':
        case 'domain':
        case 'domainMax':
        case 'domainMin':
        case 'range':
        case 'base':
        case 'exponent':
        case 'constant':
        case 'nice':
        case 'padding':
        case 'paddingInner':
        case 'paddingOuter':
        case 'rangeMax':
        case 'rangeMin':
        case 'reverse':
        case 'round':
        case 'clamp':
        case 'zero':
            return undefined; // GOOD!
    }
}
export function scaleTypeSupportDataType(specifiedType, fieldDefType) {
    if (contains([ORDINAL, NOMINAL], fieldDefType)) {
        return specifiedType === undefined || hasDiscreteDomain(specifiedType);
    }
    else if (fieldDefType === TEMPORAL) {
        return contains([ScaleType.TIME, ScaleType.UTC, undefined], specifiedType);
    }
    else if (fieldDefType === QUANTITATIVE) {
        return contains([
            ScaleType.LOG,
            ScaleType.POW,
            ScaleType.SQRT,
            ScaleType.SYMLOG,
            ScaleType.QUANTILE,
            ScaleType.QUANTIZE,
            ScaleType.THRESHOLD,
            ScaleType.LINEAR,
            undefined
        ], specifiedType);
    }
    return true;
}
export function channelSupportScaleType(channel, scaleType) {
    if (!CHANNEL.isScaleChannel(channel)) {
        return false;
    }
    switch (channel) {
        case CHANNEL.X:
        case CHANNEL.Y:
        case CHANNEL.THETA:
        case CHANNEL.RADIUS:
            return isContinuousToContinuous(scaleType) || contains(['band', 'point'], scaleType);
        case CHANNEL.SIZE: // TODO: size and opacity can support ordinal with more modification
        case CHANNEL.STROKEWIDTH:
        case CHANNEL.OPACITY:
        case CHANNEL.FILLOPACITY:
        case CHANNEL.STROKEOPACITY:
        case CHANNEL.ANGLE:
            // Although it generally doesn't make sense to use band with size and opacity,
            // it can also work since we use band: 0.5 to get midpoint.
            return (isContinuousToContinuous(scaleType) ||
                isContinuousToDiscrete(scaleType) ||
                contains(['band', 'point', 'ordinal'], scaleType));
        case CHANNEL.COLOR:
        case CHANNEL.FILL:
        case CHANNEL.STROKE:
            return scaleType !== 'band'; // band does not make sense with color
        case CHANNEL.STROKEDASH:
            return scaleType === 'ordinal' || isContinuousToDiscrete(scaleType);
        case CHANNEL.SHAPE:
            return scaleType === 'ordinal'; // shape = lookup only
    }
}
//# sourceMappingURL=scale.js.map