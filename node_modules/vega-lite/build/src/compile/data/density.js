import { __rest } from "tslib";
import { duplicate, hash } from '../../util';
import { DataFlowNode } from './dataflow';
/**
 * A class for density transform nodes
 */
export class DensityTransformNode extends DataFlowNode {
    constructor(parent, transform) {
        var _a, _b, _c;
        super(parent);
        this.transform = transform;
        this.transform = duplicate(transform); // duplicate to prevent side effects
        const specifiedAs = (_a = this.transform.as) !== null && _a !== void 0 ? _a : [undefined, undefined];
        this.transform.as = [(_b = specifiedAs[0]) !== null && _b !== void 0 ? _b : 'value', (_c = specifiedAs[1]) !== null && _c !== void 0 ? _c : 'density'];
    }
    clone() {
        return new DensityTransformNode(null, duplicate(this.transform));
    }
    dependentFields() {
        var _a;
        return new Set([this.transform.density, ...((_a = this.transform.groupby) !== null && _a !== void 0 ? _a : [])]);
    }
    producedFields() {
        return new Set(this.transform.as);
    }
    hash() {
        return `DensityTransform ${hash(this.transform)}`;
    }
    assemble() {
        const _a = this.transform, { density } = _a, rest = __rest(_a, ["density"]);
        const result = Object.assign({ type: 'kde', field: density }, rest);
        return result;
    }
}
//# sourceMappingURL=density.js.map