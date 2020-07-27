import { Legend as VgLegend } from 'vega';
import { NonPositionScaleChannel } from '../../channel';
import { Legend } from '../../legend';
import { Split } from '../split';
export declare type LegendComponentProps = VgLegend & {
    labelExpr?: string;
    selections?: string[];
    disable?: boolean;
};
export declare const LEGEND_COMPONENT_PROPERTIES: ("padding" | "stroke" | "type" | "shape" | "orient" | "symbolLimit" | "tickCount" | "aria" | "description" | "cornerRadius" | "fillColor" | "offset" | "strokeColor" | "legendX" | "legendY" | "titleAlign" | "titleAnchor" | "titleBaseline" | "titleColor" | "titleFont" | "titleFontSize" | "titleFontStyle" | "titleFontWeight" | "titleLimit" | "titleLineHeight" | "titleOpacity" | "titleOrient" | "titlePadding" | "gradientLength" | "gradientOpacity" | "gradientThickness" | "gradientStrokeColor" | "gradientStrokeWidth" | "clipHeight" | "columns" | "columnPadding" | "rowPadding" | "gridAlign" | "symbolDash" | "symbolDashOffset" | "symbolFillColor" | "symbolOffset" | "symbolOpacity" | "symbolSize" | "symbolStrokeColor" | "symbolStrokeWidth" | "symbolType" | "labelAlign" | "labelBaseline" | "labelColor" | "labelFont" | "labelFontSize" | "labelFontStyle" | "labelFontWeight" | "labelLimit" | "labelOpacity" | "labelPadding" | "labelOffset" | "labelOverlap" | "labelSeparation" | "zindex" | "values" | "fill" | "opacity" | "strokeWidth" | "strokeDash" | "size" | "title" | "direction" | "format" | "formatType" | "tickMinStep" | "encode" | "labelExpr" | "disable" | "selections")[];
export declare class LegendComponent extends Split<LegendComponentProps> {
}
export declare type LegendComponentIndex = Partial<Record<NonPositionScaleChannel, LegendComponent>>;
export declare type LegendIndex = Partial<Record<NonPositionScaleChannel, Legend>>;
//# sourceMappingURL=component.d.ts.map