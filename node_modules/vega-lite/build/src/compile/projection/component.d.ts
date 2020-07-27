import { SignalRef } from 'vega';
import { Projection } from '../../projection';
import { Projection as VgProjection } from 'vega';
import { Split } from '../split';
export declare class ProjectionComponent extends Split<VgProjection> {
    specifiedProjection: Projection;
    size: SignalRef[];
    data: (string | SignalRef)[];
    merged: boolean;
    constructor(name: string, specifiedProjection: Projection, size: SignalRef[], data: (string | SignalRef)[]);
    /**
     * Whether the projection parameters should fit provided data.
     */
    get isFit(): boolean;
}
//# sourceMappingURL=component.d.ts.map