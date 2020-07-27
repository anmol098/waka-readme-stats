import { SingleDefUnitChannel } from '../../../channel';
import { TimeUnitNode } from '../../data/timeunit';
import { TransformCompiler } from './transforms';
export declare const TUPLE_FIELDS = "_tuple_fields";
/**
 * Whether the selection tuples hold enumerated or ranged values for a field.
 */
export declare type TupleStoreType = 'E' | 'R' | 'R-RE';
export interface SelectionProjection {
    type: TupleStoreType;
    field: string;
    channel?: SingleDefUnitChannel;
    signals?: {
        data?: string;
        visual?: string;
    };
    hasLegend?: boolean;
}
export declare class SelectionProjectionComponent {
    hasChannel: Partial<Record<SingleDefUnitChannel, SelectionProjection>>;
    hasField: Record<string, SelectionProjection>;
    timeUnit?: TimeUnitNode;
    items: SelectionProjection[];
    constructor(...items: SelectionProjection[]);
}
declare const project: TransformCompiler;
export default project;
//# sourceMappingURL=project.d.ts.map