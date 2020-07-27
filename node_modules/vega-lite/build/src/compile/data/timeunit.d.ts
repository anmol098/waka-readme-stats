import { TimeUnitTransform as VgTimeUnitTransform } from 'vega';
import { TimeUnitTransform } from '../../transform';
import { Dict } from '../../util';
import { ModelWithField } from '../model';
import { DataFlowNode } from './dataflow';
export declare type TimeUnitComponent = TimeUnitTransform & {
    /** whether to output time unit as a band (generate two formula including start and end) */
    band?: boolean;
};
export declare class TimeUnitNode extends DataFlowNode {
    private formula;
    clone(): TimeUnitNode;
    constructor(parent: DataFlowNode, formula: Dict<TimeUnitComponent>);
    static makeFromEncoding(parent: DataFlowNode, model: ModelWithField): TimeUnitNode;
    static makeFromTransform(parent: DataFlowNode, t: TimeUnitTransform): TimeUnitNode;
    /**
     * Merge together TimeUnitNodes assigning the children of `other` to `this`
     * and removing `other`.
     */
    merge(other: TimeUnitNode): void;
    producedFields(): Set<string>;
    dependentFields(): Set<string>;
    hash(): string;
    assemble(): VgTimeUnitTransform[];
}
//# sourceMappingURL=timeunit.d.ts.map