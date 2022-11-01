import { setLineStyle } from './draw-line';
import { ScaledRenderer } from './scaled-renderer';
import { walkLine } from './walk-line';
function finishStyledArea(ctx, style) {
    ctx.strokeStyle = style;
    ctx.stroke();
}
export class PaneRendererLineBase extends ScaledRenderer {
    constructor() {
        super(...arguments);
        this._internal__data = null;
    }
    _internal_setData(data) {
        this._internal__data = data;
    }
    _internal__drawImpl(ctx) {
        if (this._internal__data === null) {
            return;
        }
        const { _internal_items: items, _internal_visibleRange: visibleRange, _internal_barWidth: barWidth, _internal_lineType: lineType, _internal_lineWidth: lineWidth, _internal_lineStyle: lineStyle } = this._internal__data;
        if (visibleRange === null) {
            return;
        }
        ctx.lineCap = 'butt';
        ctx.lineWidth = lineWidth;
        setLineStyle(ctx, lineStyle);
        ctx.lineJoin = 'round';
        walkLine(ctx, items, lineType, visibleRange, barWidth, this._internal__strokeStyle.bind(this), finishStyledArea);
    }
}
