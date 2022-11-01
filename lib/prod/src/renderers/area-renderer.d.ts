import { AreaFillColorerStyle } from '../model/series-bar-colorer';
import { AreaFillItemBase, PaneRendererAreaBase, PaneRendererAreaDataBase } from './area-renderer-base';
export declare type AreaFillItem = AreaFillItemBase & AreaFillColorerStyle;
export interface PaneRendererAreaData extends PaneRendererAreaDataBase<AreaFillItem> {
}
export declare class PaneRendererArea extends PaneRendererAreaBase<PaneRendererAreaData> {
    private _fillCache;
    protected _fillStyle(ctx: CanvasRenderingContext2D, item: AreaFillItem): CanvasRenderingContext2D['fillStyle'];
}
