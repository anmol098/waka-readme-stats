import * as encode from './encode';
export const bar = {
    vgMark: 'rect',
    encodeEntry: (model) => {
        return Object.assign(Object.assign(Object.assign({}, encode.baseEncodeEntry(model, {
            align: 'ignore',
            baseline: 'ignore',
            color: 'include',
            orient: 'ignore',
            size: 'ignore',
            theta: 'ignore'
        })), encode.rectPosition(model, 'x', 'bar')), encode.rectPosition(model, 'y', 'bar'));
    }
};
//# sourceMappingURL=bar.js.map