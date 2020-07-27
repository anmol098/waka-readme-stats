import { array, isBoolean } from 'vega-util';
import { SUM_OPS } from './aggregate';
import { getSecondaryRangeChannel, NONPOSITION_CHANNELS } from './channel';
import { channelDefType, getFieldDef, isFieldDef, isFieldOrDatumDef, vgField } from './channeldef';
import { channelHasField, isAggregate } from './encoding';
import * as log from './log';
import { ARC, AREA, BAR, CIRCLE, isMarkDef, isPathMark, LINE, POINT, RULE, SQUARE, TEXT, TICK } from './mark';
import { ScaleType } from './scale';
import { contains } from './util';
const STACK_OFFSET_INDEX = {
    zero: 1,
    center: 1,
    normalize: 1
};
export function isStackOffset(s) {
    return s in STACK_OFFSET_INDEX;
}
export const STACKABLE_MARKS = new Set([ARC, BAR, AREA, RULE, POINT, CIRCLE, SQUARE, LINE, TEXT, TICK]);
export const STACK_BY_DEFAULT_MARKS = new Set([BAR, AREA, ARC]);
function potentialStackedChannel(encoding, x) {
    var _a, _b;
    const y = x === 'x' ? 'y' : 'radius';
    const xDef = encoding[x];
    const yDef = encoding[y];
    if (isFieldDef(xDef) && isFieldDef(yDef)) {
        if (channelDefType(xDef) === 'quantitative' && channelDefType(yDef) === 'quantitative') {
            if (xDef.stack) {
                return x;
            }
            else if (yDef.stack) {
                return y;
            }
            const xAggregate = isFieldDef(xDef) && !!xDef.aggregate;
            const yAggregate = isFieldDef(yDef) && !!yDef.aggregate;
            // if there is no explicit stacking, only apply stack if there is only one aggregate for x or y
            if (xAggregate !== yAggregate) {
                return xAggregate ? x : y;
            }
            else {
                const xScale = (_a = xDef.scale) === null || _a === void 0 ? void 0 : _a.type;
                const yScale = (_b = yDef.scale) === null || _b === void 0 ? void 0 : _b.type;
                if (xScale && xScale !== 'linear') {
                    return y;
                }
                else if (yScale && yScale !== 'linear') {
                    return x;
                }
            }
        }
        else if (channelDefType(xDef) === 'quantitative') {
            return x;
        }
        else if (channelDefType(yDef) === 'quantitative') {
            return y;
        }
    }
    else if (channelDefType(xDef) === 'quantitative') {
        return x;
    }
    else if (channelDefType(yDef) === 'quantitative') {
        return y;
    }
    return undefined;
}
function getDimensionChannel(channel) {
    switch (channel) {
        case 'x':
            return 'y';
        case 'y':
            return 'x';
        case 'theta':
            return 'radius';
        case 'radius':
            return 'theta';
    }
}
// Note: CompassQL uses this method and only pass in required properties of each argument object.
// If required properties change, make sure to update CompassQL.
export function stack(m, encoding, opt = {}) {
    const mark = isMarkDef(m) ? m.type : m;
    // Should have stackable mark
    if (!STACKABLE_MARKS.has(mark)) {
        return null;
    }
    // Run potential stacked twice, one for Cartesian and another for Polar,
    // so text marks can be stacked in any of the coordinates.
    // Note: The logic here is not perfectly correct.  If we want to support stacked dot plots where each dot is a pie chart with label, we have to change the stack logic here to separate Cartesian stacking for polar stacking.
    // However, since we probably never want to do that, let's just note the limitation here.
    const fieldChannel = potentialStackedChannel(encoding, 'x') || potentialStackedChannel(encoding, 'theta');
    if (!fieldChannel) {
        return null;
    }
    const stackedFieldDef = encoding[fieldChannel];
    const stackedField = isFieldDef(stackedFieldDef) ? vgField(stackedFieldDef, {}) : undefined;
    let dimensionChannel = getDimensionChannel(fieldChannel);
    let dimensionDef = encoding[dimensionChannel];
    let dimensionField = isFieldDef(dimensionDef) ? vgField(dimensionDef, {}) : undefined;
    // avoid grouping by the stacked field
    if (dimensionField === stackedField) {
        dimensionField = undefined;
        dimensionDef = undefined;
        dimensionChannel = undefined;
    }
    // Should have grouping level of detail that is different from the dimension field
    const stackBy = NONPOSITION_CHANNELS.reduce((sc, channel) => {
        // Ignore tooltip in stackBy (https://github.com/vega/vega-lite/issues/4001)
        if (channel !== 'tooltip' && channelHasField(encoding, channel)) {
            const channelDef = encoding[channel];
            for (const cDef of array(channelDef)) {
                const fieldDef = getFieldDef(cDef);
                if (fieldDef.aggregate) {
                    continue;
                }
                // Check whether the channel's field is identical to x/y's field or if the channel is a repeat
                const f = vgField(fieldDef, {});
                if (
                // if fielddef is a repeat, just include it in the stack by
                !f ||
                    // otherwise, the field must be different from x and y fields.
                    f !== dimensionField) {
                    sc.push({ channel, fieldDef });
                }
            }
        }
        return sc;
    }, []);
    // Automatically determine offset
    let offset;
    if (stackedFieldDef.stack !== undefined) {
        if (isBoolean(stackedFieldDef.stack)) {
            offset = stackedFieldDef.stack ? 'zero' : null;
        }
        else {
            offset = stackedFieldDef.stack;
        }
    }
    else if (stackBy.length > 0 && STACK_BY_DEFAULT_MARKS.has(mark)) {
        // Bar and Area with sum ops are automatically stacked by default
        offset = 'zero';
    }
    if (!offset || !isStackOffset(offset)) {
        return null;
    }
    if (isAggregate(encoding) && stackBy.length === 0) {
        return null;
    }
    // warn when stacking non-linear
    if (stackedFieldDef.scale && stackedFieldDef.scale.type && stackedFieldDef.scale.type !== ScaleType.LINEAR) {
        if (opt.disallowNonLinearStack) {
            return null;
        }
        else {
            log.warn(log.message.cannotStackNonLinearScale(stackedFieldDef.scale.type));
        }
    }
    // Check if it is a ranged mark
    if (isFieldOrDatumDef(encoding[getSecondaryRangeChannel(fieldChannel)])) {
        if (stackedFieldDef.stack !== undefined) {
            log.warn(log.message.cannotStackRangedMark(fieldChannel));
        }
        return null;
    }
    // Warn if stacking non-summative aggregate
    if (isFieldDef(stackedFieldDef) && stackedFieldDef.aggregate && !contains(SUM_OPS, stackedFieldDef.aggregate)) {
        log.warn(log.message.stackNonSummativeAggregate(stackedFieldDef.aggregate));
    }
    return {
        groupbyChannel: dimensionDef ? dimensionChannel : undefined,
        groupbyField: dimensionField,
        fieldChannel,
        impute: stackedFieldDef.impute === null ? false : isPathMark(mark),
        stackBy,
        offset
    };
}
//# sourceMappingURL=stack.js.map