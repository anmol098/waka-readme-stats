import * as encode from './encode';
export const image = {
    vgMark: 'image',
    encodeEntry: (model) => {
        return Object.assign(Object.assign(Object.assign(Object.assign({}, encode.baseEncodeEntry(model, {
            align: 'ignore',
            baseline: 'ignore',
            color: 'ignore',
            orient: 'ignore',
            size: 'ignore',
            theta: 'ignore'
        })), encode.rectPosition(model, 'x', 'image')), encode.rectPosition(model, 'y', 'image')), encode.text(model, 'url'));
    }
};
//# sourceMappingURL=image.js.map