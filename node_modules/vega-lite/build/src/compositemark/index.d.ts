import { Field } from '../channeldef';
import { Encoding } from '../encoding';
import { NormalizerParams } from '../normalize';
import { GenericUnitSpec, NormalizedLayerSpec } from '../spec';
import { EncodingFacetMapping } from '../spec/facet';
import { NormalizedUnitSpec } from '../spec/unit';
import { BoxPlot, BoxPlotConfigMixins, BoxPlotDef } from './boxplot';
import { ErrorBand, ErrorBandConfigMixins, ErrorBandDef } from './errorband';
import { ErrorBar, ErrorBarConfigMixins, ErrorBarDef, ErrorExtraEncoding } from './errorbar';
export { BoxPlotConfig } from './boxplot';
export { ErrorBandConfigMixins } from './errorband';
export { ErrorBarConfigMixins } from './errorbar';
export declare type CompositeMarkNormalizerRun = (spec: GenericUnitSpec<any, any>, params: NormalizerParams) => NormalizedLayerSpec | NormalizedUnitSpec;
export declare function add(mark: string, run: CompositeMarkNormalizerRun, parts: readonly string[]): void;
export declare function remove(mark: string): void;
export declare type CompositeEncoding<F extends Field = Field> = Encoding<F> & ErrorExtraEncoding<F>;
export declare type PartialIndex<T extends Encoding<any>> = {
    [t in keyof T]?: Partial<T[t]>;
};
export declare type SharedCompositeEncoding<F extends Field = Field> = PartialIndex<Omit<CompositeEncoding<F>, 'detail' | 'order' | 'tooltip'>> & Pick<Encoding<F>, 'detail' | 'order' | 'tooltip'>;
export declare type FacetedCompositeEncoding<F extends Field = Field> = Encoding<F> & ErrorExtraEncoding<F> & EncodingFacetMapping<F>;
export declare type CompositeMark = BoxPlot | ErrorBar | ErrorBand;
export declare function getAllCompositeMarks(): string[];
export declare type CompositeMarkDef = BoxPlotDef | ErrorBarDef | ErrorBandDef;
export declare type CompositeAggregate = BoxPlot | ErrorBar | ErrorBand;
export interface CompositeMarkConfigMixins extends BoxPlotConfigMixins, ErrorBarConfigMixins, ErrorBandConfigMixins {
}
//# sourceMappingURL=index.d.ts.map