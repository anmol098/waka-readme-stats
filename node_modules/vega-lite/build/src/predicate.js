import { isArray } from 'vega-util';
import { valueExpr, vgField } from './channeldef';
import { fieldExpr as timeUnitFieldExpr, normalizeTimeUnit } from './timeunit';
import { isSignalRef } from './vega.schema';
export function isSelectionPredicate(predicate) {
    return predicate === null || predicate === void 0 ? void 0 : predicate['selection'];
}
export function isFieldEqualPredicate(predicate) {
    return predicate && !!predicate.field && predicate.equal !== undefined;
}
export function isFieldLTPredicate(predicate) {
    return predicate && !!predicate.field && predicate.lt !== undefined;
}
export function isFieldLTEPredicate(predicate) {
    return predicate && !!predicate.field && predicate.lte !== undefined;
}
export function isFieldGTPredicate(predicate) {
    return predicate && !!predicate.field && predicate.gt !== undefined;
}
export function isFieldGTEPredicate(predicate) {
    return predicate && !!predicate.field && predicate.gte !== undefined;
}
export function isFieldRangePredicate(predicate) {
    if (predicate && predicate.field) {
        if (isArray(predicate.range) && predicate.range.length === 2) {
            return true;
        }
        else if (isSignalRef(predicate.range)) {
            return true;
        }
    }
    return false;
}
export function isFieldOneOfPredicate(predicate) {
    return (predicate && !!predicate.field && (isArray(predicate.oneOf) || isArray(predicate.in)) // backward compatibility
    );
}
export function isFieldValidPredicate(predicate) {
    return predicate && !!predicate.field && predicate.valid !== undefined;
}
export function isFieldPredicate(predicate) {
    return (isFieldOneOfPredicate(predicate) ||
        isFieldEqualPredicate(predicate) ||
        isFieldRangePredicate(predicate) ||
        isFieldLTPredicate(predicate) ||
        isFieldGTPredicate(predicate) ||
        isFieldLTEPredicate(predicate) ||
        isFieldGTEPredicate(predicate));
}
function predicateValueExpr(v, timeUnit) {
    return valueExpr(v, { timeUnit, wrapTime: true });
}
function predicateValuesExpr(vals, timeUnit) {
    return vals.map(v => predicateValueExpr(v, timeUnit));
}
// This method is used by Voyager. Do not change its behavior without changing Voyager.
export function fieldFilterExpression(predicate, useInRange = true) {
    var _a;
    const { field } = predicate;
    const timeUnit = (_a = normalizeTimeUnit(predicate.timeUnit)) === null || _a === void 0 ? void 0 : _a.unit;
    const fieldExpr = timeUnit
        ? // For timeUnit, cast into integer with time() so we can use ===, inrange, indexOf to compare values directly.
            // TODO: We calculate timeUnit on the fly here. Consider if we would like to consolidate this with timeUnit pipeline
            // TODO: support utc
            'time(' + timeUnitFieldExpr(timeUnit, field) + ')'
        : vgField(predicate, { expr: 'datum' });
    if (isFieldEqualPredicate(predicate)) {
        return fieldExpr + '===' + predicateValueExpr(predicate.equal, timeUnit);
    }
    else if (isFieldLTPredicate(predicate)) {
        const upper = predicate.lt;
        return `${fieldExpr}<${predicateValueExpr(upper, timeUnit)}`;
    }
    else if (isFieldGTPredicate(predicate)) {
        const lower = predicate.gt;
        return `${fieldExpr}>${predicateValueExpr(lower, timeUnit)}`;
    }
    else if (isFieldLTEPredicate(predicate)) {
        const upper = predicate.lte;
        return `${fieldExpr}<=${predicateValueExpr(upper, timeUnit)}`;
    }
    else if (isFieldGTEPredicate(predicate)) {
        const lower = predicate.gte;
        return `${fieldExpr}>=${predicateValueExpr(lower, timeUnit)}`;
    }
    else if (isFieldOneOfPredicate(predicate)) {
        return `indexof([${predicateValuesExpr(predicate.oneOf, timeUnit).join(',')}], ${fieldExpr}) !== -1`;
    }
    else if (isFieldValidPredicate(predicate)) {
        return fieldValidPredicate(fieldExpr, predicate.valid);
    }
    else if (isFieldRangePredicate(predicate)) {
        const { range } = predicate;
        const lower = isSignalRef(range) ? { signal: `${range.signal}[0]` } : range[0];
        const upper = isSignalRef(range) ? { signal: `${range.signal}[1]` } : range[1];
        if (lower !== null && upper !== null && useInRange) {
            return ('inrange(' +
                fieldExpr +
                ', [' +
                predicateValueExpr(lower, timeUnit) +
                ', ' +
                predicateValueExpr(upper, timeUnit) +
                '])');
        }
        const exprs = [];
        if (lower !== null) {
            exprs.push(`${fieldExpr} >= ${predicateValueExpr(lower, timeUnit)}`);
        }
        if (upper !== null) {
            exprs.push(`${fieldExpr} <= ${predicateValueExpr(upper, timeUnit)}`);
        }
        return exprs.length > 0 ? exprs.join(' && ') : 'true';
    }
    /* istanbul ignore next: it should never reach here */
    throw new Error(`Invalid field predicate: ${JSON.stringify(predicate)}`);
}
export function fieldValidPredicate(fieldExpr, valid = true) {
    if (valid) {
        return `isValid(${fieldExpr}) && isFinite(+${fieldExpr})`;
    }
    else {
        return `!isValid(${fieldExpr}) || !isFinite(+${fieldExpr})`;
    }
}
export function normalizePredicate(f) {
    var _a;
    if (isFieldPredicate(f) && f.timeUnit) {
        return Object.assign(Object.assign({}, f), { timeUnit: (_a = normalizeTimeUnit(f.timeUnit)) === null || _a === void 0 ? void 0 : _a.unit });
    }
    return f;
}
//# sourceMappingURL=predicate.js.map