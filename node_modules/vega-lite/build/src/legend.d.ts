import { BaseLegend, LabelOverlap, Legend as VgLegend, LegendConfig as VgLegendConfig, LegendEncode, LegendOrient, Orientation, SignalRef } from 'vega';
import { DateTime } from './datetime';
import { Guide, GuideEncodingEntry, VlOnlyGuideConfig } from './guide';
import { Flag } from './util';
import { ExcludeMappedValueRefButKeepSignal, VgEncodeChannel } from './vega.schema';
export declare const LEGEND_SCALE_CHANNELS: readonly ["size", "shape", "fill", "stroke", "strokeDash", "strokeWidth", "opacity"];
export declare type SignalLegendProp = 'fillColor' | 'gradientStrokeColor' | 'labelColor' | 'strokeColor' | 'symbolFillColor' | 'symbolStrokeColor' | 'titleColor';
export declare const SIGNAL_LEGEND_PROP_INDEX: Record<SignalLegendProp, {
    part: keyof LegendEncode;
    vgProp: VgEncodeChannel;
} | null>;
declare type BaseLegendNoValueRefs = ExcludeMappedValueRefButKeepSignal<BaseLegend>;
export interface LegendPropsWithSignal {
    fillColor?: BaseLegendNoValueRefs['fillColor'] | SignalRef;
    gradientStrokeColor?: BaseLegendNoValueRefs['gradientStrokeColor'] | SignalRef;
    labelColor?: BaseLegendNoValueRefs['labelColor'] | SignalRef;
    strokeColor?: BaseLegendNoValueRefs['strokeColor'] | SignalRef;
    symbolFillColor?: BaseLegendNoValueRefs['symbolFillColor'] | SignalRef;
    symbolStrokeColor?: BaseLegendNoValueRefs['symbolStrokeColor'] | SignalRef;
    titleColor?: BaseLegendNoValueRefs['titleColor'] | SignalRef;
}
export declare type LegendConfig = LegendMixins & VlOnlyGuideConfig & Omit<VgLegendConfig, SignalLegendProp> & LegendPropsWithSignal & {
    /**
     * Max legend length for a vertical gradient when `config.legend.gradientLength` is undefined.
     *
     * __Default value:__ `200`
     */
    gradientVerticalMaxLength?: number;
    /**
     * Min legend length for a vertical gradient when `config.legend.gradientLength` is undefined.
     *
     * __Default value:__ `100`
     */
    gradientVerticalMinLength?: number;
    /**
     * Max legend length for a horizontal gradient when `config.legend.gradientLength` is undefined.
     *
     * __Default value:__ `200`
     */
    gradientHorizontalMaxLength?: number;
    /**
     * Min legend length for a horizontal gradient when `config.legend.gradientLength` is undefined.
     *
     * __Default value:__ `100`
     */
    gradientHorizontalMinLength?: number;
    /**
     * The length in pixels of the primary axis of a color gradient. This value corresponds to the height of a vertical gradient or the width of a horizontal gradient.
     *
     * __Default value:__ `undefined`. If `undefined`, the default gradient will be determined based on the following rules:
     * - For vertical gradients, `clamp(plot_height, gradientVerticalMinLength, gradientVerticalMaxLength)`
     * - For top-`orient`ed or bottom-`orient`ed horizontal gradients, `clamp(plot_width, gradientHorizontalMinLength, gradientHorizontalMaxLength)`
     * - For other horizontal gradients, `gradientHorizontalMinLength`
     *
     * where `clamp(value, min, max)` restricts _value_ to be between the specified _min_ and _max_.
     * @minimum 0
     */
    gradientLength?: number;
    /**
     * The opacity of unselected legend entries.
     *
     * __Default value:__ 0.35.
     */
    unselectedOpacity?: number;
    /**
     * Disable legend by default
     */
    disable?: boolean;
};
/**
 * Properties of a legend or boolean flag for determining whether to show it.
 */
export interface Legend extends Omit<BaseLegendNoValueRefs, SignalLegendProp | 'orient'>, LegendPropsWithSignal, LegendMixins, Guide {
    /**
     * Mark definitions for custom legend encoding.
     *
     * @hidden
     */
    encoding?: LegendEncoding;
    /**
     * [Vega expression](https://vega.github.io/vega/docs/expressions/) for customizing labels.
     *
     * __Note:__ The label text and value can be assessed via the `label` and `value` properties of the legend's backing `datum` object.
     */
    labelExpr?: string;
    /**
     * The minimum desired step between legend ticks, in terms of scale domain values. For example, a value of `1` indicates that ticks should not be less than 1 unit apart. If `tickMinStep` is specified, the `tickCount` value will be adjusted, if necessary, to enforce the minimum step value.
     *
     * __Default value__: `undefined`
     */
    tickMinStep?: number | SignalRef;
    /**
     * Explicitly set the visible legend values.
     */
    values?: number[] | string[] | boolean[] | DateTime[] | SignalRef;
    /**
     * The type of the legend. Use `"symbol"` to create a discrete legend and `"gradient"` for a continuous color gradient.
     *
     * __Default value:__ `"gradient"` for non-binned quantitative fields and temporal fields; `"symbol"` otherwise.
     */
    type?: 'symbol' | 'gradient';
    /**
     * A non-negative integer indicating the z-index of the legend.
     * If zindex is 0, legend should be drawn behind all chart elements.
     * To put them in front, use zindex = 1.
     *
     * @TJS-type integer
     * @minimum 0
     */
    zindex?: number;
}
interface LegendMixins {
    /**
     * The strategy to use for resolving overlap of labels in gradient legends. If `false`, no overlap reduction is attempted. If set to `true` or `"parity"`, a strategy of removing every other label is used. If set to `"greedy"`, a linear scan of the labels is performed, removing any label that overlaps with the last visible label (this often works better for log-scaled axes).
     *
     * __Default value:__ `"greedy"` for `log scales otherwise `true`.
     */
    labelOverlap?: LabelOverlap | SignalRef;
    /**
     * The direction of the legend, one of `"vertical"` or `"horizontal"`.
     *
     * __Default value:__
     * - For top-/bottom-`orient`ed legends, `"horizontal"`
     * - For left-/right-`orient`ed legends, `"vertical"`
     * - For top/bottom-left/right-`orient`ed legends, `"horizontal"` for gradient legends and `"vertical"` for symbol legends.
     */
    direction?: Orientation;
    /**
     * The orientation of the legend, which determines how the legend is positioned within the scene. One of `"left"`, `"right"`, `"top"`, `"bottom"`, `"top-left"`, `"top-right"`, `"bottom-left"`, `"bottom-right"`, `"none"`.
     *
     * __Default value:__ `"right"`
     */
    orient?: LegendOrient;
}
export interface LegendEncoding {
    /**
     * Custom encoding for the legend container.
     * This can be useful for creating legend with custom x, y position.
     */
    legend?: GuideEncodingEntry;
    /**
     * Custom encoding for the legend title text mark.
     */
    title?: GuideEncodingEntry;
    /**
     * Custom encoding for legend label text marks.
     */
    labels?: GuideEncodingEntry;
    /**
     * Custom encoding for legend symbol marks.
     */
    symbols?: GuideEncodingEntry;
    /**
     * Custom encoding for legend gradient filled rect marks.
     */
    gradient?: GuideEncodingEntry;
}
export declare const defaultLegendConfig: LegendConfig;
export declare const COMMON_LEGEND_PROPERTY_INDEX: Flag<keyof (VgLegend | Legend)>;
export declare const LEGEND_PROPERTIES: ("padding" | "type" | "orient" | "symbolLimit" | "tickCount" | "aria" | "description" | "cornerRadius" | "fillColor" | "offset" | "strokeColor" | "legendX" | "legendY" | "titleAlign" | "titleAnchor" | "titleBaseline" | "titleColor" | "titleFont" | "titleFontSize" | "titleFontStyle" | "titleFontWeight" | "titleLimit" | "titleLineHeight" | "titleOpacity" | "titleOrient" | "titlePadding" | "gradientLength" | "gradientOpacity" | "gradientThickness" | "gradientStrokeColor" | "gradientStrokeWidth" | "clipHeight" | "columns" | "columnPadding" | "rowPadding" | "gridAlign" | "symbolDash" | "symbolDashOffset" | "symbolFillColor" | "symbolOffset" | "symbolOpacity" | "symbolSize" | "symbolStrokeColor" | "symbolStrokeWidth" | "symbolType" | "labelAlign" | "labelBaseline" | "labelColor" | "labelFont" | "labelFontSize" | "labelFontStyle" | "labelFontWeight" | "labelLimit" | "labelOpacity" | "labelPadding" | "labelOffset" | "labelOverlap" | "labelSeparation" | "zindex" | "values" | "title" | "direction" | "format" | "formatType" | "tickMinStep")[];
export {};
//# sourceMappingURL=legend.d.ts.map