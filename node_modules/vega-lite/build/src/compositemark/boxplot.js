import { __rest } from "tslib";
import { isNumber, isObject } from 'vega-util';
import { getMarkPropOrConfig } from '../compile/common';
import { extractTransformsFromEncoding, normalizeEncoding } from '../encoding';
import * as log from '../log';
import { isMarkDef } from '../mark';
import { isEmpty, omit } from '../util';
import { CompositeMarkNormalizer } from './base';
import { compositeMarkContinuousAxis, compositeMarkOrient, filterTooltipWithAggregatedField, getCompositeMarkTooltip, getTitle, makeCompositeAggregatePartFactory, partLayerMixins } from './common';
export const BOXPLOT = 'boxplot';
export const BOXPLOT_PARTS = ['box', 'median', 'outliers', 'rule', 'ticks'];
export const boxPlotNormalizer = new CompositeMarkNormalizer(BOXPLOT, normalizeBoxPlot);
export function getBoxPlotType(extent) {
    if (isNumber(extent)) {
        return 'tukey';
    }
    // Ham: If we ever want to, we could add another extent syntax `{kIQR: number}` for the original [Q1-k*IQR, Q3+k*IQR] whisker and call this boxPlotType = `kIQR`. However, I'm not exposing this for now.
    return extent;
}
export function normalizeBoxPlot(spec, { config }) {
    var _a, _b;
    // Need to initEncoding first so we can infer type
    spec = Object.assign(Object.assign({}, spec), { encoding: normalizeEncoding(spec.encoding, config) });
    const { mark, encoding: _encoding, selection, projection: _p } = spec, outerSpec = __rest(spec, ["mark", "encoding", "selection", "projection"]);
    const markDef = isMarkDef(mark) ? mark : { type: mark };
    // TODO(https://github.com/vega/vega-lite/issues/3702): add selection support
    if (selection) {
        log.warn(log.message.selectionNotSupported('boxplot'));
    }
    const extent = (_a = markDef.extent) !== null && _a !== void 0 ? _a : config.boxplot.extent;
    const sizeValue = getMarkPropOrConfig('size', markDef, // TODO: https://github.com/vega/vega-lite/issues/6245
    config);
    const boxPlotType = getBoxPlotType(extent);
    const { transform, continuousAxisChannelDef, continuousAxis, groupby, aggregate, encodingWithoutContinuousAxis, ticksOrient, boxOrient, customTooltipWithoutAggregatedField } = boxParams(spec, extent, config);
    const { color, size } = encodingWithoutContinuousAxis, encodingWithoutSizeColorAndContinuousAxis = __rest(encodingWithoutContinuousAxis, ["color", "size"]);
    const makeBoxPlotPart = (sharedEncoding) => {
        return makeCompositeAggregatePartFactory(markDef, continuousAxis, continuousAxisChannelDef, sharedEncoding, config.boxplot);
    };
    const makeBoxPlotExtent = makeBoxPlotPart(encodingWithoutSizeColorAndContinuousAxis);
    const makeBoxPlotBox = makeBoxPlotPart(encodingWithoutContinuousAxis);
    const makeBoxPlotMidTick = makeBoxPlotPart(Object.assign(Object.assign({}, encodingWithoutSizeColorAndContinuousAxis), (size ? { size } : {})));
    const fiveSummaryTooltipEncoding = getCompositeMarkTooltip([
        { fieldPrefix: boxPlotType === 'min-max' ? 'upper_whisker_' : 'max_', titlePrefix: 'Max' },
        { fieldPrefix: 'upper_box_', titlePrefix: 'Q3' },
        { fieldPrefix: 'mid_box_', titlePrefix: 'Median' },
        { fieldPrefix: 'lower_box_', titlePrefix: 'Q1' },
        { fieldPrefix: boxPlotType === 'min-max' ? 'lower_whisker_' : 'min_', titlePrefix: 'Min' }
    ], continuousAxisChannelDef, encodingWithoutContinuousAxis);
    // ## Whisker Layers
    const endTick = { type: 'tick', color: 'black', opacity: 1, orient: ticksOrient, invalid: null, aria: false };
    const whiskerTooltipEncoding = boxPlotType === 'min-max'
        ? fiveSummaryTooltipEncoding // for min-max, show five-summary tooltip for whisker
        : // for tukey / k-IQR, just show upper/lower-whisker
            getCompositeMarkTooltip([
                { fieldPrefix: 'upper_whisker_', titlePrefix: 'Upper Whisker' },
                { fieldPrefix: 'lower_whisker_', titlePrefix: 'Lower Whisker' }
            ], continuousAxisChannelDef, encodingWithoutContinuousAxis);
    const whiskerLayers = [
        ...makeBoxPlotExtent({
            partName: 'rule',
            mark: { type: 'rule', invalid: null, aria: false },
            positionPrefix: 'lower_whisker',
            endPositionPrefix: 'lower_box',
            extraEncoding: whiskerTooltipEncoding
        }),
        ...makeBoxPlotExtent({
            partName: 'rule',
            mark: { type: 'rule', invalid: null, aria: false },
            positionPrefix: 'upper_box',
            endPositionPrefix: 'upper_whisker',
            extraEncoding: whiskerTooltipEncoding
        }),
        ...makeBoxPlotExtent({
            partName: 'ticks',
            mark: endTick,
            positionPrefix: 'lower_whisker',
            extraEncoding: whiskerTooltipEncoding
        }),
        ...makeBoxPlotExtent({
            partName: 'ticks',
            mark: endTick,
            positionPrefix: 'upper_whisker',
            extraEncoding: whiskerTooltipEncoding
        })
    ];
    // ## Box Layers
    // TODO: support hiding certain mark parts
    const boxLayers = [
        ...(boxPlotType !== 'tukey' ? whiskerLayers : []),
        ...makeBoxPlotBox({
            partName: 'box',
            mark: Object.assign(Object.assign({ type: 'bar' }, (sizeValue ? { size: sizeValue } : {})), { orient: boxOrient, invalid: null, ariaRoleDescription: 'box' }),
            positionPrefix: 'lower_box',
            endPositionPrefix: 'upper_box',
            extraEncoding: fiveSummaryTooltipEncoding
        }),
        ...makeBoxPlotMidTick({
            partName: 'median',
            mark: Object.assign(Object.assign(Object.assign({ type: 'tick', invalid: null }, (isObject(config.boxplot.median) && config.boxplot.median.color ? { color: config.boxplot.median.color } : {})), (sizeValue ? { size: sizeValue } : {})), { orient: ticksOrient, aria: false }),
            positionPrefix: 'mid_box',
            extraEncoding: fiveSummaryTooltipEncoding
        })
    ];
    // ## Filtered Layers
    let filteredLayersMixins;
    if (boxPlotType !== 'min-max') {
        const lowerBoxExpr = `datum["lower_box_${continuousAxisChannelDef.field}"]`;
        const upperBoxExpr = `datum["upper_box_${continuousAxisChannelDef.field}"]`;
        const iqrExpr = `(${upperBoxExpr} - ${lowerBoxExpr})`;
        const lowerWhiskerExpr = `${lowerBoxExpr} - ${extent} * ${iqrExpr}`;
        const upperWhiskerExpr = `${upperBoxExpr} + ${extent} * ${iqrExpr}`;
        const fieldExpr = `datum["${continuousAxisChannelDef.field}"]`;
        const joinaggregateTransform = {
            joinaggregate: boxParamsQuartiles(continuousAxisChannelDef.field),
            groupby
        };
        let filteredWhiskerSpec = undefined;
        if (boxPlotType === 'tukey') {
            filteredWhiskerSpec = {
                transform: [
                    {
                        filter: `(${lowerWhiskerExpr} <= ${fieldExpr}) && (${fieldExpr} <= ${upperWhiskerExpr})`
                    },
                    {
                        aggregate: [
                            {
                                op: 'min',
                                field: continuousAxisChannelDef.field,
                                as: 'lower_whisker_' + continuousAxisChannelDef.field
                            },
                            {
                                op: 'max',
                                field: continuousAxisChannelDef.field,
                                as: 'upper_whisker_' + continuousAxisChannelDef.field
                            },
                            // preserve lower_box / upper_box
                            {
                                op: 'min',
                                field: 'lower_box_' + continuousAxisChannelDef.field,
                                as: 'lower_box_' + continuousAxisChannelDef.field
                            },
                            {
                                op: 'max',
                                field: 'upper_box_' + continuousAxisChannelDef.field,
                                as: 'upper_box_' + continuousAxisChannelDef.field
                            },
                            ...aggregate
                        ],
                        groupby
                    }
                ],
                layer: whiskerLayers
            };
        }
        const { tooltip } = encodingWithoutSizeColorAndContinuousAxis, encodingWithoutSizeColorContinuousAxisAndTooltip = __rest(encodingWithoutSizeColorAndContinuousAxis, ["tooltip"]);
        const { scale, axis } = continuousAxisChannelDef;
        const title = getTitle(continuousAxisChannelDef);
        const axisWithoutTitle = omit(axis, ['title']);
        const outlierLayersMixins = partLayerMixins(markDef, 'outliers', config.boxplot, {
            transform: [{ filter: `(${fieldExpr} < ${lowerWhiskerExpr}) || (${fieldExpr} > ${upperWhiskerExpr})` }],
            mark: 'point',
            encoding: Object.assign(Object.assign({ [continuousAxis]: Object.assign(Object.assign(Object.assign({ field: continuousAxisChannelDef.field, type: continuousAxisChannelDef.type }, (title !== undefined ? { title } : {})), (scale !== undefined ? { scale } : {})), (isEmpty(axisWithoutTitle) ? {} : { axis: axisWithoutTitle })) }, encodingWithoutSizeColorContinuousAxisAndTooltip), (customTooltipWithoutAggregatedField ? { tooltip: customTooltipWithoutAggregatedField } : {}))
        })[0];
        if (outlierLayersMixins && filteredWhiskerSpec) {
            filteredLayersMixins = {
                transform: [joinaggregateTransform],
                layer: [outlierLayersMixins, filteredWhiskerSpec]
            };
        }
        else if (outlierLayersMixins) {
            filteredLayersMixins = outlierLayersMixins;
            filteredLayersMixins.transform.unshift(joinaggregateTransform);
        }
        else if (filteredWhiskerSpec) {
            filteredLayersMixins = filteredWhiskerSpec;
            filteredLayersMixins.transform.unshift(joinaggregateTransform);
        }
    }
    if (filteredLayersMixins) {
        // tukey box plot with outliers included
        return Object.assign(Object.assign({}, outerSpec), { layer: [
                filteredLayersMixins,
                {
                    // boxplot
                    transform,
                    layer: boxLayers
                }
            ] });
    }
    return Object.assign(Object.assign({}, outerSpec), { transform: ((_b = outerSpec.transform) !== null && _b !== void 0 ? _b : []).concat(transform), layer: boxLayers });
}
function boxParamsQuartiles(continousAxisField) {
    return [
        {
            op: 'q1',
            field: continousAxisField,
            as: 'lower_box_' + continousAxisField
        },
        {
            op: 'q3',
            field: continousAxisField,
            as: 'upper_box_' + continousAxisField
        }
    ];
}
function boxParams(spec, extent, config) {
    const orient = compositeMarkOrient(spec, BOXPLOT);
    const { continuousAxisChannelDef, continuousAxis } = compositeMarkContinuousAxis(spec, orient, BOXPLOT);
    const continuousFieldName = continuousAxisChannelDef.field;
    const boxPlotType = getBoxPlotType(extent);
    const boxplotSpecificAggregate = [
        ...boxParamsQuartiles(continuousFieldName),
        {
            op: 'median',
            field: continuousFieldName,
            as: 'mid_box_' + continuousFieldName
        },
        {
            op: 'min',
            field: continuousFieldName,
            as: (boxPlotType === 'min-max' ? 'lower_whisker_' : 'min_') + continuousFieldName
        },
        {
            op: 'max',
            field: continuousFieldName,
            as: (boxPlotType === 'min-max' ? 'upper_whisker_' : 'max_') + continuousFieldName
        }
    ];
    const postAggregateCalculates = boxPlotType === 'min-max' || boxPlotType === 'tukey'
        ? []
        : [
            // This is for the  original k-IQR, which we do not expose
            {
                calculate: `datum["upper_box_${continuousFieldName}"] - datum["lower_box_${continuousFieldName}"]`,
                as: 'iqr_' + continuousFieldName
            },
            {
                calculate: `min(datum["upper_box_${continuousFieldName}"] + datum["iqr_${continuousFieldName}"] * ${extent}, datum["max_${continuousFieldName}"])`,
                as: 'upper_whisker_' + continuousFieldName
            },
            {
                calculate: `max(datum["lower_box_${continuousFieldName}"] - datum["iqr_${continuousFieldName}"] * ${extent}, datum["min_${continuousFieldName}"])`,
                as: 'lower_whisker_' + continuousFieldName
            }
        ];
    const _a = spec.encoding, _b = continuousAxis, oldContinuousAxisChannelDef = _a[_b], oldEncodingWithoutContinuousAxis = __rest(_a, [typeof _b === "symbol" ? _b : _b + ""]);
    const { customTooltipWithoutAggregatedField, filteredEncoding } = filterTooltipWithAggregatedField(oldEncodingWithoutContinuousAxis);
    const { bins, timeUnits, aggregate, groupby, encoding: encodingWithoutContinuousAxis } = extractTransformsFromEncoding(filteredEncoding, config);
    const ticksOrient = orient === 'vertical' ? 'horizontal' : 'vertical';
    const boxOrient = orient;
    const transform = [
        ...bins,
        ...timeUnits,
        {
            aggregate: [...aggregate, ...boxplotSpecificAggregate],
            groupby
        },
        ...postAggregateCalculates
    ];
    return {
        transform,
        groupby,
        aggregate,
        continuousAxisChannelDef,
        continuousAxis,
        encodingWithoutContinuousAxis,
        ticksOrient,
        boxOrient,
        customTooltipWithoutAggregatedField
    };
}
//# sourceMappingURL=boxplot.js.map