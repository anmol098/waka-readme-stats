import { duplicate, hash } from '../../util';
import { DataFlowNode } from './dataflow';
/**
 * A class for flatten transform nodes
 */
export class FoldTransformNode extends DataFlowNode {
    constructor(parent, transform) {
        var _a, _b, _c;
        super(parent);
        this.transform = transform;
        this.transform = duplicate(transform); // duplicate to prevent side effects
        const specifiedAs = (_a = this.transform.as) !== null && _a !== void 0 ? _a : [undefined, undefined];
        this.transform.as = [(_b = specifiedAs[0]) !== null && _b !== void 0 ? _b : 'key', (_c = specifiedAs[1]) !== null && _c !== void 0 ? _c : 'value'];
    }
    clone() {
        return new FoldTransformNode(null, duplicate(this.transform));
    }
    dependentFields() {
        return new Set(this.transform.fold);
    }
    producedFields() {
        return new Set(this.transform.as);
    }
    hash() {
        return `FoldTransform ${hash(this.transform)}`;
    }
    assemble() {
        const { fold, as } = this.transform;
        const result = {
            type: 'fold',
            fields: fold,
            as
        };
        return result;
    }
}
//# sourceMappingURL=fold.js.map