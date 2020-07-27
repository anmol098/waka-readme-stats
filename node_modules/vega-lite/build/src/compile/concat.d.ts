import { NewSignal } from 'vega';
import { Config } from '../config';
import { NormalizedConcatSpec } from '../spec';
import { VgLayout } from '../vega.schema';
import { VgData } from '../vega.schema';
import { Model } from './model';
export declare class ConcatModel extends Model {
    readonly children: Model[];
    constructor(spec: NormalizedConcatSpec, parent: Model, parentGivenName: string, config: Config);
    parseData(): void;
    parseSelections(): void;
    parseMarkGroup(): void;
    parseAxesAndHeaders(): void;
    private getChildren;
    parseLayoutSize(): void;
    parseAxisGroup(): void;
    assembleSelectionTopLevelSignals(signals: NewSignal[]): NewSignal[];
    assembleSignals(): NewSignal[];
    assembleLayoutSignals(): NewSignal[];
    assembleSelectionData(data: readonly VgData[]): readonly VgData[];
    assembleMarks(): any[];
    protected assembleDefaultLayout(): VgLayout;
}
//# sourceMappingURL=concat.d.ts.map