import { __rest } from "tslib";
import { isArray, isString } from 'vega-util';
import { pick } from './util';
export function extractTitleConfig(titleConfig) {
    const { 
    // These are non-mark title config that need to be hardcoded
    anchor, frame, offset, orient, 
    // color needs to be redirect to fill
    color, 
    // subtitle properties
    subtitleColor, subtitleFont, subtitleFontSize, subtitleFontStyle, subtitleFontWeight, subtitleLineHeight, subtitlePadding } = titleConfig, 
    // The rest are mark config.
    rest = __rest(titleConfig, ["anchor", "frame", "offset", "orient", "color", "subtitleColor", "subtitleFont", "subtitleFontSize", "subtitleFontStyle", "subtitleFontWeight", "subtitleLineHeight", "subtitlePadding"]);
    const titleMarkConfig = Object.assign(Object.assign({}, rest), (color ? { fill: color } : {}));
    // These are non-mark title config that need to be hardcoded
    const nonMark = Object.assign(Object.assign(Object.assign(Object.assign({}, (anchor ? { anchor } : {})), (frame ? { frame } : {})), (offset ? { offset } : {})), (orient ? { orient } : {}));
    // subtitle part can stay in config.title since header titles do not use subtitle
    const subtitle = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (subtitleColor ? { subtitleColor } : {})), (subtitleFont ? { subtitleFont } : {})), (subtitleFontSize ? { subtitleFontSize } : {})), (subtitleFontStyle ? { subtitleFontStyle } : {})), (subtitleFontWeight ? { subtitleFontWeight } : {})), (subtitleLineHeight ? { subtitleLineHeight } : {})), (subtitlePadding ? { subtitlePadding } : {}));
    const subtitleMarkConfig = pick(titleMarkConfig, ['align', 'baseline', 'dx', 'dy', 'limit']);
    return { titleMarkConfig, subtitleMarkConfig, nonMark, subtitle };
}
export function isText(v) {
    return isString(v) || (isArray(v) && isString(v[0]));
}
//# sourceMappingURL=title.js.map