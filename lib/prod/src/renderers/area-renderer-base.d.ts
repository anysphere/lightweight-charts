import { Coordinate } from '../model/coordinate';
import { PricedValue } from '../model/price-scale';
import { SeriesItemsIndexesRange, TimedValue } from '../model/time-data';
import { LinePoint, LineStyle, LineType, LineWidth } from './draw-line';
import { ScaledRenderer } from './scaled-renderer';
export declare type AreaFillItemBase = TimedValue & PricedValue & LinePoint;
export interface PaneRendererAreaDataBase<TItem extends AreaFillItemBase = AreaFillItemBase> {
    items: TItem[];
    lineType: LineType;
    lineWidth: LineWidth;
    lineStyle: LineStyle;
    bottom: Coordinate;
    baseLevelCoordinate: Coordinate;
    barWidth: number;
    visibleRange: SeriesItemsIndexesRange | null;
}
export declare abstract class PaneRendererAreaBase<TData extends PaneRendererAreaDataBase> extends ScaledRenderer {
    protected _data: TData | null;
    setData(data: TData): void;
    protected _drawImpl(ctx: CanvasRenderingContext2D): void;
    protected abstract _fillStyle(ctx: CanvasRenderingContext2D, item: TData['items'][0]): CanvasRenderingContext2D['fillStyle'];
}
