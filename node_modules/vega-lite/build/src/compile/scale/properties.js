import { isArray } from 'vega-util';
import { isBinned, isBinning, isBinParams } from '../../bin';
import { COLOR, FILL, POLAR_POSITION_SCALE_CHANNELS, POSITION_SCALE_CHANNELS, POSITION_SCALE_CHANNEL_INDEX, STROKE } from '../../channel';
import { getFieldDef, getFieldOrDatumDef, isFieldDef, valueExpr } from '../../channeldef';
import { isDateTime } from '../../datetime';
import * as log from '../../log';
import { channelScalePropertyIncompatability, hasContinuousDomain, isContinuousToContinuous, isContinuousToDiscrete, ScaleType, scaleTypeSupportProperty } from '../../scale';
import * as util from '../../util';
import { contains, getFirstDefined, keys } from '../../util';
import { isSignalRef } from '../../vega.schema';
import { getBinSignalName } from '../data/bin';
import { isUnitModel } from '../model';
import { SignalRefWrapper } from '../signal';
import { mergeValuesWithExplicit, tieBreakByComparing } from '../split';
import { parseUnitScaleRange } from './range';
export function parseScaleProperty(model, property) {
    if (isUnitModel(model)) {
        parseUnitScaleProperty(model, property);
    }
    else {
        parseNonUnitScaleProperty(model, property);
    }
}
function parseUnitScaleProperty(model, property) {
    const localScaleComponents = model.component.scales;
    const { config, encoding, markDef, specifiedScales } = model;
    for (const channel of keys(localScaleComponents)) {
        const specifiedScale = specifiedScales[channel];
        const localScaleCmpt = localScaleComponents[channel];
        const mergedScaleCmpt = model.getScaleComponent(channel);
        const fieldOrDatumDef = getFieldOrDatumDef(encoding[channel]);
        const specifiedValue = specifiedScale[property];
        const scaleType = mergedScaleCmpt.get('type');
        const scalePadding = mergedScaleCmpt.get('padding');
        const scalePaddingInner = mergedScaleCmpt.get('paddingInner');
        const supportedByScaleType = scaleTypeSupportProperty(scaleType, property);
        const channelIncompatability = channelScalePropertyIncompatability(channel, property);
        if (specifiedValue !== undefined) {
            // If there is a specified value, check if it is compatible with scale type and channel
            if (!supportedByScaleType) {
                log.warn(log.message.scalePropertyNotWorkWithScaleType(scaleType, property, channel));
            }
            else if (channelIncompatability) {
                // channel
                log.warn(channelIncompatability);
            }
        }
        if (supportedByScaleType && channelIncompatability === undefined) {
            if (specifiedValue !== undefined) {
                const timeUnit = fieldOrDatumDef['timeUnit'];
                const type = fieldOrDatumDef.type;
                switch (property) {
                    // domainMax/Min to signal if the value is a datetime object
                    case 'domainMax':
                    case 'domainMin':
                        if (isDateTime(specifiedScale[property]) || type === 'temporal' || timeUnit) {
                            localScaleCmpt.set(property, { signal: valueExpr(specifiedScale[property], { type, timeUnit }) }, true);
                        }
                        else {
                            localScaleCmpt.set(property, specifiedScale[property], true);
                        }
                        break;
                    default:
                        localScaleCmpt.copyKeyFromObject(property, specifiedScale);
                }
            }
            else {
                const value = property in scaleRules
                    ? scaleRules[property]({
                        model,
                        channel,
                        fieldOrDatumDef,
                        scaleType,
                        scalePadding,
                        scalePaddingInner,
                        domain: specifiedScale.domain,
                        markDef,
                        config
                    })
                    : config.scale[property];
                if (value !== undefined) {
                    localScaleCmpt.set(property, value, false);
                }
            }
        }
    }
}
export const scaleRules = {
    bins: ({ model, fieldOrDatumDef }) => (isFieldDef(fieldOrDatumDef) ? bins(model, fieldOrDatumDef) : undefined),
    interpolate: ({ channel, fieldOrDatumDef }) => interpolate(channel, fieldOrDatumDef.type),
    nice: ({ scaleType, channel, fieldOrDatumDef }) => nice(scaleType, channel, fieldOrDatumDef),
    padding: ({ channel, scaleType, fieldOrDatumDef, markDef, config }) => padding(channel, scaleType, config.scale, fieldOrDatumDef, markDef, config.bar),
    paddingInner: ({ scalePadding, channel, markDef, config }) => paddingInner(scalePadding, channel, markDef.type, config.scale),
    paddingOuter: ({ scalePadding, channel, scaleType, markDef, scalePaddingInner, config }) => paddingOuter(scalePadding, channel, scaleType, markDef.type, scalePaddingInner, config.scale),
    reverse: ({ fieldOrDatumDef, scaleType, channel, config }) => {
        const sort = isFieldDef(fieldOrDatumDef) ? fieldOrDatumDef.sort : undefined;
        return reverse(scaleType, sort, channel, config.scale);
    },
    zero: ({ channel, fieldOrDatumDef, domain, markDef, scaleType }) => zero(channel, fieldOrDatumDef, domain, markDef, scaleType)
};
// This method is here rather than in range.ts to avoid circular dependency.
export function parseScaleRange(model) {
    if (isUnitModel(model)) {
        parseUnitScaleRange(model);
    }
    else {
        parseNonUnitScaleProperty(model, 'range');
    }
}
export function parseNonUnitScaleProperty(model, property) {
    const localScaleComponents = model.component.scales;
    for (const child of model.children) {
        if (property === 'range') {
            parseScaleRange(child);
        }
        else {
            parseScaleProperty(child, property);
        }
    }
    for (const channel of keys(localScaleComponents)) {
        let valueWithExplicit;
        for (const child of model.children) {
            const childComponent = child.component.scales[channel];
            if (childComponent) {
                const childValueWithExplicit = childComponent.getWithExplicit(property);
                valueWithExplicit = mergeValuesWithExplicit(valueWithExplicit, childValueWithExplicit, property, 'scale', tieBreakByComparing((v1, v2) => {
                    switch (property) {
                        case 'range':
                            // For step, prefer larger step
                            if (v1.step && v2.step) {
                                return v1.step - v2.step;
                            }
                            return 0;
                        // TODO: precedence rule for other properties
                    }
                    return 0;
                }));
            }
        }
        localScaleComponents[channel].setWithExplicit(property, valueWithExplicit);
    }
}
export function bins(model, fieldDef) {
    const bin = fieldDef.bin;
    if (isBinning(bin)) {
        const binSignal = getBinSignalName(model, fieldDef.field, bin);
        return new SignalRefWrapper(() => {
            return model.getSignalName(binSignal);
        });
    }
    else if (isBinned(bin) && isBinParams(bin) && bin.step !== undefined) {
        // start and stop will be determined from the scale domain
        return {
            step: bin.step
        };
    }
    return undefined;
}
export function interpolate(channel, type) {
    if (contains([COLOR, FILL, STROKE], channel) && type !== 'nominal') {
        return 'hcl';
    }
    return undefined;
}
export function nice(scaleType, channel, fieldOrDatumDef) {
    var _a;
    if (((_a = getFieldDef(fieldOrDatumDef)) === null || _a === void 0 ? void 0 : _a.bin) || util.contains([ScaleType.TIME, ScaleType.UTC], scaleType)) {
        return undefined;
    }
    return channel in POSITION_SCALE_CHANNEL_INDEX ? true : undefined;
}
export function padding(channel, scaleType, scaleConfig, fieldOrDatumDef, markDef, barConfig) {
    if (channel in POSITION_SCALE_CHANNEL_INDEX) {
        if (isContinuousToContinuous(scaleType)) {
            if (scaleConfig.continuousPadding !== undefined) {
                return scaleConfig.continuousPadding;
            }
            const { type, orient } = markDef;
            if (type === 'bar' && !(isFieldDef(fieldOrDatumDef) && (fieldOrDatumDef.bin || fieldOrDatumDef.timeUnit))) {
                if ((orient === 'vertical' && channel === 'x') || (orient === 'horizontal' && channel === 'y')) {
                    return barConfig.continuousBandSize;
                }
            }
        }
        if (scaleType === ScaleType.POINT) {
            return scaleConfig.pointPadding;
        }
    }
    return undefined;
}
export function paddingInner(paddingValue, channel, mark, scaleConfig) {
    if (paddingValue !== undefined) {
        // If user has already manually specified "padding", no need to add default paddingInner.
        return undefined;
    }
    if (channel in POSITION_SCALE_CHANNEL_INDEX) {
        // Padding is only set for X and Y by default.
        // Basically it doesn't make sense to add padding for color and size.
        // paddingOuter would only be called if it's a band scale, just return the default for bandScale.
        const { bandPaddingInner, barBandPaddingInner, rectBandPaddingInner } = scaleConfig;
        return getFirstDefined(bandPaddingInner, mark === 'bar' ? barBandPaddingInner : rectBandPaddingInner);
    }
    return undefined;
}
export function paddingOuter(paddingValue, channel, scaleType, mark, paddingInnerValue, scaleConfig) {
    if (paddingValue !== undefined) {
        // If user has already manually specified "padding", no need to add default paddingOuter.
        return undefined;
    }
    if (channel in POSITION_SCALE_CHANNEL_INDEX) {
        // Padding is only set for X and Y by default.
        // Basically it doesn't make sense to add padding for color and size.
        if (scaleType === ScaleType.BAND) {
            const { bandPaddingOuter } = scaleConfig;
            return getFirstDefined(bandPaddingOuter, 
            /* By default, paddingOuter is paddingInner / 2. The reason is that
              size (width/height) = step * (cardinality - paddingInner + 2 * paddingOuter).
              and we want the width/height to be integer by default.
              Note that step (by default) and cardinality are integers.) */
            isSignalRef(paddingInnerValue) ? { signal: `${paddingInnerValue.signal}/2` } : paddingInnerValue / 2);
        }
    }
    return undefined;
}
export function reverse(scaleType, sort, channel, scaleConfig) {
    if (channel === 'x' && scaleConfig.xReverse !== undefined) {
        if (hasContinuousDomain(scaleType) && sort === 'descending') {
            if (isSignalRef(scaleConfig.xReverse)) {
                return { signal: `!${scaleConfig.xReverse.signal}` };
            }
            else {
                return !scaleConfig.xReverse;
            }
        }
        return scaleConfig.xReverse;
    }
    if (hasContinuousDomain(scaleType) && sort === 'descending') {
        // For continuous domain scales, Vega does not support domain sort.
        // Thus, we reverse range instead if sort is descending
        return true;
    }
    return undefined;
}
export function zero(channel, fieldDef, specifiedDomain, markDef, scaleType) {
    // If users explicitly provide a domain range, we should not augment zero as that will be unexpected.
    const hasCustomDomain = !!specifiedDomain && specifiedDomain !== 'unaggregated';
    if (hasCustomDomain) {
        if (hasContinuousDomain(scaleType)) {
            if (isArray(specifiedDomain)) {
                const first = specifiedDomain[0];
                const last = specifiedDomain[specifiedDomain.length - 1];
                if (first <= 0 && last >= 0) {
                    // if the domain includes zero, make zero remains true
                    return true;
                }
            }
            return false;
        }
    }
    // If there is no custom domain, return true only for the following cases:
    // 1) using quantitative field with size
    // While this can be either ratio or interval fields, our assumption is that
    // ratio are more common. However, if the scaleType is discretizing scale, we want to return
    // false so that range doesn't start at zero
    if (channel === 'size' && fieldDef.type === 'quantitative' && !isContinuousToDiscrete(scaleType)) {
        return true;
    }
    // 2) non-binned, quantitative x-scale or y-scale
    // (For binning, we should not include zero by default because binning are calculated without zero.)
    if (!(isFieldDef(fieldDef) && fieldDef.bin) &&
        util.contains([...POSITION_SCALE_CHANNELS, ...POLAR_POSITION_SCALE_CHANNELS], channel)) {
        const { orient, type } = markDef;
        if (contains(['bar', 'area', 'line', 'trail'], type)) {
            if ((orient === 'horizontal' && channel === 'y') || (orient === 'vertical' && channel === 'x')) {
                return false;
            }
        }
        return true;
    }
    return false;
}
//# sourceMappingURL=properties.js.map