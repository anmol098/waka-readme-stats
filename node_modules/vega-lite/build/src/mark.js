import { toSet } from 'vega-util';
import { contains, keys } from './util';
/**
 * All types of primitive marks.
 */
export const Mark = {
    arc: 'arc',
    area: 'area',
    bar: 'bar',
    image: 'image',
    line: 'line',
    point: 'point',
    rect: 'rect',
    rule: 'rule',
    text: 'text',
    tick: 'tick',
    trail: 'trail',
    circle: 'circle',
    square: 'square',
    geoshape: 'geoshape'
};
export const ARC = Mark.arc;
export const AREA = Mark.area;
export const BAR = Mark.bar;
export const IMAGE = Mark.image;
export const LINE = Mark.line;
export const POINT = Mark.point;
export const RECT = Mark.rect;
export const RULE = Mark.rule;
export const TEXT = Mark.text;
export const TICK = Mark.tick;
export const TRAIL = Mark.trail;
export const CIRCLE = Mark.circle;
export const SQUARE = Mark.square;
export const GEOSHAPE = Mark.geoshape;
export function isMark(m) {
    return m in Mark;
}
export function isPathMark(m) {
    return contains(['line', 'area', 'trail'], m);
}
export function isRectBasedMark(m) {
    return contains(['rect', 'bar', 'image', 'arc' /* arc is rect/interval in polar coordinate */], m);
}
export const PRIMITIVE_MARKS = keys(Mark);
export function isMarkDef(mark) {
    return mark['type'];
}
const PRIMITIVE_MARK_INDEX = toSet(PRIMITIVE_MARKS);
export function isPrimitiveMark(mark) {
    const markType = isMarkDef(mark) ? mark.type : mark;
    return markType in PRIMITIVE_MARK_INDEX;
}
export const STROKE_CONFIG = [
    'stroke',
    'strokeWidth',
    'strokeDash',
    'strokeDashOffset',
    'strokeOpacity',
    'strokeJoin',
    'strokeMiterLimit'
];
export const FILL_CONFIG = ['fill', 'fillOpacity'];
export const FILL_STROKE_CONFIG = [...STROKE_CONFIG, ...FILL_CONFIG];
const VL_ONLY_MARK_CONFIG_INDEX = {
    color: 1,
    filled: 1,
    invalid: 1,
    order: 1,
    radius2: 1,
    theta2: 1,
    timeUnitBand: 1,
    timeUnitBandPosition: 1
};
export const VL_ONLY_MARK_CONFIG_PROPERTIES = keys(VL_ONLY_MARK_CONFIG_INDEX);
export const VL_ONLY_MARK_SPECIFIC_CONFIG_PROPERTY_INDEX = {
    area: ['line', 'point'],
    bar: ['binSpacing', 'continuousBandSize', 'discreteBandSize'],
    rect: ['binSpacing', 'continuousBandSize', 'discreteBandSize'],
    line: ['point'],
    tick: ['bandSize', 'thickness']
};
export const defaultMarkConfig = {
    color: '#4c78a8',
    invalid: 'filter',
    timeUnitBand: 1
};
export const BAR_CORNER_RADIUS_INDEX = {
    horizontal: ['cornerRadiusTopRight', 'cornerRadiusBottomRight'],
    vertical: ['cornerRadiusTopLeft', 'cornerRadiusTopRight']
};
const DEFAULT_RECT_BAND_SIZE = 5;
export const defaultBarConfig = {
    binSpacing: 1,
    continuousBandSize: DEFAULT_RECT_BAND_SIZE,
    timeUnitBandPosition: 0.5
};
export const defaultRectConfig = {
    binSpacing: 0,
    continuousBandSize: DEFAULT_RECT_BAND_SIZE,
    timeUnitBandPosition: 0.5
};
export const defaultTickConfig = {
    thickness: 1
};
export function getMarkType(m) {
    return isMarkDef(m) ? m.type : m;
}
//# sourceMappingURL=mark.js.map