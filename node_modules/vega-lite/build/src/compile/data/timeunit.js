import { __rest } from "tslib";
import { getSecondaryRangeChannel } from '../../channel';
import { hasBand, vgField } from '../../channeldef';
import { getTimeUnitParts, normalizeTimeUnit } from '../../timeunit';
import { duplicate, hash, isEmpty, replacePathInField, vals } from '../../util';
import { isUnitModel } from '../model';
import { DataFlowNode } from './dataflow';
export class TimeUnitNode extends DataFlowNode {
    constructor(parent, formula) {
        super(parent);
        this.formula = formula;
    }
    clone() {
        return new TimeUnitNode(null, duplicate(this.formula));
    }
    static makeFromEncoding(parent, model) {
        const formula = model.reduceFieldDef((timeUnitComponent, fieldDef, channel) => {
            const { field, timeUnit } = fieldDef;
            const channelDef2 = isUnitModel(model) ? model.encoding[getSecondaryRangeChannel(channel)] : undefined;
            const band = isUnitModel(model) && hasBand(channel, fieldDef, channelDef2, model.stack, model.markDef, model.config);
            if (timeUnit) {
                const as = vgField(fieldDef, { forAs: true });
                timeUnitComponent[hash({
                    as,
                    field,
                    timeUnit
                })] = Object.assign({ as,
                    field,
                    timeUnit }, (band ? { band: true } : {}));
            }
            return timeUnitComponent;
        }, {});
        if (isEmpty(formula)) {
            return null;
        }
        return new TimeUnitNode(parent, formula);
    }
    static makeFromTransform(parent, t) {
        const _a = Object.assign({}, t), { timeUnit } = _a, other = __rest(_a, ["timeUnit"]);
        const normalizedTimeUnit = normalizeTimeUnit(timeUnit);
        const component = Object.assign(Object.assign({}, other), { timeUnit: normalizedTimeUnit });
        return new TimeUnitNode(parent, {
            [hash(component)]: component
        });
    }
    /**
     * Merge together TimeUnitNodes assigning the children of `other` to `this`
     * and removing `other`.
     */
    merge(other) {
        this.formula = Object.assign({}, this.formula);
        // if the same hash happen twice, merge "band"
        for (const key in other.formula) {
            if (!this.formula[key] || other.formula[key].band) {
                // copy if it's not a duplicate or if we need to include copy band over
                this.formula[key] = other.formula[key];
            }
        }
        for (const child of other.children) {
            other.removeChild(child);
            child.parent = this;
        }
        other.remove();
    }
    producedFields() {
        return new Set(vals(this.formula).map(f => f.as));
    }
    dependentFields() {
        return new Set(vals(this.formula).map(f => f.field));
    }
    hash() {
        return `TimeUnit ${hash(this.formula)}`;
    }
    assemble() {
        const transforms = [];
        for (const f of vals(this.formula)) {
            const { field, as, timeUnit } = f;
            const _a = normalizeTimeUnit(timeUnit), { unit, utc } = _a, params = __rest(_a, ["unit", "utc"]);
            transforms.push(Object.assign(Object.assign(Object.assign(Object.assign({ field: replacePathInField(field), type: 'timeunit' }, (unit ? { units: getTimeUnitParts(unit) } : {})), (utc ? { timezone: 'utc' } : {})), params), { as: [as, `${as}_end`] }));
        }
        return transforms;
    }
}
//# sourceMappingURL=timeunit.js.map