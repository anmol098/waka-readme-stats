import { Stream } from 'vega';
import { SelectionCompiler, SelectionComponent } from '.';
import { UnitModel } from '../unit';
export declare function singleOrMultiSignals(model: UnitModel, selCmpt: SelectionComponent<'single' | 'multi'>): {
    name: string;
    on: {
        events: Stream[];
        update: string;
        force: boolean;
    }[];
}[];
declare const multi: SelectionCompiler<'multi'>;
export default multi;
//# sourceMappingURL=multi.d.ts.map