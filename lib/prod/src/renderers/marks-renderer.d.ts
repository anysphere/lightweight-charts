import { SeriesItemsIndexesRange } from '../model/time-data';
import { LineItemBase } from './line-renderer-base';
import { ScaledRenderer } from './scaled-renderer';
export interface MarksRendererData {
    items: LineItemBase[];
    lineColor: string;
    backColor: string;
    radius: number;
    visibleRange: SeriesItemsIndexesRange | null;
}
export declare class PaneRendererMarks extends ScaledRenderer {
    protected _data: MarksRendererData | null;
    setData(data: MarksRendererData): void;
    protected _drawImpl(ctx: CanvasRenderingContext2D): void;
}
