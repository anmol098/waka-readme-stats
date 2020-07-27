import { SelectionComponent } from '.';
import { LogicalComposition } from '../../logical';
import { SelectionDef, SelectionExtent } from '../../selection';
import { Dict } from '../../util';
import { DataFlowNode, OutputNode } from '../data/dataflow';
import { Model } from '../model';
import { UnitModel } from '../unit';
export declare function parseUnitSelection(model: UnitModel, selDefs: Dict<SelectionDef>): Record<string, SelectionComponent<any>>;
export declare function parseSelectionPredicate(model: Model, selections: LogicalComposition<string>, dfnode?: DataFlowNode, datum?: string): string;
export declare function parseSelectionBinExtent(selCmpt: SelectionComponent, extent: SelectionExtent): string;
export declare function materializeSelections(model: UnitModel, main: OutputNode): void;
//# sourceMappingURL=parse.d.ts.map