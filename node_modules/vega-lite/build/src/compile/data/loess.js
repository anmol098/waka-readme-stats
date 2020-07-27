import { __rest } from "tslib";
import { duplicate, hash } from '../../util';
import { DataFlowNode } from './dataflow';
/**
 * A class for loess transform nodes
 */
export class LoessTransformNode extends DataFlowNode {
    constructor(parent, transform) {
        var _a, _b, _c;
        super(parent);
        this.transform = transform;
        this.transform = duplicate(transform); // duplicate to prevent side effects
        const specifiedAs = (_a = this.transform.as) !== null && _a !== void 0 ? _a : [undefined, undefined];
        this.transform.as = [(_b = specifiedAs[0]) !== null && _b !== void 0 ? _b : transform.on, (_c = specifiedAs[1]) !== null && _c !== void 0 ? _c : transform.loess];
    }
    clone() {
        return new LoessTransformNode(null, duplicate(this.transform));
    }
    dependentFields() {
        var _a;
        return new Set([this.transform.loess, this.transform.on, ...((_a = this.transform.groupby) !== null && _a !== void 0 ? _a : [])]);
    }
    producedFields() {
        return new Set(this.transform.as);
    }
    hash() {
        return `LoessTransform ${hash(this.transform)}`;
    }
    assemble() {
        const _a = this.transform, { loess, on } = _a, rest = __rest(_a, ["loess", "on"]);
        const result = Object.assign({ type: 'loess', x: on, y: loess }, rest);
        return result;
    }
}
//# sourceMappingURL=loess.js.map