import { __rest } from "tslib";
import { duplicate, hash } from '../../util';
import { DataFlowNode } from './dataflow';
/**
 * A class for quantile transform nodes
 */
export class QuantileTransformNode extends DataFlowNode {
    constructor(parent, transform) {
        var _a, _b, _c;
        super(parent);
        this.transform = transform;
        this.transform = duplicate(transform); // duplicate to prevent side effects
        const specifiedAs = (_a = this.transform.as) !== null && _a !== void 0 ? _a : [undefined, undefined];
        this.transform.as = [(_b = specifiedAs[0]) !== null && _b !== void 0 ? _b : 'prob', (_c = specifiedAs[1]) !== null && _c !== void 0 ? _c : 'value'];
    }
    clone() {
        return new QuantileTransformNode(null, duplicate(this.transform));
    }
    dependentFields() {
        var _a;
        return new Set([this.transform.quantile, ...((_a = this.transform.groupby) !== null && _a !== void 0 ? _a : [])]);
    }
    producedFields() {
        return new Set(this.transform.as);
    }
    hash() {
        return `QuantileTransform ${hash(this.transform)}`;
    }
    assemble() {
        const _a = this.transform, { quantile } = _a, rest = __rest(_a, ["quantile"]);
        const result = Object.assign({ type: 'quantile', field: quantile }, rest);
        return result;
    }
}
//# sourceMappingURL=quantile.js.map