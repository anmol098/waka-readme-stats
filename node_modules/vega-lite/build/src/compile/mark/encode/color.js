import * as log from '../../../log';
import { contains } from '../../../util';
import { getMarkPropOrConfig, signalOrValueRef } from '../../common';
import { nonPosition } from './nonposition';
export function color(model, opt = { filled: undefined }) {
    var _a, _b, _c, _d;
    const { markDef, encoding, config } = model;
    const { type: markType } = markDef;
    // Allow filled to be overridden (for trail's "filled")
    const filled = (_a = opt.filled) !== null && _a !== void 0 ? _a : getMarkPropOrConfig('filled', markDef, config);
    const transparentIfNeeded = contains(['bar', 'point', 'circle', 'square', 'geoshape'], markType)
        ? 'transparent'
        : undefined;
    const defaultFill = (_c = (_b = getMarkPropOrConfig(filled === true ? 'color' : undefined, markDef, config, { vgChannel: 'fill' })) !== null && _b !== void 0 ? _b : 
    // need to add this manually as getMarkConfig normally drops config.mark[channel] if vgChannel is specified
    config.mark[filled === true && 'color']) !== null && _c !== void 0 ? _c : 
    // If there is no fill, always fill symbols, bar, geoshape
    // with transparent fills https://github.com/vega/vega-lite/issues/1316
    transparentIfNeeded;
    const defaultStroke = (_d = getMarkPropOrConfig(filled === false ? 'color' : undefined, markDef, config, { vgChannel: 'stroke' })) !== null && _d !== void 0 ? _d : 
    // need to add this manually as getMarkConfig normally drops config.mark[channel] if vgChannel is specified
    config.mark[filled === false && 'color'];
    const colorVgChannel = filled ? 'fill' : 'stroke';
    const fillStrokeMarkDefAndConfig = Object.assign(Object.assign({}, (defaultFill ? { fill: signalOrValueRef(defaultFill) } : {})), (defaultStroke ? { stroke: signalOrValueRef(defaultStroke) } : {}));
    if (markDef.color && (filled ? markDef.fill : markDef.stroke)) {
        log.warn(log.message.droppingColor('property', { fill: 'fill' in markDef, stroke: 'stroke' in markDef }));
    }
    return Object.assign(Object.assign(Object.assign(Object.assign({}, fillStrokeMarkDefAndConfig), nonPosition('color', model, {
        vgChannel: colorVgChannel,
        defaultValue: filled ? defaultFill : defaultStroke
    })), nonPosition('fill', model, {
        // if there is encoding.fill, include default fill just in case we have conditional-only fill encoding
        defaultValue: encoding.fill ? defaultFill : undefined
    })), nonPosition('stroke', model, {
        // if there is encoding.stroke, include default fill just in case we have conditional-only stroke encoding
        defaultValue: encoding.stroke ? defaultStroke : undefined
    }));
}
//# sourceMappingURL=color.js.map