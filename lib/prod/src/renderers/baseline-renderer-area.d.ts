import { BaselineFillColorerStyle } from '../model/series-bar-colorer';
import { AreaFillItemBase, PaneRendererAreaBase, PaneRendererAreaDataBase } from './area-renderer-base';
export declare type BaselineFillItem = AreaFillItemBase & BaselineFillColorerStyle;
export interface PaneRendererBaselineData extends PaneRendererAreaDataBase<BaselineFillItem> {
}
export declare class PaneRendererBaselineArea extends PaneRendererAreaBase<PaneRendererBaselineData> {
    private _fillCache;
    protected _fillStyle(ctx: CanvasRenderingContext2D, item: BaselineFillItem): CanvasRenderingContext2D['fillStyle'];
}