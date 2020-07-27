import { NonPositionScaleChannel } from '../../channel';
import { Model } from '../model';
import { UnitModel } from '../unit';
import { LegendComponent } from './component';
export declare function parseLegend(model: Model): Partial<Record<"stroke" | "color" | "shape" | "fill" | "opacity" | "fillOpacity" | "strokeOpacity" | "strokeWidth" | "strokeDash" | "size" | "angle", LegendComponent>>;
export declare function parseLegendForChannel(model: UnitModel, channel: NonPositionScaleChannel): LegendComponent;
export declare function mergeLegendComponent(mergedLegend: LegendComponent, childLegend: LegendComponent): LegendComponent;
//# sourceMappingURL=parse.d.ts.map