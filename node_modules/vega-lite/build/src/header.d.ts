import { Align, Color, FontStyle, FontWeight, Orient, SignalRef, TextBaseline, TitleAnchor, TitleConfig } from 'vega';
import { FormatMixins, Guide, VlOnlyGuideConfig } from './guide';
export declare const HEADER_TITLE_PROPERTIES_MAP: Partial<Record<keyof CoreHeader, keyof TitleConfig>>;
export declare const HEADER_LABEL_PROPERTIES_MAP: Partial<Record<keyof CoreHeader, keyof TitleConfig>>;
export declare const HEADER_TITLE_PROPERTIES: ("orient" | "titleAlign" | "titleAnchor" | "titleBaseline" | "titleColor" | "titleFont" | "titleFontSize" | "titleFontStyle" | "titleFontWeight" | "titleLimit" | "titleLineHeight" | "titleOrient" | "titlePadding" | "labelAlign" | "labelBaseline" | "labelColor" | "labelFont" | "labelFontSize" | "labelFontStyle" | "labelFontWeight" | "labelLimit" | "labelPadding" | "labels" | "format" | "formatType" | "labelExpr" | "titleAngle" | "labelAnchor" | "labelAngle" | "labelLineHeight" | "labelOrient")[];
export declare const HEADER_LABEL_PROPERTIES: ("orient" | "titleAlign" | "titleAnchor" | "titleBaseline" | "titleColor" | "titleFont" | "titleFontSize" | "titleFontStyle" | "titleFontWeight" | "titleLimit" | "titleLineHeight" | "titleOrient" | "titlePadding" | "labelAlign" | "labelBaseline" | "labelColor" | "labelFont" | "labelFontSize" | "labelFontStyle" | "labelFontWeight" | "labelLimit" | "labelPadding" | "labels" | "format" | "formatType" | "labelExpr" | "titleAngle" | "labelAnchor" | "labelAngle" | "labelLineHeight" | "labelOrient")[];
export interface CoreHeader extends FormatMixins {
    /**
     * The anchor position for placing the title. One of `"start"`, `"middle"`, or `"end"`. For example, with an orientation of top these anchor positions map to a left-, center-, or right-aligned title.
     */
    titleAnchor?: TitleAnchor;
    /**
     * Horizontal text alignment (to the anchor) of header titles.
     */
    titleAlign?: Align | SignalRef;
    /**
     * The rotation angle of the header title.
     *
     * __Default value:__ `0`.
     *
     * @minimum -360
     * @maximum 360
     */
    titleAngle?: number;
    /**
     * The vertical text baseline for the header title. One of `"alphabetic"` (default), `"top"`, `"middle"`, `"bottom"`, `"line-top"`, or `"line-bottom"`.
     * The `"line-top"` and `"line-bottom"` values operate similarly to `"top"` and `"bottom"`, but are calculated relative to the `titleLineHeight` rather than `titleFontSize` alone.
     *
     * __Default value:__ `"middle"`
     */
    titleBaseline?: TextBaseline | SignalRef;
    /**
     * Color of the header title, can be in hex color code or regular color name.
     */
    titleColor?: Color | SignalRef;
    /**
     * Font of the header title. (e.g., `"Helvetica Neue"`).
     */
    titleFont?: string | SignalRef;
    /**
     * Font size of the header title.
     *
     * @minimum 0
     */
    titleFontSize?: number | SignalRef;
    /**
     * The font style of the header title.
     */
    titleFontStyle?: FontStyle | SignalRef;
    /**
     * Font weight of the header title.
     * This can be either a string (e.g `"bold"`, `"normal"`) or a number (`100`, `200`, `300`, ..., `900` where `"normal"` = `400` and `"bold"` = `700`).
     */
    titleFontWeight?: FontWeight | SignalRef;
    /**
     * The maximum length of the header title in pixels. The text value will be automatically truncated if the rendered size exceeds the limit.
     *
     * __Default value:__ `0`, indicating no limit
     */
    titleLimit?: number | SignalRef;
    /**
     * Line height in pixels for multi-line header title text or title text with `"line-top"` or `"line-bottom"` baseline.
     */
    titleLineHeight?: number | SignalRef;
    /**
     * The orientation of the header title. One of `"top"`, `"bottom"`, `"left"` or `"right"`.
     */
    titleOrient?: Orient;
    /**
     * The padding, in pixel, between facet header's title and the label.
     *
     * __Default value:__ `10`
     */
    titlePadding?: number | SignalRef;
    /**
     * A boolean flag indicating if labels should be included as part of the header.
     *
     * __Default value:__ `true`.
     */
    labels?: boolean;
    /**
     * Horizontal text alignment of header labels. One of `"left"`, `"center"`, or `"right"`.
     */
    labelAlign?: Align | SignalRef;
    /**
     * The vertical text baseline for the header labels. One of `"alphabetic"` (default), `"top"`, `"middle"`, `"bottom"`, `"line-top"`, or `"line-bottom"`.
     * The `"line-top"` and `"line-bottom"` values operate similarly to `"top"` and `"bottom"`, but are calculated relative to the `titleLineHeight` rather than `titleFontSize` alone.
     *
     */
    labelBaseline?: TextBaseline | SignalRef;
    /**
     * The anchor position for placing the labels. One of `"start"`, `"middle"`, or `"end"`. For example, with a label orientation of top these anchor positions map to a left-, center-, or right-aligned label.
     */
    labelAnchor?: TitleAnchor;
    /**
     * [Vega expression](https://vega.github.io/vega/docs/expressions/) for customizing labels.
     *
     * __Note:__ The label text and value can be assessed via the `label` and `value` properties of the header's backing `datum` object.
     */
    labelExpr?: string;
    /**
     * The rotation angle of the header labels.
     *
     * __Default value:__ `0` for column header, `-90` for row header.
     *
     * @minimum -360
     * @maximum 360
     */
    labelAngle?: number;
    /**
     * The color of the header label, can be in hex color code or regular color name.
     */
    labelColor?: Color | SignalRef;
    /**
     * The font of the header label.
     */
    labelFont?: string | SignalRef;
    /**
     * The font size of the header label, in pixels.
     *
     * @minimum 0
     */
    labelFontSize?: number | SignalRef;
    /**
     * The font style of the header label.
     */
    labelFontStyle?: FontStyle | SignalRef;
    /**
     * The font weight of the header label.
     */
    labelFontWeight?: FontWeight | SignalRef;
    /**
     * The maximum length of the header label in pixels. The text value will be automatically truncated if the rendered size exceeds the limit.
     *
     * __Default value:__ `0`, indicating no limit
     */
    labelLimit?: number | SignalRef;
    /**
     * Line height in pixels for multi-line header labels or title text with `"line-top"` or `"line-bottom"` baseline.
     */
    labelLineHeight?: number | SignalRef;
    /**
     * The orientation of the header label. One of `"top"`, `"bottom"`, `"left"` or `"right"`.
     */
    labelOrient?: Orient;
    /**
     * The padding, in pixel, between facet header's label and the plot.
     *
     * __Default value:__ `10`
     */
    labelPadding?: number | SignalRef;
    /**
     * Shortcut for setting both labelOrient and titleOrient.
     */
    orient?: Orient;
}
export interface HeaderConfig extends CoreHeader, VlOnlyGuideConfig {
}
/**
 * Headers of row / column channels for faceted plots.
 */
export interface Header extends CoreHeader, Guide {
}
export interface HeaderConfigMixins {
    /**
     * Header configuration, which determines default properties for all [headers](https://vega.github.io/vega-lite/docs/header.html).
     *
     * For a full list of header configuration options, please see the [corresponding section of in the header documentation](https://vega.github.io/vega-lite/docs/header.html#config).
     */
    header?: HeaderConfig;
    /**
     * Header configuration, which determines default properties for row [headers](https://vega.github.io/vega-lite/docs/header.html).
     *
     * For a full list of header configuration options, please see the [corresponding section of in the header documentation](https://vega.github.io/vega-lite/docs/header.html#config).
     */
    headerRow?: HeaderConfig;
    /**
     * Header configuration, which determines default properties for column [headers](https://vega.github.io/vega-lite/docs/header.html).
     *
     * For a full list of header configuration options, please see the [corresponding section of in the header documentation](https://vega.github.io/vega-lite/docs/header.html#config).
     */
    headerColumn?: HeaderConfig;
    /**
     * Header configuration, which determines default properties for non-row/column facet [headers](https://vega.github.io/vega-lite/docs/header.html).
     *
     * For a full list of header configuration options, please see the [corresponding section of in the header documentation](https://vega.github.io/vega-lite/docs/header.html#config).
     */
    headerFacet?: HeaderConfig;
}
//# sourceMappingURL=header.d.ts.map