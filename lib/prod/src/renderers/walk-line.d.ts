import { SeriesItemsIndexesRange } from '../model/time-data';
import { LinePoint, LineType } from './draw-line';
export declare function walkLine<TItem extends LinePoint, TStyle>(ctx: CanvasRenderingContext2D, items: readonly TItem[], lineType: LineType, visibleRange: SeriesItemsIndexesRange, barWidth: number, styleGetter: (ctx: CanvasRenderingContext2D, item: TItem) => TStyle, finishStyledArea: (ctx: CanvasRenderingContext2D, style: TStyle, areaFirstItem: LinePoint, newAreaFirstItem: LinePoint) => void): void;
/**
 * @returns Two control points that can be used as arguments to {@link CanvasRenderingContext2D.bezierCurveTo} to draw a curved line between `points[fromPointIndex]` and `points[toPointIndex]`.
 */
export declare function getControlPoints(points: readonly LinePoint[], fromPointIndex: number, toPointIndex: number): [LinePoint, LinePoint];
