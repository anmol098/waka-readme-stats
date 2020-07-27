import { BaseTitle, Text, TextEncodeEntry, TitleAnchor } from 'vega';
import { MarkConfig } from './mark';
import { ExcludeMappedValueRef, ExcludeMappedValueRefButKeepSignal } from './vega.schema';
export declare type BaseTitleNoValueRefs = ExcludeMappedValueRefButKeepSignal<Omit<BaseTitle, 'align' | 'baseline'>> & ExcludeMappedValueRef<Pick<BaseTitle, 'align' | 'baseline'>>;
export declare type TitleConfig = BaseTitleNoValueRefs;
export interface TitleBase extends BaseTitleNoValueRefs {
    /**
     * The anchor position for placing the title. One of `"start"`, `"middle"`, or `"end"`. For example, with an orientation of top these anchor positions map to a left-, center-, or right-aligned title.
     *
     * __Default value:__ `"middle"` for [single](https://vega.github.io/vega-lite/docs/spec.html) and [layered](https://vega.github.io/vega-lite/docs/layer.html) views.
     * `"start"` for other composite views.
     *
     * __Note:__ [For now](https://github.com/vega/vega-lite/issues/2875), `anchor` is only customizable only for [single](https://vega.github.io/vega-lite/docs/spec.html) and [layered](https://vega.github.io/vega-lite/docs/layer.html) views. For other composite views, `anchor` is always `"start"`.
     */
    anchor?: TitleAnchor;
    /**
     * A [mark style property](https://vega.github.io/vega-lite/docs/config.html#style) to apply to the title text mark.
     *
     * __Default value:__ `"group-title"`.
     */
    style?: string | string[];
    /**
     * 	The integer z-index indicating the layering of the title group relative to other axis, mark and legend groups.
     *
     * __Default value:__ `0`.
     *
     * @TJS-type integer
     * @minimum 0
     */
    zindex?: number;
    /**
     * Mark definitions for custom encoding.
     *
     * @hidden
     */
    encoding?: TextEncodeEntry;
}
export interface TitleParams extends TitleBase {
    /**
     * The title text.
     */
    text: Text;
    /**
     * The subtitle Text.
     */
    subtitle?: Text;
}
export declare function extractTitleConfig(titleConfig: TitleConfig): {
    titleMarkConfig: MarkConfig;
    subtitleMarkConfig: MarkConfig;
    nonMark: BaseTitleNoValueRefs;
    subtitle: BaseTitleNoValueRefs;
};
export declare function isText(v: any): v is Text;
//# sourceMappingURL=title.d.ts.map