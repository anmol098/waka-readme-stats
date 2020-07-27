import { NonPositionScaleChannel, PositionScaleChannel, ScaleChannel } from './channel';
export declare type ResolveMode = 'independent' | 'shared';
/**
 * Defines how scales, axes, and legends from different specs should be combined. Resolve is a mapping from `scale`, `axis`, and `legend` to a mapping from channels to resolutions. Scales and guides can be resolved to be `"independent"` or `"shared"`.
 */
export interface Resolve {
    scale?: ScaleResolveMap;
    axis?: AxisResolveMap;
    legend?: LegendResolveMap;
}
export declare type ScaleResolveMap = Partial<Record<ScaleChannel, ResolveMode>>;
export declare type AxisResolveMap = Partial<Record<PositionScaleChannel, ResolveMode>>;
export declare type LegendResolveMap = Partial<Record<NonPositionScaleChannel, ResolveMode>>;
//# sourceMappingURL=resolve.d.ts.map