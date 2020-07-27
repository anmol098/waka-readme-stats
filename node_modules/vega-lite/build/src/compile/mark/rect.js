import * as encode from './encode';
export const rect = {
    vgMark: 'rect',
    encodeEntry: (model) => {
        return Object.assign(Object.assign(Object.assign({}, encode.baseEncodeEntry(model, {
            align: 'ignore',
            baseline: 'ignore',
            color: 'include',
            orient: 'ignore',
            size: 'ignore',
            theta: 'ignore'
        })), encode.rectPosition(model, 'x', 'rect')), encode.rectPosition(model, 'y', 'rect'));
    }
};
//# sourceMappingURL=rect.js.map