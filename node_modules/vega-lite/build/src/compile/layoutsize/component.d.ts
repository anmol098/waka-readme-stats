import { Split } from '../split';
export declare type LayoutSize = number | 'container' | 'step' | 'merged';
export interface LayoutSizeIndex {
    width?: LayoutSize;
    childWidth?: LayoutSize;
    height?: LayoutSize;
    childHeight?: LayoutSize;
}
export declare type LayoutSizeType = keyof LayoutSizeIndex;
export declare type LayoutSizeComponent = Split<LayoutSizeIndex>;
export declare function getSizeTypeFromLayoutSizeType(layoutSizeType: LayoutSizeType): 'width' | 'height';
//# sourceMappingURL=component.d.ts.map