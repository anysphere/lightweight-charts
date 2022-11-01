import { ensureNotNull } from '../helpers/assertions';
import { drawScaled } from '../helpers/canvas-helpers';
const optimizationReplacementRe = /[1-9]/g;
const radius = 2;
export class TimeAxisViewRenderer {
    constructor() {
        this._private__data = null;
    }
    _internal_setData(data) {
        this._private__data = data;
    }
    _internal_draw(ctx, rendererOptions, pixelRatio) {
        if (this._private__data === null || this._private__data._internal_visible === false || this._private__data._internal_text.length === 0) {
            return;
        }
        ctx.font = rendererOptions._internal_font;
        const textWidth = Math.round(rendererOptions._internal_widthCache._internal_measureText(ctx, this._private__data._internal_text, optimizationReplacementRe));
        if (textWidth <= 0) {
            return;
        }
        ctx.save();
        const horzMargin = rendererOptions._internal_paddingHorizontal;
        const labelWidth = textWidth + 2 * horzMargin;
        const labelWidthHalf = labelWidth / 2;
        const timeScaleWidth = this._private__data._internal_width;
        let coordinate = this._private__data._internal_coordinate;
        let x1 = Math.floor(coordinate - labelWidthHalf) + 0.5;
        if (x1 < 0) {
            coordinate = coordinate + Math.abs(0 - x1);
            x1 = Math.floor(coordinate - labelWidthHalf) + 0.5;
        }
        else if (x1 + labelWidth > timeScaleWidth) {
            coordinate = coordinate - Math.abs(timeScaleWidth - (x1 + labelWidth));
            x1 = Math.floor(coordinate - labelWidthHalf) + 0.5;
        }
        const x2 = x1 + labelWidth;
        const y1 = 0;
        const y2 = Math.ceil(y1 +
            rendererOptions._internal_borderSize +
            rendererOptions._internal_tickLength +
            rendererOptions._internal_paddingTop +
            rendererOptions._internal_fontSize +
            rendererOptions._internal_paddingBottom);
        ctx.fillStyle = this._private__data._internal_background;
        const x1scaled = Math.round(x1 * pixelRatio);
        const y1scaled = Math.round(y1 * pixelRatio);
        const x2scaled = Math.round(x2 * pixelRatio);
        const y2scaled = Math.round(y2 * pixelRatio);
        const radiusScaled = Math.round(radius * pixelRatio);
        ctx.beginPath();
        ctx.moveTo(x1scaled, y1scaled);
        ctx.lineTo(x1scaled, y2scaled - radiusScaled);
        ctx.arcTo(x1scaled, y2scaled, x1scaled + radiusScaled, y2scaled, radiusScaled);
        ctx.lineTo(x2scaled - radiusScaled, y2scaled);
        ctx.arcTo(x2scaled, y2scaled, x2scaled, y2scaled - radiusScaled, radiusScaled);
        ctx.lineTo(x2scaled, y1scaled);
        ctx.fill();
        if (this._private__data._internal_tickVisible) {
            const tickX = Math.round(this._private__data._internal_coordinate * pixelRatio);
            const tickTop = y1scaled;
            const tickBottom = Math.round((tickTop + rendererOptions._internal_tickLength) * pixelRatio);
            ctx.fillStyle = this._private__data._internal_color;
            const tickWidth = Math.max(1, Math.floor(pixelRatio));
            const tickOffset = Math.floor(pixelRatio * 0.5);
            ctx.fillRect(tickX - tickOffset, tickTop, tickWidth, tickBottom - tickTop);
        }
        const yText = y1 +
            rendererOptions._internal_borderSize +
            rendererOptions._internal_tickLength +
            rendererOptions._internal_paddingTop +
            rendererOptions._internal_fontSize / 2;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = this._private__data._internal_color;
        const textYCorrection = rendererOptions._internal_widthCache._internal_yMidCorrection(ctx, 'Apr0');
        ctx.translate((x1 + horzMargin) * pixelRatio, (yText + textYCorrection) * pixelRatio);
        drawScaled(ctx, pixelRatio, () => ctx.fillText(ensureNotNull(this._private__data)._internal_text, 0, 0));
        ctx.restore();
    }
}
