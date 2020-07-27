import { array } from 'vega-util';
import { isConditionalDef, isConditionalSelection } from '../../../channeldef';
import { expression } from '../../predicate';
import { parseSelectionPredicate } from '../../selection/parse';
/**
 * Return a mixin that includes a Vega production rule for a Vega-Lite conditional channel definition
 * or a simple mixin if channel def has no condition.
 */
export function wrapCondition(model, channelDef, vgChannel, refFn) {
    const condition = isConditionalDef(channelDef) && channelDef.condition;
    const valueRef = refFn(channelDef);
    if (condition) {
        const conditions = array(condition);
        const vgConditions = conditions.map(c => {
            const conditionValueRef = refFn(c);
            const test = isConditionalSelection(c)
                ? parseSelectionPredicate(model, c.selection) // FIXME: remove casting once TS is no longer dumb about it
                : expression(model, c.test); // FIXME: remove casting once TS is no longer dumb about it
            return Object.assign({ test }, conditionValueRef);
        });
        return {
            [vgChannel]: [...vgConditions, ...(valueRef !== undefined ? [valueRef] : [])]
        };
    }
    else {
        return valueRef !== undefined ? { [vgChannel]: valueRef } : {};
    }
}
//# sourceMappingURL=conditional.js.map