import { isAggregateOp } from '../../aggregate';
import { vgField } from '../../channeldef';
import { duplicate, hash } from '../../util';
import { unique } from '../../util';
import { DataFlowNode } from './dataflow';
/**
 * A class for the window transform nodes
 */
export class WindowTransformNode extends DataFlowNode {
    constructor(parent, transform) {
        super(parent);
        this.transform = transform;
    }
    clone() {
        return new WindowTransformNode(null, duplicate(this.transform));
    }
    addDimensions(fields) {
        this.transform.groupby = unique(this.transform.groupby.concat(fields), d => d);
    }
    dependentFields() {
        var _a, _b;
        const out = new Set();
        ((_a = this.transform.groupby) !== null && _a !== void 0 ? _a : []).forEach(out.add, out);
        ((_b = this.transform.sort) !== null && _b !== void 0 ? _b : []).forEach(m => out.add(m.field));
        this.transform.window
            .map(w => w.field)
            .filter(f => f !== undefined)
            .forEach(out.add, out);
        return out;
    }
    producedFields() {
        return new Set(this.transform.window.map(this.getDefaultName));
    }
    getDefaultName(windowFieldDef) {
        var _a;
        return (_a = windowFieldDef.as) !== null && _a !== void 0 ? _a : vgField(windowFieldDef);
    }
    hash() {
        return `WindowTransform ${hash(this.transform)}`;
    }
    assemble() {
        var _a;
        const fields = [];
        const ops = [];
        const as = [];
        const params = [];
        for (const window of this.transform.window) {
            ops.push(window.op);
            as.push(this.getDefaultName(window));
            params.push(window.param === undefined ? null : window.param);
            fields.push(window.field === undefined ? null : window.field);
        }
        const frame = this.transform.frame;
        const groupby = this.transform.groupby;
        if (frame && frame[0] === null && frame[1] === null && ops.every(o => isAggregateOp(o))) {
            // when the window does not rely on any particular window ops or frame, switch to a simpler and more efficient joinaggregate
            return Object.assign({ type: 'joinaggregate', as, ops: ops, fields }, (groupby !== undefined ? { groupby } : {}));
        }
        const sortFields = [];
        const sortOrder = [];
        if (this.transform.sort !== undefined) {
            for (const sortField of this.transform.sort) {
                sortFields.push(sortField.field);
                sortOrder.push((_a = sortField.order) !== null && _a !== void 0 ? _a : 'ascending');
            }
        }
        const sort = {
            field: sortFields,
            order: sortOrder
        };
        const ignorePeers = this.transform.ignorePeers;
        return Object.assign(Object.assign(Object.assign({ type: 'window', params,
            as,
            ops,
            fields,
            sort }, (ignorePeers !== undefined ? { ignorePeers } : {})), (groupby !== undefined ? { groupby } : {})), (frame !== undefined ? { frame } : {}));
    }
}
//# sourceMappingURL=window.js.map