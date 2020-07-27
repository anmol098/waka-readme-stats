import { SignalRef, Text } from 'vega';
import { AxisConfig } from '../axis';
import { FieldDefBase, FieldRefOption, OrderFieldDef } from '../channeldef';
import { Config, StyleConfigIndex } from '../config';
import { MarkConfig, MarkDef } from '../mark';
import { SortFields } from '../sort';
import { VgEncodeChannel, VgEncodeEntry, VgValueRef } from '../vega.schema';
import { AxisComponentProps } from './axis/component';
import { Explicit } from './split';
import { UnitModel } from './unit';
export declare const BIN_RANGE_DELIMITER = " \u2013 ";
export declare function signalOrValueRef<T>(value: T | SignalRef): {
    value: T;
} | SignalRef;
export declare function exprFromValueOrSignalRef(ref: VgValueRef | SignalRef): string;
export declare function signalOrStringValue(v: SignalRef | any): string;
export declare function applyMarkConfig(e: VgEncodeEntry, model: UnitModel, propsList: (keyof MarkConfig)[]): Partial<Record<VgEncodeChannel, VgValueRef | (VgValueRef & {
    test?: string;
})[]>>;
export declare function getStyles(mark: MarkDef): string[];
export declare function getMarkPropOrConfig<P extends keyof MarkDef>(channel: P, mark: MarkDef, config: Config, opt?: {
    vgChannel?: VgEncodeChannel;
    ignoreVgConfig?: boolean;
}): MarkDef[P];
/**
 * Return property value from style or mark specific config property if exists.
 * Otherwise, return general mark specific config.
 */
export declare function getMarkConfig<P extends keyof MarkDef>(channel: P, mark: MarkDef, config: Config, { vgChannel }?: {
    vgChannel?: VgEncodeChannel;
}): MarkDef[P];
export declare function getMarkStyleConfig<P extends keyof MarkDef>(prop: P, mark: MarkDef, styleConfigIndex: StyleConfigIndex): any;
export declare function getStyleConfig<P extends keyof MarkDef | keyof AxisConfig>(p: P, styles: string | string[], styleConfigIndex: StyleConfigIndex): any;
/**
 * Return Vega sort parameters (tuple of field and order).
 */
export declare function sortParams(orderDef: OrderFieldDef<string> | OrderFieldDef<string>[], fieldRefOption?: FieldRefOption): SortFields;
export declare type AxisTitleComponent = AxisComponentProps['title'];
export declare function mergeTitleFieldDefs(f1: readonly FieldDefBase<string>[], f2: readonly FieldDefBase<string>[]): FieldDefBase<string, boolean | import("../bin").BinParams | "binned">[];
export declare function mergeTitle(title1: Text | SignalRef, title2: Text | SignalRef): string | string[] | SignalRef;
export declare function mergeTitleComponent(v1: Explicit<AxisTitleComponent>, v2: Explicit<AxisTitleComponent>): {
    explicit: boolean;
    value: string | string[] | SignalRef;
} | {
    explicit: boolean;
    value: FieldDefBase<string, boolean | import("../bin").BinParams | "binned">[];
};
//# sourceMappingURL=common.d.ts.map