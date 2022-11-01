import { PricedValue } from '../model/price-scale';
import { SeriesItemsIndexesRange, TimedValue } from '../model/time-data';
import { LinePoint, LineStyle, LineType, LineWidth } from './draw-line';
import { ScaledRenderer } from './scaled-renderer';
export declare type LineItemBase = TimedValue & PricedValue & LinePoint;
export interface PaneRendererLineDataBase<TItem extends LineItemBase = LineItemBase> {
    lineType: LineType;
    items: TItem[];
    barWidth: number;
    lineWidth: LineWidth;
    lineStyle: LineStyle;
    visibleRange: SeriesItemsIndexesRange | null;
}
export declare abstract class PaneRendererLineBase<TData extends PaneRendererLineDataBase> extends ScaledRenderer {
    protected _data: TData | null;
    setData(data: TData): void;
    protected _drawImpl(ctx: CanvasRenderingContext2D): void;
    protected abstract _strokeStyle(ctx: CanvasRenderingContext2D, item: TData['items'][0]): CanvasRenderingContext2D['strokeStyle'];
}
