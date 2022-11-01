import { setLineStyle } from './draw-line';
import { ScaledRenderer } from './scaled-renderer';
import { walkLine } from './walk-line';
function finishStyledArea(baseLevelCoordinate, ctx, style, areaFirstItem, newAreaFirstItem) {
    ctx.lineTo(newAreaFirstItem._internal_x, baseLevelCoordinate);
    ctx.lineTo(areaFirstItem._internal_x, baseLevelCoordinate);
    ctx.closePath();
    ctx.fillStyle = style;
    ctx.fill();
}
export class PaneRendererAreaBase extends ScaledRenderer {
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
        const { _internal_items: items, _internal_visibleRange: visibleRange, _internal_barWidth: barWidth, _internal_lineWidth: lineWidth, _internal_lineStyle: lineStyle, _internal_lineType: lineType, _internal_baseLevelCoordinate: baseLevelCoordinate } = this._internal__data;
        if (visibleRange === null) {
            return;
        }
        ctx.lineCap = 'butt';
        ctx.lineJoin = 'round';
        ctx.lineWidth = lineWidth;
        setLineStyle(ctx, lineStyle);
        // walk lines with width=1 to have more accurate gradient's filling
        ctx.lineWidth = 1;
        walkLine(ctx, items, lineType, visibleRange, barWidth, this._internal__fillStyle.bind(this), finishStyledArea.bind(null, baseLevelCoordinate));
    }
}
