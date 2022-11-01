import { PaneRendererLineBase } from './line-renderer-base';
export class PaneRendererLine extends PaneRendererLineBase {
    _internal__strokeStyle(ctx, item) {
        return item._internal_lineColor;
    }
}
