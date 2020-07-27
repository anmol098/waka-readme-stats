import { Align, Axis as VgAxis, AxisEncode, AxisOrient, BaseAxis, Color, FontStyle, FontWeight, LabelOverlap, SignalRef, TextBaseline, TimeInterval, TimeIntervalStep } from 'vega';
import { ConditionalPredicate, Value, ValueDef } from './channeldef';
import { DateTime } from './datetime';
import { Guide, GuideEncodingEntry, TitleMixins, VlOnlyGuideConfig } from './guide';
import { Flag } from './util';
import { ExcludeMappedValueRefButKeepSignal, VgEncodeChannel } from './vega.schema';
export declare type BaseAxisNoValueRefs = AxisOverrideMixins & VLOnlyAxisMixins & ExcludeMappedValueRefButKeepSignal<BaseAxis>;
interface AxisOverrideMixins {
    /**
     * The anchor position of the axis in pixels. For x-axes with top or bottom orientation, this sets the axis group x coordinate. For y-axes with left or right orientation, this sets the axis group y coordinate.
     *
     * __Default value__: `0`
     */
    position?: number | SignalRef;
    /**
     * The minimum desired step between axis ticks, in terms of scale domain values. For example, a value of `1` indicates that ticks should not be less than 1 unit apart. If `tickMinStep` is specified, the `tickCount` value will be adjusted, if necessary, to enforce the minimum step value.
     */
    tickMinStep?: number | SignalRef;
    /**
     * A boolean flag indicating if grid lines should be included as part of the axis
     *
     * __Default value:__ `true` for [continuous scales](https://vega.github.io/vega-lite/docs/scale.html#continuous) that are not binned; otherwise, `false`.
     */
    grid?: boolean;
    /**
     * Indicates if the first and last axis labels should be aligned flush with the scale range. Flush alignment for a horizontal axis will left-align the first label and right-align the last label. For vertical axes, bottom and top text baselines are applied instead. If this property is a number, it also indicates the number of pixels by which to offset the first and last labels; for example, a value of 2 will flush-align the first and last labels and also push them 2 pixels outward from the center of the axis. The additional adjustment can sometimes help the labels better visually group with corresponding axis ticks.
     *
     * __Default value:__ `true` for axis of a continuous x-scale. Otherwise, `false`.
     */
    labelFlush?: boolean | number;
    /**
     * The strategy to use for resolving overlap of axis labels. If `false` (the default), no overlap reduction is attempted. If set to `true` or `"parity"`, a strategy of removing every other label is used (this works well for standard linear axes). If set to `"greedy"`, a linear scan of the labels is performed, removing any labels that overlaps with the last visible label (this often works better for log-scaled axes).
     *
     * __Default value:__ `true` for non-nominal fields with non-log scales; `"greedy"` for log scales; otherwise `false`.
     */
    labelOverlap?: LabelOverlap;
    /**
     * The offset, in pixels, by which to displace the axis from the edge of the enclosing group or data rectangle.
     *
     * __Default value:__ derived from the [axis config](https://vega.github.io/vega-lite/docs/config.html#facet-scale-config)'s `offset` (`0` by default)
     */
    offset?: number;
    /**
     * The orientation of the axis. One of `"top"`, `"bottom"`, `"left"` or `"right"`. The orientation can be used to further specialize the axis type (e.g., a y-axis oriented towards the right edge of the chart).
     *
     * __Default value:__ `"bottom"` for x-axes and `"left"` for y-axes.
     */
    orient?: AxisOrient | SignalRef;
    /**
     * A desired number of ticks, for axes visualizing quantitative scales. The resulting number may be different so that values are "nice" (multiples of 2, 5, 10) and lie within the underlying scale's range.
     *
     * For scales of type `"time"` or `"utc"`, the tick count can instead be a time interval specifier. Legal string values are `"millisecond"`, `"second"`, `"minute"`, `"hour"`, `"day"`, `"week"`, `"month"`, and "year". Alternatively, an object-valued interval specifier of the form `{"interval": "month", "step": 3}` includes a desired number of interval steps. Here, ticks are generated for each quarter (Jan, Apr, Jul, Oct) boundary.
     *
     * __Default value__: Determine using a formula `ceil(width/40)` for x and `ceil(height/40)` for y.
     *
     * @minimum 0
     */
    tickCount?: number | TimeInterval | TimeIntervalStep | SignalRef;
    /**
     * Explicitly set the visible axis tick values.
     */
    values?: number[] | string[] | boolean[] | DateTime[] | SignalRef;
    /**
     * A non-negative integer indicating the z-index of the axis.
     * If zindex is 0, axes should be drawn behind all chart elements.
     * To put them in front, set `zindex` to `1` or more.
     *
     * __Default value:__ `0` (behind the marks).
     *
     * @TJS-type integer
     * @minimum 0
     */
    zindex?: number;
}
interface VLOnlyAxisMixins {
    /**
     * [Vega expression](https://vega.github.io/vega/docs/expressions/) for customizing labels.
     *
     * __Note:__ The label text and value can be assessed via the `label` and `value` properties of the axis's backing `datum` object.
     */
    labelExpr?: string;
    /**
     * A string or array of strings indicating the name of custom styles to apply to the axis. A style is a named collection of axis property defined within the [style configuration](https://vega.github.io/vega-lite/docs/mark.html#style-config). If style is an array, later styles will override earlier styles.
     *
     * __Default value:__ (none)
     * __Note:__ Any specified style will augment the default style. For example, an x-axis mark with `"style": "foo"` will use `config.axisX` and `config.style.foo` (the specified style `"foo"` has higher precedence).
     */
    style?: string | string[];
}
export declare type SignalAxisProp = 'domainColor' | 'labelAlign' | 'labelColor' | 'gridColor' | 'tickColor' | 'titleColor' | 'title';
export declare type ConditionalAxisProp = 'labelAlign' | 'labelBaseline' | 'labelColor' | 'labelFont' | 'labelFontSize' | 'labelFontStyle' | 'labelFontWeight' | 'labelOpacity' | 'labelOffset' | 'labelPadding' | 'gridColor' | 'gridDash' | 'gridDashOffset' | 'gridOpacity' | 'gridWidth' | 'tickColor' | 'tickDash' | 'tickDashOffset' | 'tickOpacity' | 'tickSize' | 'tickWidth';
export declare const CONDITIONAL_AXIS_PROP_INDEX: Record<ConditionalAxisProp | SignalAxisProp, {
    part: keyof AxisEncode;
    vgProp: VgEncodeChannel;
} | null>;
export declare type ConditionalAxisProperty<V extends Value | number[]> = (ValueDef<V> | SignalRef) & {
    condition: ConditionalPredicate<ValueDef<V> | SignalRef> | ConditionalPredicate<ValueDef<V> | SignalRef>[];
};
export declare function isConditionalAxisValue<V extends Value | number[]>(v: any): v is ConditionalAxisProperty<V>;
export declare type ConditionalAxisNumber = ConditionalAxisProperty<number | null>;
export declare type ConditionalAxisLabelAlign = ConditionalAxisProperty<Align | null>;
export declare type ConditionalAxisLabelBaseline = ConditionalAxisProperty<TextBaseline | null>;
export declare type ConditionalAxisColor = ConditionalAxisProperty<Color | null>;
export declare type ConditionalAxisString = ConditionalAxisProperty<string | null>;
export declare type ConditionalAxisLabelFontStyle = ConditionalAxisProperty<FontStyle | null>;
export declare type ConditionalAxisLabelFontWeight = ConditionalAxisProperty<FontWeight | null>;
export declare type ConditionalAxisNumberArray = ConditionalAxisProperty<number[] | null>;
export declare type AxisConfigBaseWithConditionalAndSignal = Omit<BaseAxisNoValueRefs, ConditionalAxisProp | SignalAxisProp> & AxisPropsWithConditionAndSignal;
export interface AxisPropsWithConditionAndSignal {
    domainColor?: BaseAxisNoValueRefs['domainColor'] | SignalRef;
    labelAlign?: BaseAxisNoValueRefs['labelAlign'] | ConditionalAxisLabelAlign;
    labelBaseline?: BaseAxisNoValueRefs['labelBaseline'] | ConditionalAxisLabelBaseline;
    labelColor?: BaseAxisNoValueRefs['labelColor'] | ConditionalAxisColor | SignalRef;
    labelFont?: BaseAxisNoValueRefs['labelFont'] | ConditionalAxisString;
    labelFontSize?: BaseAxisNoValueRefs['labelFontSize'] | ConditionalAxisNumber;
    labelFontStyle?: BaseAxisNoValueRefs['labelFontStyle'] | ConditionalAxisLabelFontStyle;
    labelFontWeight?: BaseAxisNoValueRefs['labelFontWeight'] | ConditionalAxisLabelFontWeight;
    labelLineHeight?: BaseAxisNoValueRefs['labelLineHeight'] | ConditionalAxisNumber | SignalRef;
    labelOpacity?: BaseAxisNoValueRefs['labelOpacity'] | ConditionalAxisNumber;
    labelOffset?: BaseAxisNoValueRefs['labelOffset'] | ConditionalAxisNumber | SignalRef;
    labelPadding?: BaseAxisNoValueRefs['labelPadding'] | ConditionalAxisNumber;
    gridColor?: BaseAxisNoValueRefs['gridColor'] | ConditionalAxisColor | SignalRef;
    gridDash?: BaseAxisNoValueRefs['gridDash'] | ConditionalAxisNumberArray;
    gridDashOffset?: BaseAxisNoValueRefs['gridDashOffset'] | ConditionalAxisNumber;
    gridOpacity?: BaseAxisNoValueRefs['gridOpacity'] | ConditionalAxisNumber;
    gridWidth?: BaseAxisNoValueRefs['gridWidth'] | ConditionalAxisNumber;
    tickColor?: BaseAxisNoValueRefs['tickColor'] | ConditionalAxisColor | SignalRef;
    tickDash?: BaseAxisNoValueRefs['tickDash'] | ConditionalAxisNumberArray;
    tickDashOffset?: BaseAxisNoValueRefs['tickDashOffset'] | ConditionalAxisNumber;
    tickOpacity?: BaseAxisNoValueRefs['tickOpacity'] | ConditionalAxisNumber;
    tickSize?: BaseAxisNoValueRefs['tickSize'] | ConditionalAxisNumber;
    tickWidth?: BaseAxisNoValueRefs['tickWidth'] | ConditionalAxisNumber;
    titleColor?: BaseAxisNoValueRefs['titleColor'] | SignalRef;
    title?: TitleMixins['title'];
}
export declare type AxisConfig = Guide & VlOnlyGuideConfig & AxisConfigBaseWithConditionalAndSignal & {
    /**
     * Disable axis by default.
     */
    disable?: boolean;
};
export interface Axis extends AxisConfigBaseWithConditionalAndSignal, Guide {
    /**
     * Mark definitions for custom axis encoding.
     *
     * @hidden
     */
    encoding?: AxisEncoding;
}
export declare type AxisPart = keyof AxisEncoding;
export declare const AXIS_PARTS: AxisPart[];
/**
 * A dictionary listing whether a certain axis property is applicable for only main axes or only grid axes.
 */
export declare const AXIS_PROPERTY_TYPE: Record<keyof VgAxis, 'main' | 'grid' | 'both'>;
export interface AxisEncoding {
    /**
     * Custom encoding for the axis container.
     */
    axis?: GuideEncodingEntry;
    /**
     * Custom encoding for the axis domain rule mark.
     */
    domain?: GuideEncodingEntry;
    /**
     * Custom encoding for axis gridline rule marks.
     */
    grid?: GuideEncodingEntry;
    /**
     * Custom encoding for axis label text marks.
     */
    labels?: GuideEncodingEntry;
    /**
     * Custom encoding for axis tick rule marks.
     */
    ticks?: GuideEncodingEntry;
    /**
     * Custom encoding for the axis title text mark.
     */
    title?: GuideEncodingEntry;
}
export declare const COMMON_AXIS_PROPERTIES_INDEX: Flag<keyof (VgAxis | Axis)>;
export declare function isAxisProperty(prop: string): prop is keyof Axis;
export declare const AXIS_PROPERTIES: ("orient" | "tickCount" | "aria" | "description" | "offset" | "titleAlign" | "titleAnchor" | "titleBaseline" | "titleColor" | "titleFont" | "titleFontSize" | "titleFontStyle" | "titleFontWeight" | "titleLimit" | "titleLineHeight" | "titleOpacity" | "titlePadding" | "labelAlign" | "labelBaseline" | "labelColor" | "labelFont" | "labelFontSize" | "labelFontStyle" | "labelFontWeight" | "labelLimit" | "labelOpacity" | "labelPadding" | "labelOffset" | "labelOverlap" | "labelSeparation" | "zindex" | "values" | "encoding" | "domain" | "title" | "labels" | "format" | "formatType" | "tickMinStep" | "labelExpr" | "titleAngle" | "labelAngle" | "labelLineHeight" | "translate" | "ticks" | "gridColor" | "gridDash" | "gridDashOffset" | "gridOpacity" | "gridWidth" | "tickColor" | "tickDash" | "tickDashOffset" | "tickOpacity" | "tickSize" | "tickWidth" | "domainColor" | "minExtent" | "maxExtent" | "bandPosition" | "titleX" | "titleY" | "domainCap" | "domainDash" | "domainDashOffset" | "domainOpacity" | "domainWidth" | "tickBand" | "tickCap" | "tickExtra" | "tickOffset" | "tickRound" | "grid" | "gridCap" | "labelBound" | "labelFlush" | "labelFlushOffset" | "position" | "style")[];
export interface AxisConfigMixins {
    /**
     * Axis configuration, which determines default properties for all `x` and `y` [axes](https://vega.github.io/vega-lite/docs/axis.html). For a full list of axis configuration options, please see the [corresponding section of the axis documentation](https://vega.github.io/vega-lite/docs/axis.html#config).
     */
    axis?: AxisConfig;
    /**
     * X-axis specific config.
     */
    axisX?: AxisConfig;
    /**
     * Y-axis specific config.
     */
    axisY?: AxisConfig;
    /**
     * Config for y-axis along the left edge of the chart.
     */
    axisLeft?: AxisConfig;
    /**
     * Config for y-axis along the right edge of the chart.
     */
    axisRight?: AxisConfig;
    /**
     * Config for x-axis along the top edge of the chart.
     */
    axisTop?: AxisConfig;
    /**
     * Config for x-axis along the bottom edge of the chart.
     */
    axisBottom?: AxisConfig;
    /**
     * Config for axes with "band" scales.
     */
    axisBand?: AxisConfig;
    /**
     * Config for axes with "point" scales.
     */
    axisPoint?: AxisConfig;
    /**
     * Config for axes with "point" or "band" scales.
     */
    axisDiscrete?: AxisConfig;
    /**
     * Config for quantitative axes.
     */
    axisQuantitative?: AxisConfig;
    /**
     * Config for temporal axes.
     */
    axisTemporal?: AxisConfig;
    /**
     * Config for x-axes with "band" scales.
     */
    axisXBand?: AxisConfig;
    /**
     * Config for x-axes with "point" scales.
     */
    axisXPoint?: AxisConfig;
    /**
     * Config for x-axes with "point" or "band" scales.
     */
    axisXDiscrete?: AxisConfig;
    /**
     * Config for x-quantitative axes.
     */
    axisXQuantitative?: AxisConfig;
    /**
     * Config for x-temporal axes.
     */
    axisXTemporal?: AxisConfig;
    /**
     * Config for y-axes with "band" scales.
     */
    axisYBand?: AxisConfig;
    /**
     * Config for y-axes with "point" scales.
     */
    axisYPoint?: AxisConfig;
    /**
     * Config for y-axes with "point" or "band" scales.
     */
    axisYDiscrete?: AxisConfig;
    /**
     * Config for y-quantitative axes.
     */
    axisYQuantitative?: AxisConfig;
    /**
     * Config for y-temporal axes.
     */
    axisYTemporal?: AxisConfig;
}
export {};
//# sourceMappingURL=axis.d.ts.map