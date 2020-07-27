import { Color, InitSignal, NewSignal, RangeConfig, RangeScheme, SignalRef } from 'vega';
import { Axis, AxisConfigMixins } from './axis';
import { CompositeMarkConfigMixins } from './compositemark';
import { HeaderConfigMixins } from './header';
import { LegendConfig } from './legend';
import * as mark from './mark';
import { AnyMarkConfig, MarkConfig, MarkConfigMixins } from './mark';
import { ProjectionConfig } from './projection';
import { ScaleConfig } from './scale';
import { SelectionConfig } from './selection';
import { BaseViewBackground, CompositionConfigMixins } from './spec/base';
import { TopLevelProperties } from './spec/toplevel';
import { TitleConfig } from './title';
export interface ViewConfig extends BaseViewBackground {
    /**
     * Default width
     *
     * __Deprecated:__ Since Vega-Lite 4.0. Please use continuousWidth and discreteWidth instead.
     */
    width?: number;
    /**
     * Default height
     *
     * __Deprecated:__ Since Vega-Lite 4.0. Please use continuousHeight and discreteHeight instead.
     */
    height?: number;
    /**
     * The default width when the plot has a continuous field for x or longitude, or has arc marks.
     *
     * __Default value:__ `200`
     */
    continuousWidth?: number;
    /**
     * The default width when the plot has non-arc marks and either a discrete x-field or no x-field.
     * The width can be either a number indicating a fixed width or an object in the form of `{step: number}` defining the width per discrete step.
     *
     * __Default value:__ a step size based on `config.view.step`.
     */
    discreteWidth?: number | {
        step: number;
    };
    /**
     * The default height when the plot has a continuous y-field for x or latitude, or has arc marks.
     *
     * __Default value:__ `200`
     */
    continuousHeight?: number;
    /**
     * The default height when the plot has non arc marks and either a discrete y-field or no y-field.
     * The height can be either a number indicating a fixed height or an object in the form of `{step: number}` defining the height per discrete step.
     *
     * __Default value:__ a step size based on `config.view.step`.
     */
    discreteHeight?: number | {
        step: number;
    };
    /**
     * Default step size for x-/y- discrete fields.
     */
    step?: number;
    /**
     * Whether the view should be clipped.
     */
    clip?: boolean;
}
export declare function getViewConfigContinuousSize(viewConfig: ViewConfig, channel: 'width' | 'height'): number;
export declare function getViewConfigDiscreteStep(viewConfig: ViewConfig, channel: 'width' | 'height'): number;
export declare function getViewConfigDiscreteSize(viewConfig: ViewConfig, channel: 'width' | 'height'): number | {
    step: number;
};
export declare const DEFAULT_STEP = 20;
export declare const defaultViewConfig: ViewConfig;
export declare function isVgScheme(rangeScheme: string[] | RangeScheme): rangeScheme is RangeScheme;
export declare type ColorConfig = Record<string, Color>;
export declare type FontSizeConfig = Record<string, number>;
export interface VLOnlyConfig {
    /**
     * Default font for all text marks, titles, and labels.
     */
    font?: string;
    /**
     * Default color signals.
     *
     * @hidden
     */
    color?: boolean | ColorConfig;
    /**
     * Default font size signals.
     *
     * @hidden
     */
    fontSize?: boolean | FontSizeConfig;
    /**
     * Default axis and legend title for count fields.
     *
     * __Default value:__ `'Count of Records`.
     *
     * @type {string}
     */
    countTitle?: string;
    /**
     * Defines how Vega-Lite generates title for fields. There are three possible styles:
     * - `"verbal"` (Default) - displays function in a verbal style (e.g., "Sum of field", "Year-month of date", "field (binned)").
     * - `"function"` - displays function using parentheses and capitalized texts (e.g., "SUM(field)", "YEARMONTH(date)", "BIN(field)").
     * - `"plain"` - displays only the field name without functions (e.g., "field", "date", "field").
     */
    fieldTitle?: 'verbal' | 'functional' | 'plain';
    /**
     * D3 Number format for guide labels and text marks. For example `"s"` for SI units. Use [D3's number format pattern](https://github.com/d3/d3-format#locale_format).
     */
    numberFormat?: string;
    /**
     * Default time format for raw time values (without time units) in text marks, legend labels and header labels.
     *
     * __Default value:__ `"%b %d, %Y"`
     * __Note:__ Axes automatically determine the format for each label automatically so this config does not affect axes.
     */
    timeFormat?: string;
    /**
     * Allow the `formatType` property for text marks and guides to accept a custom formatter function [registered as a Vega expression](https://vega.github.io/vega-lite/usage/compile.html#format-type).
     */
    customFormatTypes?: boolean;
    /** Default properties for [single view plots](https://vega.github.io/vega-lite/docs/spec.html#single). */
    view?: ViewConfig;
    /**
     * Scale configuration determines default properties for all [scales](https://vega.github.io/vega-lite/docs/scale.html). For a full list of scale configuration options, please see the [corresponding section of the scale documentation](https://vega.github.io/vega-lite/docs/scale.html#config).
     */
    scale?: ScaleConfig;
    /** An object hash for defining default properties for each type of selections. */
    selection?: SelectionConfig;
}
export declare type StyleConfigIndex = Partial<Record<string, AnyMarkConfig | Axis>> & MarkConfigMixins & {
    /**
     * Default style for axis, legend, and header titles.
     */
    'guide-title'?: MarkConfig;
    /**
     * Default style for axis, legend, and header labels.
     */
    'guide-label'?: MarkConfig;
    /**
     * Default style for chart titles
     */
    'group-title'?: MarkConfig;
    /**
     * Default style for chart subtitles
     */
    'group-subtitle'?: MarkConfig;
};
export interface Config extends TopLevelProperties, VLOnlyConfig, MarkConfigMixins, CompositeMarkConfigMixins, AxisConfigMixins, HeaderConfigMixins, CompositionConfigMixins {
    /**
     * An object hash that defines default range arrays or schemes for using with scales.
     * For a full list of scale range configuration options, please see the [corresponding section of the scale documentation](https://vega.github.io/vega-lite/docs/scale.html#config).
     */
    range?: RangeConfig;
    /**
     * Legend configuration, which determines default properties for all [legends](https://vega.github.io/vega-lite/docs/legend.html). For a full list of legend configuration options, please see the [corresponding section of in the legend documentation](https://vega.github.io/vega-lite/docs/legend.html#config).
     */
    legend?: LegendConfig;
    /**
     * Title configuration, which determines default properties for all [titles](https://vega.github.io/vega-lite/docs/title.html). For a full list of title configuration options, please see the [corresponding section of the title documentation](https://vega.github.io/vega-lite/docs/title.html#config).
     */
    title?: TitleConfig;
    /**
     * Projection configuration, which determines default properties for all [projections](https://vega.github.io/vega-lite/docs/projection.html). For a full list of projection configuration options, please see the [corresponding section of the projection documentation](https://vega.github.io/vega-lite/docs/projection.html#config).
     */
    projection?: ProjectionConfig;
    /** An object hash that defines key-value mappings to determine default properties for marks with a given [style](https://vega.github.io/vega-lite/docs/mark.html#mark-def). The keys represent styles names; the values have to be valid [mark configuration objects](https://vega.github.io/vega-lite/docs/mark.html#config). */
    style?: StyleConfigIndex;
    /**
     * A delimiter, such as a newline character, upon which to break text strings into multiple lines. This property provides a global default for text marks, which is overridden by mark or style config settings, and by the lineBreak mark encoding channel. If signal-valued, either string or regular expression (regexp) values are valid.
     */
    lineBreak?: string | SignalRef;
    /**
     * A boolean flag indicating if ARIA default attributes should be included for marks and guides (SVG output only). If false, the `"aria-hidden"` attribute will be set for all guides, removing them from the ARIA accessibility tree and Vega-Lite will not generate default descriptions for marks.
     *
     * __Default value:__ `true`.
     */
    aria?: boolean;
    /**
     * @hidden
     */
    signals?: (InitSignal | NewSignal)[];
}
export declare const defaultConfig: Config;
export declare const DEFAULT_FONT_SIZE: {
    text: number;
    guideLabel: number;
    guideTitle: number;
    groupTitle: number;
    groupSubtitle: number;
};
export declare const DEFAULT_COLOR: {
    blue: string;
    orange: string;
    red: string;
    teal: string;
    green: string;
    yellow: string;
    purple: string;
    pink: string;
    brown: string;
    gray0: string;
    gray1: string;
    gray2: string;
    gray3: string;
    gray4: string;
    gray5: string;
    gray6: string;
    gray7: string;
    gray8: string;
    gray9: string;
    gray10: string;
    gray11: string;
    gray12: string;
    gray13: string;
    gray14: string;
    gray15: string;
};
export declare function colorSignalConfig(color?: boolean | ColorConfig): Config;
export declare function fontSizeSignalConfig(fontSize: boolean | FontSizeConfig): Config;
export declare function fontConfig(font: string): Config;
export declare function initConfig(config?: Config): {
    /**
     * An object hash that defines default range arrays or schemes for using with scales.
     * For a full list of scale range configuration options, please see the [corresponding section of the scale documentation](https://vega.github.io/vega-lite/docs/scale.html#config).
     */
    range?: RangeConfig;
    /**
     * Legend configuration, which determines default properties for all [legends](https://vega.github.io/vega-lite/docs/legend.html). For a full list of legend configuration options, please see the [corresponding section of in the legend documentation](https://vega.github.io/vega-lite/docs/legend.html#config).
     */
    legend?: LegendConfig;
    /**
     * Title configuration, which determines default properties for all [titles](https://vega.github.io/vega-lite/docs/title.html). For a full list of title configuration options, please see the [corresponding section of the title documentation](https://vega.github.io/vega-lite/docs/title.html#config).
     */
    title?: import("./title").BaseTitleNoValueRefs;
    /**
     * Projection configuration, which determines default properties for all [projections](https://vega.github.io/vega-lite/docs/projection.html). For a full list of projection configuration options, please see the [corresponding section of the projection documentation](https://vega.github.io/vega-lite/docs/projection.html#config).
     */
    projection?: import("./projection").Projection;
    /** An object hash that defines key-value mappings to determine default properties for marks with a given [style](https://vega.github.io/vega-lite/docs/mark.html#mark-def). The keys represent styles names; the values have to be valid [mark configuration objects](https://vega.github.io/vega-lite/docs/mark.html#config). */
    style?: StyleConfigIndex;
    /**
     * A delimiter, such as a newline character, upon which to break text strings into multiple lines. This property provides a global default for text marks, which is overridden by mark or style config settings, and by the lineBreak mark encoding channel. If signal-valued, either string or regular expression (regexp) values are valid.
     */
    lineBreak?: import("vega").ScaleField;
    /**
     * A boolean flag indicating if ARIA default attributes should be included for marks and guides (SVG output only). If false, the `"aria-hidden"` attribute will be set for all guides, removing them from the ARIA accessibility tree and Vega-Lite will not generate default descriptions for marks.
     *
     * __Default value:__ `true`.
     */
    aria?: boolean;
    /**
     * @hidden
     */
    signals?: (NewSignal | InitSignal)[];
    background?: import("vega").ScaleField;
    padding?: number | SignalRef | {
        top?: number;
        bottom?: number;
        left?: number;
        right?: number;
    };
    autosize?: "pad" | "fit" | "fit-x" | "fit-y" | "none" | import("./spec/toplevel").AutoSizeParams;
    /**
     * Default axis and legend title for count fields.
     *
     * __Default value:__ `'Count of Records`.
     *
     * @type {string}
     */
    countTitle?: string;
    /**
     * Defines how Vega-Lite generates title for fields. There are three possible styles:
     * - `"verbal"` (Default) - displays function in a verbal style (e.g., "Sum of field", "Year-month of date", "field (binned)").
     * - `"function"` - displays function using parentheses and capitalized texts (e.g., "SUM(field)", "YEARMONTH(date)", "BIN(field)").
     * - `"plain"` - displays only the field name without functions (e.g., "field", "date", "field").
     */
    fieldTitle?: "verbal" | "functional" | "plain";
    /**
     * D3 Number format for guide labels and text marks. For example `"s"` for SI units. Use [D3's number format pattern](https://github.com/d3/d3-format#locale_format).
     */
    numberFormat?: string;
    /**
     * Default time format for raw time values (without time units) in text marks, legend labels and header labels.
     *
     * __Default value:__ `"%b %d, %Y"`
     * __Note:__ Axes automatically determine the format for each label automatically so this config does not affect axes.
     */
    timeFormat?: string;
    /**
     * Allow the `formatType` property for text marks and guides to accept a custom formatter function [registered as a Vega expression](https://vega.github.io/vega-lite/usage/compile.html#format-type).
     */
    customFormatTypes?: boolean;
    /** Default properties for [single view plots](https://vega.github.io/vega-lite/docs/spec.html#single). */
    view?: ViewConfig;
    /**
     * Scale configuration determines default properties for all [scales](https://vega.github.io/vega-lite/docs/scale.html). For a full list of scale configuration options, please see the [corresponding section of the scale documentation](https://vega.github.io/vega-lite/docs/scale.html#config).
     */
    scale?: ScaleConfig;
    /** An object hash for defining default properties for each type of selections. */
    selection?: SelectionConfig;
    mark?: mark.MarkConfig;
    arc?: mark.RectConfig;
    area?: mark.AreaConfig;
    bar?: mark.BarConfig;
    circle?: mark.MarkConfig;
    image?: mark.RectConfig;
    line?: mark.LineConfig;
    point?: mark.MarkConfig;
    rect?: mark.RectConfig;
    rule?: mark.MarkConfig;
    square?: mark.MarkConfig;
    text?: mark.MarkConfig;
    tick?: mark.TickConfig;
    trail?: mark.LineConfig;
    geoshape?: mark.MarkConfig;
    boxplot?: import("./compositemark").BoxPlotConfig;
    errorbar?: import("./compositemark/errorbar").ErrorBarConfig;
    errorband?: import("./compositemark/errorband").ErrorBandConfig;
    axis?: import("./axis").AxisConfig;
    axisX?: import("./axis").AxisConfig;
    axisY?: import("./axis").AxisConfig;
    axisLeft?: import("./axis").AxisConfig;
    axisRight?: import("./axis").AxisConfig;
    axisTop?: import("./axis").AxisConfig;
    axisBottom?: import("./axis").AxisConfig;
    axisBand?: import("./axis").AxisConfig;
    axisPoint?: import("./axis").AxisConfig;
    axisDiscrete?: import("./axis").AxisConfig;
    axisQuantitative?: import("./axis").AxisConfig;
    axisTemporal?: import("./axis").AxisConfig;
    axisXBand?: import("./axis").AxisConfig;
    axisXPoint?: import("./axis").AxisConfig;
    axisXDiscrete?: import("./axis").AxisConfig;
    axisXQuantitative?: import("./axis").AxisConfig;
    axisXTemporal?: import("./axis").AxisConfig;
    axisYBand?: import("./axis").AxisConfig;
    axisYPoint?: import("./axis").AxisConfig;
    axisYDiscrete?: import("./axis").AxisConfig;
    axisYQuantitative?: import("./axis").AxisConfig;
    axisYTemporal?: import("./axis").AxisConfig;
    header?: import("./header").HeaderConfig;
    headerRow?: import("./header").HeaderConfig;
    headerColumn?: import("./header").HeaderConfig;
    headerFacet?: import("./header").HeaderConfig;
    facet?: import("./spec/base").CompositionConfig;
    concat?: import("./spec/base").CompositionConfig;
};
export declare function stripAndRedirectConfig(config: Config): Config;
//# sourceMappingURL=config.d.ts.map