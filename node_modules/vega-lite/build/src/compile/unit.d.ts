import { NewSignal } from 'vega';
import { Axis } from '../axis';
import { Channel, ScaleChannel, SingleDefChannel, PositionChannel, NonPositionScaleChannel } from '../channel';
import { Config } from '../config';
import * as vlEncoding from '../encoding';
import { Encoding } from '../encoding';
import { Legend } from '../legend';
import { Mark, MarkDef } from '../mark';
import { Projection } from '../projection';
import { Domain } from '../scale';
import { SelectionDef } from '../selection';
import { LayoutSizeMixins, NormalizedUnitSpec } from '../spec';
import { StackProperties } from '../stack';
import { Dict } from '../util';
import { VgData, VgLayout } from '../vega.schema';
import { AxisIndex } from './axis/component';
import { LegendIndex } from './legend/component';
import { Model, ModelWithField } from './model';
import { ScaleIndex } from './scale/component';
/**
 * Internal model of Vega-Lite specification for the compiler.
 */
export declare class UnitModel extends ModelWithField {
    readonly markDef: MarkDef;
    readonly encoding: Encoding<string>;
    readonly specifiedScales: ScaleIndex;
    readonly stack: StackProperties;
    protected specifiedAxes: AxisIndex;
    protected specifiedLegends: LegendIndex;
    specifiedProjection: Projection;
    readonly selection: Dict<SelectionDef>;
    children: Model[];
    constructor(spec: NormalizedUnitSpec, parent: Model, parentGivenName: string, parentGivenSize: LayoutSizeMixins, config: Config);
    get hasProjection(): boolean;
    /**
     * Return specified Vega-Lite scale domain for a particular channel
     * @param channel
     */
    scaleDomain(channel: ScaleChannel): Domain;
    axis(channel: PositionChannel): Axis;
    legend(channel: NonPositionScaleChannel): Legend;
    private initScales;
    private initAxes;
    private initLegend;
    parseData(): void;
    parseLayoutSize(): void;
    parseSelections(): void;
    parseMarkGroup(): void;
    parseAxesAndHeaders(): void;
    assembleSelectionTopLevelSignals(signals: any[]): NewSignal[];
    assembleSignals(): NewSignal[];
    assembleSelectionData(data: readonly VgData[]): VgData[];
    assembleLayout(): VgLayout;
    assembleLayoutSignals(): NewSignal[];
    assembleMarks(): any[];
    protected getMapping(): vlEncoding.Encoding<string>;
    get mark(): Mark;
    channelHasField(channel: Channel): boolean;
    fieldDef(channel: SingleDefChannel): import("../channeldef").FieldDef<string, any>;
    typedFieldDef(channel: SingleDefChannel): import("../channeldef").TypedFieldDef<string, any, boolean | import("../bin").BinParams | "binned">;
}
//# sourceMappingURL=unit.d.ts.map