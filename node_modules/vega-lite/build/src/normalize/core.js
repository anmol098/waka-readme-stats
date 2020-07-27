import { __rest } from "tslib";
import { isArray } from 'vega-util';
import { COLUMN, FACET, ROW } from '../channel';
import { hasConditionalFieldOrDatumDef, isFieldOrDatumDef, isValueDef } from '../channeldef';
import { boxPlotNormalizer } from '../compositemark/boxplot';
import { errorBandNormalizer } from '../compositemark/errorband';
import { errorBarNormalizer } from '../compositemark/errorbar';
import { channelHasField } from '../encoding';
import * as log from '../log';
import { isFacetMapping } from '../spec/facet';
import { SpecMapper } from '../spec/map';
import { isLayerRepeatSpec } from '../spec/repeat';
import { isUnitSpec } from '../spec/unit';
import { isEmpty, keys, omit, varName } from '../util';
import { isSignalRef } from '../vega.schema';
import { PathOverlayNormalizer } from './pathoverlay';
import { RangeStepNormalizer } from './rangestep';
import { replaceRepeaterInEncoding, replaceRepeaterInFacet } from './repeater';
import { RuleForRangedLineNormalizer } from './ruleforrangedline';
export class CoreNormalizer extends SpecMapper {
    constructor() {
        super(...arguments);
        this.nonFacetUnitNormalizers = [
            boxPlotNormalizer,
            errorBarNormalizer,
            errorBandNormalizer,
            new PathOverlayNormalizer(),
            new RuleForRangedLineNormalizer(),
            new RangeStepNormalizer()
        ];
    }
    map(spec, params) {
        // Special handling for a faceted unit spec as it can return a facet spec, not just a layer or unit spec like a normal unit spec.
        if (isUnitSpec(spec)) {
            const hasRow = channelHasField(spec.encoding, ROW);
            const hasColumn = channelHasField(spec.encoding, COLUMN);
            const hasFacet = channelHasField(spec.encoding, FACET);
            if (hasRow || hasColumn || hasFacet) {
                return this.mapFacetedUnit(spec, params);
            }
        }
        return super.map(spec, params);
    }
    // This is for normalizing non-facet unit
    mapUnit(spec, params) {
        const { parentEncoding, parentProjection } = params;
        const encoding = replaceRepeaterInEncoding(spec.encoding, params.repeater);
        const specWithReplacedEncoding = Object.assign(Object.assign({}, spec), (encoding ? { encoding } : {}));
        if (parentEncoding || parentProjection) {
            return this.mapUnitWithParentEncodingOrProjection(specWithReplacedEncoding, params);
        }
        const normalizeLayerOrUnit = this.mapLayerOrUnit.bind(this);
        for (const unitNormalizer of this.nonFacetUnitNormalizers) {
            if (unitNormalizer.hasMatchingType(specWithReplacedEncoding, params.config)) {
                return unitNormalizer.run(specWithReplacedEncoding, params, normalizeLayerOrUnit);
            }
        }
        return specWithReplacedEncoding;
    }
    mapRepeat(spec, params) {
        if (isLayerRepeatSpec(spec)) {
            return this.mapLayerRepeat(spec, params);
        }
        else {
            return this.mapNonLayerRepeat(spec, params);
        }
    }
    mapLayerRepeat(spec, params) {
        const { repeat, spec: childSpec } = spec, rest = __rest(spec, ["repeat", "spec"]);
        const { row, column, layer } = repeat;
        const { repeater = {}, repeaterPrefix = '' } = params;
        if (row || column) {
            return this.mapRepeat(Object.assign(Object.assign({}, spec), { repeat: Object.assign(Object.assign({}, (row ? { row } : {})), (column ? { column } : {})), spec: {
                    repeat: { layer },
                    spec: childSpec
                } }), params);
        }
        else {
            return Object.assign(Object.assign({}, rest), { layer: layer.map(layerValue => {
                    const childRepeater = Object.assign(Object.assign({}, repeater), { layer: layerValue });
                    const childName = (childSpec.name || '') + repeaterPrefix + `child__layer_${varName(layerValue)}`;
                    const child = this.mapLayerOrUnit(childSpec, Object.assign(Object.assign({}, params), { repeater: childRepeater, repeaterPrefix: childName }));
                    child.name = childName;
                    return child;
                }) });
        }
    }
    mapNonLayerRepeat(spec, params) {
        var _a;
        const { repeat, spec: childSpec, data } = spec, remainingProperties = __rest(spec, ["repeat", "spec", "data"]);
        if (!isArray(repeat) && spec.columns) {
            // is repeat with row/column
            spec = omit(spec, ['columns']);
            log.warn(log.message.columnsNotSupportByRowCol('repeat'));
        }
        const concat = [];
        const { repeater = {}, repeaterPrefix = '' } = params;
        const row = (!isArray(repeat) && repeat.row) || [repeater ? repeater.row : null];
        const column = (!isArray(repeat) && repeat.column) || [repeater ? repeater.column : null];
        const repeatValues = (isArray(repeat) && repeat) || [repeater ? repeater.repeat : null];
        // cross product
        for (const repeatValue of repeatValues) {
            for (const rowValue of row) {
                for (const columnValue of column) {
                    const childRepeater = {
                        repeat: repeatValue,
                        row: rowValue,
                        column: columnValue,
                        layer: repeater.layer
                    };
                    const childName = (childSpec.name || '') +
                        repeaterPrefix +
                        'child__' +
                        (isArray(repeat)
                            ? `${varName(repeatValue)}`
                            : (repeat.row ? `row_${varName(rowValue)}` : '') +
                                (repeat.column ? `column_${varName(columnValue)}` : ''));
                    const child = this.map(childSpec, Object.assign(Object.assign({}, params), { repeater: childRepeater, repeaterPrefix: childName }));
                    child.name = childName;
                    // we move data up
                    concat.push(omit(child, ['data']));
                }
            }
        }
        const columns = isArray(repeat) ? spec.columns : repeat.column ? repeat.column.length : 1;
        return Object.assign(Object.assign({ data: (_a = childSpec.data) !== null && _a !== void 0 ? _a : data, align: 'all' }, remainingProperties), { columns,
            concat });
    }
    mapFacet(spec, params) {
        const { facet } = spec;
        if (isFacetMapping(facet) && spec.columns) {
            // is facet with row/column
            spec = omit(spec, ['columns']);
            log.warn(log.message.columnsNotSupportByRowCol('facet'));
        }
        return super.mapFacet(spec, params);
    }
    mapUnitWithParentEncodingOrProjection(spec, params) {
        const { encoding, projection } = spec;
        const { parentEncoding, parentProjection, config } = params;
        const mergedProjection = mergeProjection({ parentProjection, projection });
        const mergedEncoding = mergeEncoding({
            parentEncoding,
            encoding: replaceRepeaterInEncoding(encoding, params.repeater)
        });
        return this.mapUnit(Object.assign(Object.assign(Object.assign({}, spec), (mergedProjection ? { projection: mergedProjection } : {})), (mergedEncoding ? { encoding: mergedEncoding } : {})), { config });
    }
    mapFacetedUnit(spec, params) {
        // New encoding in the inside spec should not contain row / column
        // as row/column should be moved to facet
        const _a = spec.encoding, { row, column, facet } = _a, encoding = __rest(_a, ["row", "column", "facet"]);
        // Mark and encoding should be moved into the inner spec
        const { mark, width, projection, height, view, selection, encoding: _ } = spec, outerSpec = __rest(spec, ["mark", "width", "projection", "height", "view", "selection", "encoding"]);
        const { facetMapping, layout } = this.getFacetMappingAndLayout({ row, column, facet }, params);
        const newEncoding = replaceRepeaterInEncoding(encoding, params.repeater);
        return this.mapFacet(Object.assign(Object.assign(Object.assign({}, outerSpec), layout), { 
            // row / column has higher precedence than facet
            facet: facetMapping, spec: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, (width ? { width } : {})), (height ? { height } : {})), (view ? { view } : {})), (projection ? { projection } : {})), { mark, encoding: newEncoding }), (selection ? { selection } : {})) }), params);
    }
    getFacetMappingAndLayout(facets, params) {
        var _a;
        const { row, column, facet } = facets;
        if (row || column) {
            if (facet) {
                log.warn(log.message.facetChannelDropped([...(row ? [ROW] : []), ...(column ? [COLUMN] : [])]));
            }
            const facetMapping = {};
            const layout = {};
            for (const channel of [ROW, COLUMN]) {
                const def = facets[channel];
                if (def) {
                    const { align, center, spacing, columns } = def, defWithoutLayout = __rest(def, ["align", "center", "spacing", "columns"]);
                    facetMapping[channel] = defWithoutLayout;
                    for (const prop of ['align', 'center', 'spacing']) {
                        if (def[prop] !== undefined) {
                            layout[prop] = (_a = layout[prop]) !== null && _a !== void 0 ? _a : {};
                            layout[prop][channel] = def[prop];
                        }
                    }
                }
            }
            return { facetMapping, layout };
        }
        else {
            const { align, center, spacing, columns } = facet, facetMapping = __rest(facet, ["align", "center", "spacing", "columns"]);
            return {
                facetMapping: replaceRepeaterInFacet(facetMapping, params.repeater),
                layout: Object.assign(Object.assign(Object.assign(Object.assign({}, (align ? { align } : {})), (center ? { center } : {})), (spacing ? { spacing } : {})), (columns ? { columns } : {}))
            };
        }
    }
    mapLayer(spec, _a) {
        // Special handling for extended layer spec
        var { parentEncoding, parentProjection } = _a, otherParams = __rest(_a, ["parentEncoding", "parentProjection"]);
        const { encoding, projection } = spec, rest = __rest(spec, ["encoding", "projection"]);
        const params = Object.assign(Object.assign({}, otherParams), { parentEncoding: mergeEncoding({ parentEncoding, encoding, layer: true }), parentProjection: mergeProjection({ parentProjection, projection }) });
        return super.mapLayer(rest, params);
    }
}
function mergeEncoding({ parentEncoding, encoding = {}, layer }) {
    let merged = {};
    if (parentEncoding) {
        const channels = new Set([...keys(parentEncoding), ...keys(encoding)]);
        for (const channel of channels) {
            const channelDef = encoding[channel];
            const parentChannelDef = parentEncoding[channel];
            if (isFieldOrDatumDef(channelDef)) {
                // Field/Datum Def can inherit properties from its parent
                // Note that parentChannelDef doesn't have to be a field/datum def if the channelDef is already one.
                const mergedChannelDef = Object.assign(Object.assign({}, parentChannelDef), channelDef);
                merged[channel] = mergedChannelDef;
            }
            else if (hasConditionalFieldOrDatumDef(channelDef)) {
                merged[channel] = Object.assign(Object.assign({}, channelDef), { condition: Object.assign(Object.assign({}, parentChannelDef), channelDef.condition) });
            }
            else if (channelDef) {
                merged[channel] = channelDef;
            }
            else if (layer ||
                isValueDef(parentChannelDef) ||
                isSignalRef(parentChannelDef) ||
                isFieldOrDatumDef(parentChannelDef) ||
                isArray(parentChannelDef)) {
                merged[channel] = parentChannelDef;
            }
        }
    }
    else {
        merged = encoding;
    }
    return !merged || isEmpty(merged) ? undefined : merged;
}
function mergeProjection(opt) {
    const { parentProjection, projection } = opt;
    if (parentProjection && projection) {
        log.warn(log.message.projectionOverridden({ parentProjection, projection }));
    }
    return projection !== null && projection !== void 0 ? projection : parentProjection;
}
//# sourceMappingURL=core.js.map