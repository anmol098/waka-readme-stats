import { isValueDef } from '../../../channeldef';
import { isPathMark } from '../../../mark';
import { wrapCondition } from './conditional';
export function zindex(model) {
    const { encoding, mark } = model;
    const order = encoding.order;
    if (!isPathMark(mark) && isValueDef(order)) {
        return wrapCondition(model, order, 'zindex', cd => cd);
    }
    return {};
}
//# sourceMappingURL=zindex.js.map