import { isString } from 'vega-util';
import { isBinning } from '../bin';
import { channelDefType, isFieldDef, isFieldOrDatumDefForTimeFormat, isScaleFieldDef, vgField } from '../channeldef';
import { fieldValidPredicate } from '../predicate';
import { ScaleType } from '../scale';
import { formatExpression, normalizeTimeUnit, timeUnitSpecifierExpression } from '../timeunit';
import { QUANTITATIVE } from '../type';
import { isSignalRef } from '../vega.schema';
import { datumDefToExpr } from './mark/encode/valueref';
export function isCustomFormatType(formatType) {
    return formatType && formatType !== 'number' && formatType !== 'time';
}
function customFormatExpr(formatType, field, format) {
    return `${formatType}(${field}${format ? `, ${JSON.stringify(format)}` : ''})`;
}
export const BIN_RANGE_DELIMITER = ' \u2013 ';
export function formatSignalRef({ fieldOrDatumDef, format, formatType, expr, normalizeStack, config }) {
    var _a, _b;
    if (isCustomFormatType(formatType)) {
        return formatCustomType({
            fieldOrDatumDef,
            format,
            formatType,
            expr,
            config
        });
    }
    const field = fieldToFormat(fieldOrDatumDef, expr, normalizeStack);
    if (isFieldOrDatumDefForTimeFormat(fieldOrDatumDef)) {
        const signal = timeFormatExpression(field, isFieldDef(fieldOrDatumDef) ? (_a = normalizeTimeUnit(fieldOrDatumDef.timeUnit)) === null || _a === void 0 ? void 0 : _a.unit : undefined, format, config.timeFormat, isScaleFieldDef(fieldOrDatumDef) && ((_b = fieldOrDatumDef.scale) === null || _b === void 0 ? void 0 : _b.type) === ScaleType.UTC);
        return signal ? { signal } : undefined;
    }
    format = numberFormat(channelDefType(fieldOrDatumDef), format, config);
    if (isFieldDef(fieldOrDatumDef) && isBinning(fieldOrDatumDef.bin)) {
        const endField = vgField(fieldOrDatumDef, { expr, binSuffix: 'end' });
        return {
            signal: binFormatExpression(field, endField, format, formatType, config)
        };
    }
    else if (format || channelDefType(fieldOrDatumDef) === 'quantitative') {
        return {
            signal: `${formatExpr(field, format)}`
        };
    }
    else {
        return { signal: `isValid(${field}) ? ${field} : ""+${field}` };
    }
}
function fieldToFormat(fieldOrDatumDef, expr, normalizeStack) {
    if (isFieldDef(fieldOrDatumDef)) {
        if (normalizeStack) {
            return `${vgField(fieldOrDatumDef, { expr, suffix: 'end' })}-${vgField(fieldOrDatumDef, {
                expr,
                suffix: 'start'
            })}`;
        }
        else {
            return vgField(fieldOrDatumDef, { expr });
        }
    }
    else {
        return datumDefToExpr(fieldOrDatumDef);
    }
}
export function formatCustomType({ fieldOrDatumDef, format, formatType, expr, normalizeStack, config, field }) {
    field = field !== null && field !== void 0 ? field : fieldToFormat(fieldOrDatumDef, expr, normalizeStack);
    if (isFieldDef(fieldOrDatumDef) && isBinning(fieldOrDatumDef.bin)) {
        const endField = vgField(fieldOrDatumDef, { expr, binSuffix: 'end' });
        return {
            signal: binFormatExpression(field, endField, format, formatType, config)
        };
    }
    return { signal: customFormatExpr(formatType, field, format) };
}
export function guideFormat(fieldOrDatumDef, type, format, formatType, config, omitTimeFormatConfig // axis doesn't use config.timeFormat
) {
    var _a;
    if (isCustomFormatType(formatType)) {
        return undefined; // handled in encode block
    }
    if (isFieldOrDatumDefForTimeFormat(fieldOrDatumDef)) {
        const timeUnit = isFieldDef(fieldOrDatumDef) ? (_a = normalizeTimeUnit(fieldOrDatumDef.timeUnit)) === null || _a === void 0 ? void 0 : _a.unit : undefined;
        return timeFormat(format, timeUnit, config, omitTimeFormatConfig);
    }
    return numberFormat(type, format, config);
}
export function guideFormatType(formatType, fieldOrDatumDef, scaleType) {
    if (formatType && (isSignalRef(formatType) || formatType === 'number' || formatType === 'time')) {
        return formatType;
    }
    if (isFieldOrDatumDefForTimeFormat(fieldOrDatumDef) && scaleType !== 'time' && scaleType !== 'utc') {
        return 'time';
    }
    return undefined;
}
/**
 * Returns number format for a fieldDef.
 */
export function numberFormat(type, specifiedFormat, config) {
    // Specified format in axis/legend has higher precedence than fieldDef.format
    if (isString(specifiedFormat)) {
        return specifiedFormat;
    }
    if (type === QUANTITATIVE) {
        // we only apply the default if the field is quantitative
        return config.numberFormat;
    }
    return undefined;
}
/**
 * Returns time format for a fieldDef for use in guides.
 */
export function timeFormat(specifiedFormat, timeUnit, config, omitTimeFormatConfig) {
    if (specifiedFormat) {
        return specifiedFormat;
    }
    if (timeUnit) {
        return {
            signal: timeUnitSpecifierExpression(timeUnit)
        };
    }
    return omitTimeFormatConfig ? undefined : config.timeFormat;
}
function formatExpr(field, format) {
    return `format(${field}, "${format || ''}")`;
}
function binNumberFormatExpr(field, format, formatType, config) {
    var _a;
    if (isCustomFormatType(formatType)) {
        return customFormatExpr(formatType, field, format);
    }
    return formatExpr(field, (_a = (isString(format) ? format : undefined)) !== null && _a !== void 0 ? _a : config.numberFormat);
}
export function binFormatExpression(startField, endField, format, formatType, config) {
    const start = binNumberFormatExpr(startField, format, formatType, config);
    const end = binNumberFormatExpr(endField, format, formatType, config);
    return `${fieldValidPredicate(startField, false)} ? "null" : ${start} + "${BIN_RANGE_DELIMITER}" + ${end}`;
}
/**
 * Returns the time expression used for axis/legend labels or text mark for a temporal field
 */
export function timeFormatExpression(field, timeUnit, format, rawTimeFormat, // should be provided only for actual text and headers, not axis/legend labels
isUTCScale) {
    if (!timeUnit || format) {
        // If there is no time unit, or if user explicitly specifies format for axis/legend/text.
        format = isString(format) ? format : rawTimeFormat; // only use provided timeFormat if there is no timeUnit.
        return `${isUTCScale ? 'utc' : 'time'}Format(${field}, '${format}')`;
    }
    else {
        return formatExpression(timeUnit, field, isUTCScale);
    }
}
//# sourceMappingURL=format.js.map