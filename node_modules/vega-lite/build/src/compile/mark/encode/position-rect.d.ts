import { SignalRef } from 'vega';
import { PolarPositionChannel, PositionChannel } from '../../../channel';
import { TypedFieldDef } from '../../../channeldef';
import { Config } from '../../../config';
import { Encoding } from '../../../encoding';
import { Mark, MarkDef } from '../../../mark';
import { VgEncodeEntry, VgValueRef } from '../../../vega.schema';
import { UnitModel } from '../../unit';
export declare function rectPosition(model: UnitModel, channel: 'x' | 'y' | 'theta' | 'radius', mark: 'bar' | 'rect' | 'image' | 'arc'): VgEncodeEntry;
export declare function rectBinPosition({ fieldDef, fieldDef2, channel, band, scaleName, markDef, spacing, axisTranslate, reverse, config }: {
    fieldDef: TypedFieldDef<string>;
    fieldDef2?: Encoding<string>['x2' | 'y2'];
    channel: 'x' | 'y' | 'theta' | 'radius';
    band: number;
    scaleName: string;
    markDef: MarkDef<Mark>;
    spacing?: number;
    axisTranslate: number | SignalRef;
    reverse: boolean | SignalRef;
    config: Config;
}): {
    [x: string]: VgValueRef | VgValueRef[];
} | {
    [x: string]: VgValueRef | {
        signal: string;
        offset: number | {
            signal: string;
        };
    };
};
/**
 * Value Ref for binned fields
 */
export declare function rectBinRef({ channel, fieldDef, scaleName, markDef, band, offset, config }: {
    channel: PositionChannel | PolarPositionChannel;
    fieldDef: TypedFieldDef<string>;
    scaleName: string;
    markDef: MarkDef<Mark>;
    band: number;
    offset?: number | SignalRef;
    config?: Config;
}): VgValueRef | VgValueRef[];
//# sourceMappingURL=position-rect.d.ts.map