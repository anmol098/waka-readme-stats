import { Config } from '../../config';
import { Encoding } from '../../encoding';
import { MarkDef } from '../../mark';
export declare function initMarkdef(markDef: MarkDef, encoding: Encoding<string>, config: Config): MarkDef<"square" | "circle" | "text" | "point" | "arc" | "area" | "image" | "line" | "rect" | "rule" | "trail" | "geoshape" | "bar" | "tick">;
export declare function defaultFilled(markDef: MarkDef, config: Config, { graticule }: {
    graticule: boolean;
}): boolean;
//# sourceMappingURL=init.d.ts.map