import { Encoding } from '../encoding';
import { GenericSpec } from '../spec';
import { GenericUnitSpec, NormalizedUnitSpec } from '../spec/unit';
import { NonFacetUnitNormalizer } from './base';
declare type UnitSpecWithRangeStep = GenericUnitSpec<Encoding<string>, any>;
export declare class RangeStepNormalizer implements NonFacetUnitNormalizer<UnitSpecWithRangeStep> {
    name: string;
    hasMatchingType(spec: GenericSpec<any, any, any, any>): spec is UnitSpecWithRangeStep;
    run(spec: UnitSpecWithRangeStep): NormalizedUnitSpec;
}
export {};
//# sourceMappingURL=rangestep.d.ts.map