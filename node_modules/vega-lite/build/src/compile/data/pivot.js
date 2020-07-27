import { duplicate, hash, unique } from '../../util';
import { DataFlowNode } from './dataflow';
/**
 * A class for pivot transform nodes.
 */
export class PivotTransformNode extends DataFlowNode {
    constructor(parent, transform) {
        super(parent);
        this.transform = transform;
    }
    clone() {
        return new PivotTransformNode(null, duplicate(this.transform));
    }
    addDimensions(fields) {
        var _a;
        this.transform.groupby = unique(((_a = this.transform.groupby) !== null && _a !== void 0 ? _a : []).concat(fields), d => d);
    }
    producedFields() {
        return undefined; // return undefined so that potentially everything can depend on the pivot
    }
    dependentFields() {
        var _a;
        return new Set([this.transform.pivot, this.transform.value, ...((_a = this.transform.groupby) !== null && _a !== void 0 ? _a : [])]);
    }
    hash() {
        return `PivotTransform ${hash(this.transform)}`;
    }
    assemble() {
        const { pivot, value, groupby, limit, op } = this.transform;
        return Object.assign(Object.assign(Object.assign({ type: 'pivot', field: pivot, value }, (limit !== undefined ? { limit } : {})), (op !== undefined ? { op } : {})), (groupby !== undefined ? { groupby } : {}));
    }
}
//# sourceMappingURL=pivot.js.map