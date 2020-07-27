import { isNumber, isObject } from 'vega-util';
import { keys } from '../util';
import { isConcatSpec, isVConcatSpec } from './concat';
import { isFacetMapping, isFacetSpec } from './facet';
export function isStep(size) {
    return isObject(size) && size['step'] !== undefined;
}
export function isFrameMixins(o) {
    return o['view'] || o['width'] || o['height'];
}
export const DEFAULT_SPACING = 20;
const COMPOSITION_LAYOUT_INDEX = {
    align: 1,
    bounds: 1,
    center: 1,
    columns: 1,
    spacing: 1
};
const COMPOSITION_LAYOUT_PROPERTIES = keys(COMPOSITION_LAYOUT_INDEX);
export function extractCompositionLayout(spec, specType, config) {
    var _a, _b;
    const compositionConfig = config[specType];
    const layout = {};
    // Apply config first
    const { spacing: spacingConfig, columns } = compositionConfig;
    if (spacingConfig !== undefined) {
        layout.spacing = spacingConfig;
    }
    if (columns !== undefined) {
        if ((isFacetSpec(spec) && !isFacetMapping(spec.facet)) || isConcatSpec(spec)) {
            layout.columns = columns;
        }
    }
    if (isVConcatSpec(spec)) {
        layout.columns = 1;
    }
    // Then copy properties from the spec
    for (const prop of COMPOSITION_LAYOUT_PROPERTIES) {
        if (spec[prop] !== undefined) {
            if (prop === 'spacing') {
                const spacing = spec[prop];
                layout[prop] = isNumber(spacing)
                    ? spacing
                    : {
                        row: (_a = spacing.row) !== null && _a !== void 0 ? _a : spacingConfig,
                        column: (_b = spacing.column) !== null && _b !== void 0 ? _b : spacingConfig
                    };
            }
            else {
                layout[prop] = spec[prop];
            }
        }
    }
    return layout;
}
//# sourceMappingURL=base.js.map