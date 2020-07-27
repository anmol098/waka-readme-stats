import { hash } from '../../util';
import { DataFlowNode } from './dataflow';
export class SequenceNode extends DataFlowNode {
    constructor(parent, params) {
        super(parent);
        this.params = params;
    }
    clone() {
        return new SequenceNode(null, this.params);
    }
    dependentFields() {
        return new Set();
    }
    producedFields() {
        var _a;
        return new Set([(_a = this.params.as) !== null && _a !== void 0 ? _a : 'data']);
    }
    hash() {
        return `Hash ${hash(this.params)}`;
    }
    assemble() {
        return Object.assign({ type: 'sequence' }, this.params);
    }
}
//# sourceMappingURL=sequence.js.map