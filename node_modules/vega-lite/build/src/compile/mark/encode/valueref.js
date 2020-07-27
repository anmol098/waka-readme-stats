import { isFunction, isString } from 'vega-util';
import { isCountingAggregateOp } from '../../../aggregate';
import { isBinned, isBinning } from '../../../bin';
import { getMainRangeChannel, X, X2, Y2 } from '../../../channel';
import { binRequiresRange, getBand, isDatumDef, isFieldDef, isFieldOrDatumDef, isTypedFieldDef, isValueDef, vgField } from '../../../channeldef';
import { dateTimeToExpr, isDateTime } from '../../../datetime';
import * as log from '../../../log';
import { isPathMark } from '../../../mark';
import { fieldValidPredicate } from '../../../predicate';
import { hasDiscreteDomain, isContinuousToContinuous } from '../../../scale';
import { TEMPORAL } from '../../../type';
import { contains } from '../../../util';
import { isSignalRef } from '../../../vega.schema';
import { getMarkPropOrConfig, signalOrValueRef } from '../../common';
export function midPointRefWithPositionInvalidTest(params) {
    const { channel, channelDef, markDef, scale, config } = params;
    const ref = midPoint(params);
    // Wrap to check if the positional value is invalid, if so, plot the point on the min value
    if (
    // Only this for field def without counting aggregate (as count wouldn't be null)
    isFieldDef(channelDef) &&
        !isCountingAggregateOp(channelDef.aggregate) &&
        // and only for continuous scale without zero (otherwise, null / invalid will be interpreted as zero, which doesn't cause layout problem)
        scale &&
        isContinuousToContinuous(scale.get('type')) &&
        scale.get('zero') === false) {
        return wrapPositionInvalidTest({
            fieldDef: channelDef,
            channel,
            markDef,
            ref,
            config
        });
    }
    return ref;
}
export function wrapPositionInvalidTest({ fieldDef, channel, markDef, ref, config }) {
    if (isPathMark(markDef.type)) {
        // path mark already use defined to skip points, no need to do it here.
        return ref;
    }
    const invalid = getMarkPropOrConfig('invalid', markDef, config);
    if (invalid === null) {
        // if there is no invalid filter, don't do the invalid test
        return ref;
    }
    return [fieldInvalidTestValueRef(fieldDef, channel), ref];
}
export function fieldInvalidTestValueRef(fieldDef, channel) {
    const test = fieldInvalidPredicate(fieldDef, true);
    const mainChannel = getMainRangeChannel(channel); // we can cast here as the output can't be other things.
    const zeroValueRef = mainChannel === 'y'
        ? { field: { group: 'height' } }
        : // x / angle / radius can all use 0
            { value: 0 };
    return Object.assign({ test }, zeroValueRef);
}
export function fieldInvalidPredicate(field, invalid = true) {
    return fieldValidPredicate(isString(field) ? field : vgField(field, { expr: 'datum' }), !invalid);
}
export function datumDefToExpr(datumDef) {
    const { datum } = datumDef;
    if (isDateTime(datum)) {
        return dateTimeToExpr(datum);
    }
    return `${JSON.stringify(datum)}`;
}
export function valueRefForFieldOrDatumDef(fieldDef, scaleName, opt, encode) {
    const ref = {};
    if (scaleName) {
        ref.scale = scaleName;
    }
    if (isDatumDef(fieldDef)) {
        const { datum } = fieldDef;
        if (isDateTime(datum)) {
            ref.signal = dateTimeToExpr(datum);
        }
        else if (isSignalRef(datum)) {
            ref.signal = datum.signal;
        }
        else {
            ref.value = datum;
        }
    }
    else {
        ref.field = vgField(fieldDef, opt);
    }
    if (encode) {
        const { offset, band } = encode;
        if (offset) {
            ref.offset = offset;
        }
        if (band) {
            ref.band = band;
        }
    }
    return ref;
}
/**
 * Signal that returns the middle of a bin from start and end field. Should only be used with x and y.
 */
export function interpolatedSignalRef({ scaleName, fieldOrDatumDef, fieldOrDatumDef2, offset, startSuffix, band = 0.5 }) {
    const expr = 0 < band && band < 1 ? 'datum' : undefined;
    const start = vgField(fieldOrDatumDef, { expr, suffix: startSuffix });
    const end = fieldOrDatumDef2 !== undefined
        ? vgField(fieldOrDatumDef2, { expr })
        : vgField(fieldOrDatumDef, { suffix: 'end', expr });
    const ref = {};
    if (band === 0 || band === 1) {
        ref.scale = scaleName;
        const val = band === 0 ? start : end;
        ref.field = val;
    }
    else {
        const datum = `${band} * ${start} + ${1 - band} * ${end}`;
        ref.signal = `scale("${scaleName}", ${datum})`;
    }
    if (offset) {
        ref.offset = offset;
    }
    return ref;
}
/**
 * @returns {VgValueRef} Value Ref for xc / yc or mid point for other channels.
 */
export function midPoint({ channel, channelDef, channel2Def, markDef, config, scaleName, scale, stack, offset, defaultRef, band }) {
    var _a;
    // TODO: datum support
    if (channelDef) {
        /* istanbul ignore else */
        if (isFieldOrDatumDef(channelDef)) {
            if (isTypedFieldDef(channelDef)) {
                band = band !== null && band !== void 0 ? band : getBand({
                    channel,
                    fieldDef: channelDef,
                    fieldDef2: channel2Def,
                    markDef,
                    stack,
                    config,
                    isMidPoint: true
                });
                const { bin, timeUnit, type } = channelDef;
                if (isBinning(bin) || (band && timeUnit && type === TEMPORAL)) {
                    // Use middle only for x an y to place marks in the center between start and end of the bin range.
                    // We do not use the mid point for other channels (e.g. size) so that properties of legends and marks match.
                    if (stack && stack.impute) {
                        // For stack, we computed bin_mid so we can impute.
                        return valueRefForFieldOrDatumDef(channelDef, scaleName, { binSuffix: 'mid' }, { offset });
                    }
                    if (band) {
                        // if band = 0, no need to call interpolation
                        // For non-stack, we can just calculate bin mid on the fly using signal.
                        return interpolatedSignalRef({ scaleName, fieldOrDatumDef: channelDef, band, offset });
                    }
                    return valueRefForFieldOrDatumDef(channelDef, scaleName, binRequiresRange(channelDef, channel) ? { binSuffix: 'range' } : {}, {
                        offset
                    });
                }
                else if (isBinned(bin)) {
                    if (isFieldDef(channel2Def)) {
                        return interpolatedSignalRef({
                            scaleName,
                            fieldOrDatumDef: channelDef,
                            fieldOrDatumDef2: channel2Def,
                            band,
                            offset
                        });
                    }
                    else {
                        const channel2 = channel === X ? X2 : Y2;
                        log.warn(log.message.channelRequiredForBinned(channel2));
                    }
                }
            }
            const scaleType = scale === null || scale === void 0 ? void 0 : scale.get('type');
            return valueRefForFieldOrDatumDef(channelDef, scaleName, hasDiscreteDomain(scaleType) ? { binSuffix: 'range' } : {}, // no need for bin suffix if there is no scale
            {
                offset,
                // For band, to get mid point, need to offset by half of the band
                band: scaleType === 'band' ? (_a = band !== null && band !== void 0 ? band : channelDef.band) !== null && _a !== void 0 ? _a : 0.5 : undefined
            });
        }
        else if (isValueDef(channelDef)) {
            const value = channelDef.value;
            const offsetMixins = offset ? { offset } : {};
            return Object.assign(Object.assign({}, widthHeightValueOrSignalRef(channel, value)), offsetMixins);
        }
        // If channelDef is neither field def or value def, it's a condition-only def.
        // In such case, we will use default ref.
    }
    if (isFunction(defaultRef)) {
        defaultRef = defaultRef();
    }
    if (defaultRef) {
        // for non-position, ref could be undefined.
        return Object.assign(Object.assign({}, defaultRef), (offset ? { offset } : {}));
    }
    return defaultRef;
}
/**
 * Convert special "width" and "height" values in Vega-Lite into Vega value ref.
 */
export function widthHeightValueOrSignalRef(channel, value) {
    if (contains(['x', 'x2'], channel) && value === 'width') {
        return { field: { group: 'width' } };
    }
    else if (contains(['y', 'y2'], channel) && value === 'height') {
        return { field: { group: 'height' } };
    }
    return signalOrValueRef(value);
}
//# sourceMappingURL=valueref.js.map