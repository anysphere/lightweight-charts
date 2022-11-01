import { Coordinate } from '../model/coordinate';
import { BaselineStrokeColorerStyle } from '../model/series-bar-colorer';
import { LineItemBase as LineStrokeItemBase, PaneRendererLineBase, PaneRendererLineDataBase } from './line-renderer-base';
export declare type BaselineStrokeItem = LineStrokeItemBase & BaselineStrokeColorerStyle;
export interface PaneRendererBaselineLineData extends PaneRendererLineDataBase<BaselineStrokeItem> {
    baseLevelCoordinate: Coordinate;
    bottom: Coordinate;
}
export declare class PaneRendererBaselineLine extends PaneRendererLineBase<PaneRendererBaselineLineData> {
    private _strokeCache;
    protected _strokeStyle(ctx: CanvasRenderingContext2D, item: BaselineStrokeItem): CanvasRenderingContext2D['strokeStyle'];
}
