import { BaseProjection, SignalRef, Vector2 } from 'vega';
import { ProjectionType } from './vega.schema';
export interface Projection extends BaseProjection {
    /**
     * The cartographic projection to use. This value is case-insensitive, for example `"albers"` and `"Albers"` indicate the same projection type. You can find all valid projection types [in the documentation](https://vega.github.io/vega-lite/docs/projection.html#projection-types).
     *
     * __Default value:__ `mercator`
     */
    type?: ProjectionType | SignalRef;
    /**
     * The projection’s scale (zoom) factor, overriding automatic fitting. The default scale is projection-specific. The scale factor corresponds linearly to the distance between projected points; however, scale factor values are not equivalent across projections.
     */
    scale?: number | SignalRef;
    /**
     * The projection’s translation offset as a two-element array `[tx, ty]`.
     */
    translate?: Vector2<number> | SignalRef;
}
/**
 * Any property of Projection can be in config
 */
export declare type ProjectionConfig = Projection;
export declare const PROJECTION_PROPERTIES: (keyof Projection)[];
//# sourceMappingURL=projection.d.ts.map