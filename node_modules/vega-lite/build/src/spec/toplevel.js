import { getPositionScaleChannel } from '../channel';
export function isFitType(autoSizeType) {
    return autoSizeType === 'fit' || autoSizeType === 'fit-x' || autoSizeType === 'fit-y';
}
export function getFitType(sizeType) {
    return sizeType ? `fit-${getPositionScaleChannel(sizeType)}` : 'fit';
}
const TOP_LEVEL_PROPERTIES = [
    'background',
    'padding'
    // We do not include "autosize" here as it is supported by only unit and layer specs and thus need to be normalized
];
export function extractTopLevelProperties(t) {
    return TOP_LEVEL_PROPERTIES.reduce((o, p) => {
        if (t && t[p] !== undefined) {
            o[p] = t[p];
        }
        return o;
    }, {});
}
//# sourceMappingURL=toplevel.js.map