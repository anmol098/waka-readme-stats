import { Align, AxisOrient, Orient, SignalRef } from 'vega';
import { Axis } from '../../axis';
import { PositionScaleChannel } from '../../channel';
import { DatumDef, PositionDatumDef, PositionFieldDef, TypedFieldDef } from '../../channeldef';
import { Config, StyleConfigIndex } from '../../config';
import { Mark } from '../../mark';
import { Sort } from '../../sort';
import { Type } from '../../type';
import { UnitModel } from '../unit';
import { ScaleType } from './../../scale';
import { AxisComponentProps } from './component';
import { AxisConfigs } from './config';
export interface AxisRuleParams {
    fieldOrDatumDef: PositionFieldDef<string> | PositionDatumDef<string>;
    axis: Axis;
    channel: PositionScaleChannel;
    model: UnitModel;
    mark: Mark;
    scaleType: ScaleType;
    orient: Orient | SignalRef;
    labelAngle: number | SignalRef;
    config: Config;
}
export declare const axisRules: {
    [k in keyof AxisComponentProps]?: (params: AxisRuleParams) => AxisComponentProps[k];
};
/**
 * Default rules for whether to show a grid should be shown for a channel.
 * If `grid` is unspecified, the default value is `true` for ordinal scales that are not binned
 */
export declare function defaultGrid(scaleType: ScaleType, fieldDef: TypedFieldDef<string> | DatumDef): boolean;
export declare function gridScale(model: UnitModel, channel: PositionScaleChannel): string;
export declare function getLabelAngle(fieldOrDatumDef: PositionFieldDef<string> | PositionDatumDef<string>, axis: Axis, channel: PositionScaleChannel, styleConfig: StyleConfigIndex, axisConfigs?: AxisConfigs): number | SignalRef;
export declare function normalizeAngleExpr(angle: SignalRef): string;
export declare function defaultLabelBaseline(angle: number | SignalRef, orient: AxisOrient | SignalRef, channel: 'x' | 'y', alwaysIncludeMiddle?: boolean): "top" | "middle" | "bottom" | {
    signal: string;
};
export declare function defaultLabelAlign(angle: number | SignalRef, orient: AxisOrient | SignalRef, channel: 'x' | 'y'): Align | SignalRef;
export declare function defaultLabelFlush(type: Type, channel: PositionScaleChannel): boolean;
export declare function defaultLabelOverlap(type: Type, scaleType: ScaleType, hasTimeUnit: boolean, sort?: Sort<string>): true | "greedy";
export declare function defaultOrient(channel: PositionScaleChannel): "left" | "bottom";
export declare function defaultTickCount({ fieldOrDatumDef, scaleType, size, values: vals }: {
    fieldOrDatumDef: TypedFieldDef<string> | DatumDef;
    scaleType: ScaleType;
    size?: SignalRef;
    values?: Axis['values'];
}): {
    signal: string;
};
export declare function getFieldDefTitle(model: UnitModel, channel: 'x' | 'y'): string | string[] | SignalRef;
export declare function values(axis: Axis, fieldOrDatumDef: TypedFieldDef<string> | DatumDef): SignalRef | (string | number | boolean | import("../../datetime").DateTime | {
    signal: string;
})[];
export declare function defaultZindex(mark: Mark, fieldDef: TypedFieldDef<string> | DatumDef): 1 | 0;
//# sourceMappingURL=properties.d.ts.map