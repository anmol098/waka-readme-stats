import { Axis as VgAxis, SignalRef, Text } from 'vega';
import { Axis, AxisPart, AxisPropsWithConditionAndSignal, ConditionalAxisProp, SignalAxisProp } from '../../axis';
import { FieldDefBase } from '../../channeldef';
import { Split } from '../split';
export declare type AxisComponentProps = Omit<VgAxis, 'title' | ConditionalAxisProp | SignalAxisProp> & Omit<AxisPropsWithConditionAndSignal, 'title'> & {
    title: Text | FieldDefBase<string>[] | SignalRef;
    labelExpr: string;
    disable: boolean;
};
export declare const AXIS_COMPONENT_PROPERTIES: ("orient" | "tickCount" | "aria" | "description" | "offset" | "titleAlign" | "titleAnchor" | "titleBaseline" | "titleColor" | "titleFont" | "titleFontSize" | "titleFontStyle" | "titleFontWeight" | "titleLimit" | "titleLineHeight" | "titleOpacity" | "titlePadding" | "labelAlign" | "labelBaseline" | "labelColor" | "labelFont" | "labelFontSize" | "labelFontStyle" | "labelFontWeight" | "labelLimit" | "labelOpacity" | "labelPadding" | "labelOffset" | "labelOverlap" | "labelSeparation" | "zindex" | "values" | "domain" | "title" | "labels" | "format" | "formatType" | "tickMinStep" | "encode" | "labelExpr" | "disable" | "titleAngle" | "labelAngle" | "labelLineHeight" | "scale" | "translate" | "ticks" | "gridColor" | "gridDash" | "gridDashOffset" | "gridOpacity" | "gridWidth" | "tickColor" | "tickDash" | "tickDashOffset" | "tickOpacity" | "tickSize" | "tickWidth" | "domainColor" | "minExtent" | "maxExtent" | "bandPosition" | "titleX" | "titleY" | "domainCap" | "domainDash" | "domainDashOffset" | "domainOpacity" | "domainWidth" | "tickBand" | "tickCap" | "tickExtra" | "tickOffset" | "tickRound" | "grid" | "gridCap" | "labelBound" | "labelFlush" | "labelFlushOffset" | "position" | "gridScale")[];
export declare class AxisComponent extends Split<AxisComponentProps> {
    readonly explicit: Partial<AxisComponentProps>;
    readonly implicit: Partial<AxisComponentProps>;
    mainExtracted: boolean;
    constructor(explicit?: Partial<AxisComponentProps>, implicit?: Partial<AxisComponentProps>, mainExtracted?: boolean);
    clone(): AxisComponent;
    hasAxisPart(part: AxisPart): boolean;
    hasOrientSignalRef(): boolean;
}
export interface AxisComponentIndex {
    x?: AxisComponent[];
    y?: AxisComponent[];
}
export interface AxisIndex {
    x?: Axis;
    y?: Axis;
}
//# sourceMappingURL=component.d.ts.map