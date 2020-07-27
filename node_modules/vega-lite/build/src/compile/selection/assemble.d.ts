import { Signal, SignalRef } from 'vega';
import { SelectionInit, SelectionInitInterval, SelectionExtent } from '../../selection';
import { VgData } from '../../vega.schema';
import { FacetModel } from '../facet';
import { LayerModel } from '../layer';
import { Model } from '../model';
import { UnitModel } from '../unit';
export declare function assembleInit(init: readonly (SelectionInit | readonly SelectionInit[] | SelectionInitInterval)[] | SelectionInit, isExpr?: boolean, wrap?: (str: string | number) => string | number): any;
export declare function assembleUnitSelectionSignals(model: UnitModel, signals: Signal[]): Signal[];
export declare function assembleFacetSignals(model: FacetModel, signals: Signal[]): Signal[];
export declare function assembleTopLevelSignals(model: UnitModel, signals: Signal[]): Signal[];
export declare function assembleUnitSelectionData(model: UnitModel, data: readonly VgData[]): VgData[];
export declare function assembleUnitSelectionMarks(model: UnitModel, marks: any[]): any[];
export declare function assembleLayerSelectionMarks(model: LayerModel, marks: any[]): any[];
export declare function assembleSelectionScaleDomain(model: Model, extent: SelectionExtent): SignalRef;
//# sourceMappingURL=assemble.d.ts.map