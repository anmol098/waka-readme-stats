import * as encode from './encode';
export const arc = {
    vgMark: 'arc',
    encodeEntry: (model) => {
        return Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, encode.baseEncodeEntry(model, {
            align: 'ignore',
            baseline: 'ignore',
            color: 'include',
            size: 'ignore',
            orient: 'ignore',
            theta: 'ignore'
        })), encode.pointPosition('x', model, { defaultPos: 'mid' })), encode.pointPosition('y', model, { defaultPos: 'mid' })), encode.rectPosition(model, 'radius', 'arc')), encode.rectPosition(model, 'theta', 'arc'));
    }
};
//# sourceMappingURL=arc.js.map