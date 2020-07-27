import { LabelOverlap, LegendOrient, LegendType, Orientation, SignalRef, SymbolShape } from 'vega';
import { DatumDef, MarkPropFieldOrDatumDef, TypedFieldDef } from '../../channeldef';
import { Config } from '../../config';
import { Encoding } from '../../encoding';
import { Legend, LegendConfig } from '../../legend';
import { Mark, MarkDef } from '../../mark';
import { ScaleType } from '../../scale';
import { TimeUnit } from '../../timeunit';
import { Model } from '../model';
import { UnitModel } from '../unit';
import { NonPositionScaleChannel } from './../../channel';
import { LegendComponentProps } from './component';
export interface LegendRuleParams {
    legend: Legend;
    channel: NonPositionScaleChannel;
    model: UnitModel;
    markDef: MarkDef;
    encoding: Encoding<string>;
    fieldOrDatumDef: MarkPropFieldOrDatumDef<string>;
    legendConfig: LegendConfig;
    config: Config;
    scaleType: ScaleType;
    orient: LegendOrient;
    legendType: LegendType;
    direction: Orientation;
}
export declare const legendRules: {
    [k in keyof LegendComponentProps]?: (params: LegendRuleParams) => LegendComponentProps[k];
};
export declare function values(legend: Legend, fieldOrDatumDef: TypedFieldDef<string> | DatumDef): SignalRef | (string | number | boolean | import("../../datetime").DateTime | {
    signal: string;
})[];
export declare function defaultSymbolType(mark: Mark, channel: NonPositionScaleChannel, shapeChannelDef: Encoding<string>['shape'], markShape: SymbolShape | SignalRef): SymbolShape | SignalRef;
export declare function clipHeight(legendType: LegendType): number;
export declare function getLegendType(params: {
    legend: Legend;
    channel: NonPositionScaleChannel;
    timeUnit?: TimeUnit;
    scaleType: ScaleType;
}): LegendType;
export declare function defaultType({ channel, timeUnit, scaleType }: {
    channel: NonPositionScaleChannel;
    timeUnit?: TimeUnit;
    scaleType: ScaleType;
}): LegendType;
export declare function getDirection({ legendConfig, legendType, orient, legend }: {
    orient: LegendOrient;
    legendConfig: LegendConfig;
    legendType: LegendType;
    legend: Legend;
}): Orientation;
export declare function defaultDirection(orient: LegendOrient, legendType: LegendType): 'horizontal' | undefined;
export declare function defaultGradientLength({ legendConfig, model, direction, orient, scaleType }: {
    scaleType: ScaleType;
    direction: Orientation;
    orient: LegendOrient;
    model: Model;
    legendConfig: LegendConfig;
}): number | {
    signal: string;
};
export declare function defaultLabelOverlap(scaleType: ScaleType): LabelOverlap;
//# sourceMappingURL=properties.d.ts.map