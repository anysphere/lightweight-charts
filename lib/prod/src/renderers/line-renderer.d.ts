import { LineStrokeColorerStyle } from '../model/series-bar-colorer';
import { LineItemBase, PaneRendererLineBase, PaneRendererLineDataBase } from './line-renderer-base';
export declare type LineStrokeItem = LineItemBase & LineStrokeColorerStyle;
export interface PaneRendererLineData extends PaneRendererLineDataBase<LineStrokeItem> {
}
export declare class PaneRendererLine extends PaneRendererLineBase<PaneRendererLineData> {
    protected _strokeStyle(ctx: CanvasRenderingContext2D, item: LineStrokeItem): CanvasRenderingContext2D['strokeStyle'];
}
