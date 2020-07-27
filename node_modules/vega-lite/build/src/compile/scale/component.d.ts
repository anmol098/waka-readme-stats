import { SignalRef } from 'vega';
import { ScaleChannel } from '../../channel';
import { Scale, ScaleType } from '../../scale';
import { SelectionExtent } from '../../selection';
import { VgNonUnionDomain, VgScale } from '../../vega.schema';
import { Explicit, Split } from '../split';
/**
 * All VgDomain property except domain.
 * (We exclude domain as we have a special "domains" array that allow us merge them all at once in assemble.)
 */
export declare type ScaleComponentProps = Omit<VgScale, 'domain' | 'domainRaw' | 'reverse'> & {
    domains: VgNonUnionDomain[];
    selectionExtent?: SelectionExtent;
    reverse?: boolean | SignalRef;
};
export declare type Range = ScaleComponentProps['range'];
export declare class ScaleComponent extends Split<ScaleComponentProps> {
    merged: boolean;
    constructor(name: string, typeWithExplicit: Explicit<ScaleType>);
    /**
     * Whether the scale definitely includes zero in the domain
     */
    domainDefinitelyIncludesZero(): boolean;
}
export declare type ScaleComponentIndex = Partial<Record<ScaleChannel, ScaleComponent>>;
export declare type ScaleIndex = Partial<Record<ScaleChannel, Scale>>;
//# sourceMappingURL=component.d.ts.map