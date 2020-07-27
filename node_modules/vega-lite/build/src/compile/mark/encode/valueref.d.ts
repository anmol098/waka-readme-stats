/**
 * Utility files for producing Vega ValueRef for marks
 */
import { SignalRef } from 'vega';
import { Channel, PolarPositionChannel, PositionChannel } from '../../../channel';
import { ChannelDef, DatumDef, FieldDef, FieldDefBase, FieldName, FieldRefOption, SecondaryChannelDef, SecondaryFieldDef, TypedFieldDef, Value } from '../../../channeldef';
import { Config } from '../../../config';
import { Mark, MarkDef } from '../../../mark';
import { StackProperties } from '../../../stack';
import { VgValueRef } from '../../../vega.schema';
import { ScaleComponent } from '../../scale/component';
export declare function midPointRefWithPositionInvalidTest(params: MidPointParams & {
    channel: PositionChannel | PolarPositionChannel;
}): VgValueRef | VgValueRef[];
export declare function wrapPositionInvalidTest({ fieldDef, channel, markDef, ref, config }: {
    fieldDef: FieldDef<string>;
    channel: PositionChannel | PolarPositionChannel;
    markDef: MarkDef<Mark>;
    ref: VgValueRef;
    config: Config;
}): VgValueRef | VgValueRef[];
export declare function fieldInvalidTestValueRef(fieldDef: FieldDef<string>, channel: PositionChannel | PolarPositionChannel): {
    field: {
        group: string;
    };
    value?: undefined;
    test: string;
} | {
    value: number;
    field?: undefined;
    test: string;
};
export declare function fieldInvalidPredicate(field: FieldName | FieldDef<string>, invalid?: boolean): string;
export declare function datumDefToExpr(datumDef: DatumDef<string>): string;
export declare function valueRefForFieldOrDatumDef(fieldDef: FieldDefBase<string> | DatumDef<string>, scaleName: string, opt: FieldRefOption, encode: {
    offset?: number | VgValueRef;
    band?: number | boolean;
}): VgValueRef;
/**
 * Signal that returns the middle of a bin from start and end field. Should only be used with x and y.
 */
export declare function interpolatedSignalRef({ scaleName, fieldOrDatumDef, fieldOrDatumDef2, offset, startSuffix, band }: {
    scaleName: string;
    fieldOrDatumDef: TypedFieldDef<string>;
    fieldOrDatumDef2?: SecondaryFieldDef<string>;
    startSuffix?: string;
    offset: number | SignalRef;
    band: number;
}): VgValueRef;
export interface MidPointParams {
    channel: Channel;
    channelDef: ChannelDef;
    channel2Def?: SecondaryChannelDef<string>;
    markDef: MarkDef<Mark>;
    config: Config;
    scaleName: string;
    scale: ScaleComponent;
    stack?: StackProperties;
    offset?: number | SignalRef;
    defaultRef: VgValueRef | (() => VgValueRef);
    /**
     * Allow overriding band instead of reading to field def since band is applied to size (width/height) instead of the position for x/y-position with band scales.
     */
    band?: number;
}
/**
 * @returns {VgValueRef} Value Ref for xc / yc or mid point for other channels.
 */
export declare function midPoint({ channel, channelDef, channel2Def, markDef, config, scaleName, scale, stack, offset, defaultRef, band }: MidPointParams): VgValueRef;
/**
 * Convert special "width" and "height" values in Vega-Lite into Vega value ref.
 */
export declare function widthHeightValueOrSignalRef(channel: Channel, value: Value | SignalRef): SignalRef | {
    value: string | number | boolean | string[] | import("vega").LinearGradient | import("vega").RadialGradient | number[];
} | {
    field: {
        group: string;
    };
};
//# sourceMappingURL=valueref.d.ts.map