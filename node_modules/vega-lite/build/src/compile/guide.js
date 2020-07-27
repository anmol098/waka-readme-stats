import { keys } from '../util';
import { isSignalRef } from '../vega.schema';
import { wrapCondition } from './mark/encode';
export function guideEncodeEntry(encoding, model) {
    return keys(encoding).reduce((encode, channel) => {
        const valueDef = encoding[channel];
        return Object.assign(Object.assign({}, encode), wrapCondition(model, valueDef, channel, (x) => (isSignalRef(x) ? x : { value: x.value })));
    }, {});
}
//# sourceMappingURL=guide.js.map