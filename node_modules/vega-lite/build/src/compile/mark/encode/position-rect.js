import { isArray, isNumber } from 'vega-util';
import { isBinned, isBinning, isBinParams } from '../../../bin';
import { getSecondaryRangeChannel, getSizeChannel, getVgPositionChannel, isPolarPositionChannel, isXorY } from '../../../channel';
import { getBand, isFieldDef, isFieldOrDatumDef, vgField } from '../../../channeldef';
import { DEFAULT_STEP, getViewConfigDiscreteStep } from '../../../config';
import * as log from '../../../log';
import { hasDiscreteDomain, ScaleType } from '../../../scale';
import { getFirstDefined } from '../../../util';
import { isSignalRef, isVgRangeStep } from '../../../vega.schema';
import { getMarkPropOrConfig, signalOrStringValue } from '../../common';
import { nonPosition } from './nonposition';
import { getOffset } from './offset';
import { vgAlignedPositionChannel } from './position-align';
import { pointPositionDefaultRef } from './position-point';
import { rangePosition } from './position-range';
import * as ref from './valueref';
export function rectPosition(model, channel, mark) {
    var _a, _b, _c, _d;
    const { config, encoding, markDef, stack } = model;
    const channel2 = getSecondaryRangeChannel(channel);
    const sizeChannel = getSizeChannel(channel);
    const channelDef = encoding[channel];
    const channelDef2 = encoding[channel2];
    const scale = model.getScaleComponent(channel);
    const scaleType = scale ? scale.get('type') : undefined;
    const scaleName = model.scaleName(channel);
    const orient = markDef.orient;
    const hasSizeDef = (_b = (_a = encoding[sizeChannel]) !== null && _a !== void 0 ? _a : encoding.size) !== null && _b !== void 0 ? _b : getMarkPropOrConfig('size', markDef, config, { vgChannel: sizeChannel });
    const isBarBand = mark === 'bar' && (channel === 'x' ? orient === 'vertical' : orient === 'horizontal');
    // x, x2, and width -- we must specify two of these in all conditions
    if (isFieldDef(channelDef) &&
        (isBinning(channelDef.bin) || isBinned(channelDef.bin) || (channelDef.timeUnit && !channelDef2)) &&
        !hasSizeDef &&
        !hasDiscreteDomain(scaleType)) {
        const band = getBand({ channel, fieldDef: channelDef, stack, markDef, config });
        const axis = (_c = model.component.axes[channel]) === null || _c === void 0 ? void 0 : _c[0];
        const axisTranslate = (_d = axis === null || axis === void 0 ? void 0 : axis.get('translate')) !== null && _d !== void 0 ? _d : 0.5; // vega default is 0.5
        return rectBinPosition({
            fieldDef: channelDef,
            fieldDef2: channelDef2,
            channel,
            markDef,
            scaleName,
            band,
            axisTranslate,
            spacing: isXorY(channel) ? getMarkPropOrConfig('binSpacing', markDef, config) : undefined,
            reverse: scale.get('reverse'),
            config
        });
    }
    else if (((isFieldOrDatumDef(channelDef) && hasDiscreteDomain(scaleType)) || isBarBand) && !channelDef2) {
        return positionAndSize(mark, channelDef, channel, model);
    }
    else {
        return rangePosition(channel, model, { defaultPos: 'zeroOrMax', defaultPos2: 'zeroOrMin' });
    }
}
function defaultSizeRef(mark, sizeChannel, scaleName, scale, config, band) {
    if (scale) {
        const scaleType = scale.get('type');
        if (scaleType === 'point' || scaleType === 'band') {
            if (config[mark].discreteBandSize !== undefined) {
                return { value: config[mark].discreteBandSize };
            }
            if (scaleType === ScaleType.POINT) {
                const scaleRange = scale.get('range');
                if (isVgRangeStep(scaleRange) && isNumber(scaleRange.step)) {
                    return { value: scaleRange.step - 2 };
                }
                return { value: DEFAULT_STEP - 2 };
            }
            else {
                // BAND
                return { scale: scaleName, band };
            }
        }
        else {
            // continuous scale
            return { value: config[mark].continuousBandSize };
        }
    }
    // No Scale
    const step = getViewConfigDiscreteStep(config.view, sizeChannel);
    const value = getFirstDefined(
    // No scale is like discrete bar (with one item)
    config[mark].discreteBandSize, step - 2);
    return value !== undefined ? { value } : undefined;
}
/**
 * Output position encoding and its size encoding for continuous, point, and band scales.
 */
function positionAndSize(mark, fieldDef, channel, model) {
    var _a;
    const { markDef, encoding, config, stack } = model;
    const orient = markDef.orient;
    const scaleName = model.scaleName(channel);
    const scale = model.getScaleComponent(channel);
    const vgSizeChannel = getSizeChannel(channel);
    const channel2 = getSecondaryRangeChannel(channel);
    // use "size" channel for bars, if there is orient and the channel matches the right orientation
    const useVlSizeChannel = (orient === 'horizontal' && channel === 'y') || (orient === 'vertical' && channel === 'x');
    const sizeFromMarkOrConfig = getMarkPropOrConfig(useVlSizeChannel ? 'size' : vgSizeChannel, markDef, config, {
        vgChannel: vgSizeChannel
    });
    // Use size encoding / mark property / config if it exists
    let sizeMixins;
    if (encoding.size || sizeFromMarkOrConfig !== undefined) {
        if (useVlSizeChannel) {
            sizeMixins = nonPosition('size', model, { vgChannel: vgSizeChannel, defaultValue: sizeFromMarkOrConfig });
        }
        else {
            log.warn(log.message.cannotApplySizeToNonOrientedMark(markDef.type));
        }
    }
    // Otherwise, apply default value
    const band = (_a = (isFieldOrDatumDef(fieldDef) ? getBand({ channel, fieldDef, markDef, stack, config }) : undefined)) !== null && _a !== void 0 ? _a : 1;
    sizeMixins = sizeMixins || { [vgSizeChannel]: defaultSizeRef(mark, vgSizeChannel, scaleName, scale, config, band) };
    /*
      Band scales with size value and all point scales, use xc/yc + band=0.5
  
      Otherwise (band scales that has size based on a band ref), use x/y with position band = (1 - size_band) / 2.
      In this case, size_band is the band specified in the x/y-encoding.
      By default band is 1, so `(1 - band) / 2` = 0.
      If band is 0.6, the the x/y position in such case should be `(1 - band) / 2` = 0.2
     */
    const center = (scale === null || scale === void 0 ? void 0 : scale.get('type')) !== 'band' || !('band' in sizeMixins[vgSizeChannel]);
    const vgChannel = vgAlignedPositionChannel(channel, markDef, config, center ? 'middle' : 'top');
    const offset = getOffset(channel, markDef);
    const posRef = ref.midPointRefWithPositionInvalidTest({
        channel,
        channelDef: fieldDef,
        markDef,
        config,
        scaleName,
        scale,
        stack,
        offset,
        defaultRef: pointPositionDefaultRef({ model, defaultPos: 'mid', channel, scaleName, scale }),
        band: center ? 0.5 : (1 - band) / 2
    });
    if (vgSizeChannel) {
        return Object.assign({ [vgChannel]: posRef }, sizeMixins);
    }
    else {
        // otherwise, we must simulate size by setting position2 = position + size
        // (for theta/radius since Vega doesn't have thetaWidth/radiusWidth)
        const vgChannel2 = getVgPositionChannel(channel2);
        const sizeRef = sizeMixins[vgSizeChannel];
        const sizeOffset = offset ? Object.assign(Object.assign({}, sizeRef), { offset }) : sizeRef;
        return {
            [vgChannel]: posRef,
            // posRef might be an array that wraps position invalid test
            [vgChannel2]: isArray(posRef)
                ? [posRef[0], Object.assign(Object.assign({}, posRef[1]), { offset: sizeOffset })]
                : Object.assign(Object.assign({}, posRef), { offset: sizeOffset })
        };
    }
}
function getBinSpacing(channel, spacing, reverse, translate, offset) {
    if (isPolarPositionChannel(channel)) {
        return 0;
    }
    const spacingOffset = channel === 'x' || channel === 'y2' ? -spacing / 2 : spacing / 2;
    if (isSignalRef(reverse) || isSignalRef(offset) || isSignalRef(translate)) {
        const reverseExpr = signalOrStringValue(reverse);
        const offsetExpr = signalOrStringValue(offset);
        const translateExpr = signalOrStringValue(translate);
        const t = translateExpr ? `${translateExpr} + ` : '';
        const r = reverseExpr ? `(${reverseExpr} ? -1 : 1) * ` : '';
        const o = offsetExpr ? `(${offsetExpr} + ${spacingOffset})` : spacingOffset;
        return {
            signal: t + r + o
        };
    }
    else {
        offset = offset || 0;
        return translate + (reverse ? -offset - spacingOffset : +offset + spacingOffset);
    }
}
export function rectBinPosition({ fieldDef, fieldDef2, channel, band, scaleName, markDef, spacing = 0, axisTranslate, reverse, config }) {
    const channel2 = getSecondaryRangeChannel(channel);
    const vgChannel = getVgPositionChannel(channel);
    const vgChannel2 = getVgPositionChannel(channel2);
    const offset = getOffset(channel, markDef);
    if (isBinning(fieldDef.bin) || fieldDef.timeUnit) {
        return {
            [vgChannel2]: rectBinRef({
                channel,
                fieldDef,
                scaleName,
                markDef,
                band: (1 - band) / 2,
                offset: getBinSpacing(channel2, spacing, reverse, axisTranslate, offset),
                config
            }),
            [vgChannel]: rectBinRef({
                channel,
                fieldDef,
                scaleName,
                markDef,
                band: 1 - (1 - band) / 2,
                offset: getBinSpacing(channel, spacing, reverse, axisTranslate, offset),
                config
            })
        };
    }
    else if (isBinned(fieldDef.bin)) {
        const startRef = ref.valueRefForFieldOrDatumDef(fieldDef, scaleName, {}, { offset: getBinSpacing(channel2, spacing, reverse, axisTranslate, offset) });
        if (isFieldDef(fieldDef2)) {
            return {
                [vgChannel2]: startRef,
                [vgChannel]: ref.valueRefForFieldOrDatumDef(fieldDef2, scaleName, {}, { offset: getBinSpacing(channel, spacing, reverse, axisTranslate, offset) })
            };
        }
        else if (isBinParams(fieldDef.bin) && fieldDef.bin.step) {
            return {
                [vgChannel2]: startRef,
                [vgChannel]: {
                    signal: `scale("${scaleName}", ${vgField(fieldDef, { expr: 'datum' })} + ${fieldDef.bin.step})`,
                    offset: getBinSpacing(channel, spacing, reverse, axisTranslate, offset)
                }
            };
        }
    }
    log.warn(log.message.channelRequiredForBinned(channel2));
    return undefined;
}
/**
 * Value Ref for binned fields
 */
export function rectBinRef({ channel, fieldDef, scaleName, markDef, band, offset, config }) {
    const r = ref.interpolatedSignalRef({
        scaleName,
        fieldOrDatumDef: fieldDef,
        band,
        offset
    });
    return ref.wrapPositionInvalidTest({
        fieldDef,
        channel,
        markDef,
        ref: r,
        config
    });
}
//# sourceMappingURL=position-rect.js.map