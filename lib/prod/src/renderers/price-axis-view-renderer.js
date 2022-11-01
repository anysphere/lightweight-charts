import { drawRoundRectWithInnerBorder, drawScaled } from '../helpers/canvas-helpers';
export class PriceAxisViewRenderer {
    constructor(data, commonData) {
        this._internal_setData(data, commonData);
    }
    _internal_setData(data, commonData) {
        this._private__data = data;
        this._private__commonData = commonData;
    }
    _internal_draw(ctx, rendererOptions, textWidthCache, width, align, pixelRatio) {
        if (!this._private__data._internal_visible) {
            return;
        }
        ctx.font = rendererOptions._internal_font;
        const geometry = this._private__calculateGeometry(ctx, rendererOptions, textWidthCache, width, align, pixelRatio);
        const textColor = this._private__data._internal_color || this._private__commonData._internal_color;
        const backgroundColor = (this._private__commonData._internal_background);
        ctx.fillStyle = this._private__commonData._internal_background;
        if (this._private__data._internal_text) {
            const drawLabelBody = (labelBackgroundColor, labelBorderColor) => {
                if (geometry._internal_alignRight) {
                    drawRoundRectWithInnerBorder(ctx, geometry._internal_xOutside, geometry._internal_yTop, geometry._internal_totalWidthScaled, geometry._internal_totalHeightScaled, labelBackgroundColor, geometry._internal_horzBorderScaled, [geometry._internal_radius, 0, 0, geometry._internal_radius], labelBorderColor);
                }
                else {
                    drawRoundRectWithInnerBorder(ctx, geometry._internal_xInside, geometry._internal_yTop, geometry._internal_totalWidthScaled, geometry._internal_totalHeightScaled, labelBackgroundColor, geometry._internal_horzBorderScaled, [0, geometry._internal_radius, geometry._internal_radius, 0], labelBorderColor);
                }
            };
            // draw border
            // draw label background
            drawLabelBody(backgroundColor, 'transparent');
            // draw tick
            if (this._private__data._internal_tickVisible) {
                ctx.fillStyle = textColor;
                ctx.fillRect(geometry._internal_xInside, geometry._internal_yMid, geometry._internal_xTick - geometry._internal_xInside, geometry._internal_tickHeight);
            }
            // draw label border above the tick
            drawLabelBody('transparent', backgroundColor);
            // draw separator
            if (this._private__data._internal_borderVisible) {
                ctx.fillStyle = rendererOptions._internal_paneBackgroundColor;
                ctx.fillRect(geometry._internal_alignRight ? geometry._internal_rightScaled - geometry._internal_horzBorderScaled : 0, geometry._internal_yTop, geometry._internal_horzBorderScaled, geometry._internal_yBottom - geometry._internal_yTop);
            }
            ctx.save();
            ctx.translate(geometry._internal_xText, (geometry._internal_yTop + geometry._internal_yBottom) / 2 + geometry._internal_textMidCorrection);
            drawScaled(ctx, pixelRatio, () => {
                ctx.fillStyle = textColor;
                ctx.fillText(this._private__data._internal_text, 0, 0);
            });
            ctx.restore();
        }
    }
    _internal_height(rendererOptions, useSecondLine) {
        if (!this._private__data._internal_visible) {
            return 0;
        }
        return rendererOptions._internal_fontSize + rendererOptions._internal_paddingTop + rendererOptions._internal_paddingBottom;
    }
    _private__calculateGeometry(ctx, rendererOptions, textWidthCache, width, align, pixelRatio) {
        const tickSize = (this._private__data._internal_tickVisible || !this._private__data._internal_moveTextToInvisibleTick) ? rendererOptions._internal_tickLength : 0;
        const horzBorder = rendererOptions._internal_borderSize;
        const paddingTop = rendererOptions._internal_paddingTop + this._private__commonData._internal_additionalPaddingTop;
        const paddingBottom = rendererOptions._internal_paddingBottom + this._private__commonData._internal_additionalPaddingBottom;
        const paddingInner = rendererOptions._internal_paddingInner;
        const paddingOuter = rendererOptions._internal_paddingOuter;
        const text = this._private__data._internal_text;
        const actualTextHeight = rendererOptions._internal_fontSize;
        const textMidCorrection = textWidthCache._internal_yMidCorrection(ctx, text) * pixelRatio;
        const textWidth = Math.ceil(textWidthCache._internal_measureText(ctx, text));
        const totalHeight = actualTextHeight + paddingTop + paddingBottom;
        const totalWidth = horzBorder + paddingInner + paddingOuter + textWidth + tickSize;
        const tickHeight = Math.max(1, Math.floor(pixelRatio));
        let totalHeightScaled = Math.round(totalHeight * pixelRatio);
        if (totalHeightScaled % 2 !== tickHeight % 2) {
            totalHeightScaled += 1;
        }
        const horzBorderScaled = this._private__data._internal_separatorVisible ? Math.max(1, Math.floor(horzBorder * pixelRatio)) : 0;
        const totalWidthScaled = Math.round(totalWidth * pixelRatio);
        // tick overlaps scale border
        const tickSizeScaled = Math.round(tickSize * pixelRatio);
        const widthScaled = Math.ceil(width * pixelRatio);
        const paddingInnerScaled = Math.ceil(paddingInner * pixelRatio);
        let yMid = this._private__commonData._internal_coordinate;
        if (this._private__commonData._internal_fixedCoordinate) {
            yMid = this._private__commonData._internal_fixedCoordinate;
        }
        yMid = Math.round(yMid * pixelRatio) - Math.floor(pixelRatio * 0.5);
        const yTop = Math.floor(yMid + tickHeight / 2 - totalHeightScaled / 2);
        const yBottom = yTop + totalHeightScaled;
        const alignRight = align === 'right';
        const xInside = alignRight ? widthScaled - horzBorderScaled : horzBorderScaled;
        const rightScaled = widthScaled;
        let xOutside = xInside;
        let xTick;
        let xText;
        const radius = 2 * pixelRatio;
        ctx.textAlign = alignRight ? 'right' : 'left';
        ctx.textBaseline = 'middle';
        if (alignRight) {
            // 2               1
            //
            //              6  5
            //
            // 3               4
            xOutside = xInside - totalWidthScaled;
            xTick = xInside - tickSizeScaled;
            xText = xInside - tickSizeScaled - paddingInnerScaled - 1;
        }
        else {
            // 1               2
            //
            // 6  5
            //
            // 4               3
            xOutside = xInside + totalWidthScaled;
            xTick = xInside + tickSizeScaled;
            xText = xInside + tickSizeScaled + paddingInnerScaled;
        }
        return {
            _internal_alignRight: alignRight,
            _internal_yTop: yTop,
            _internal_yMid: yMid,
            _internal_yBottom: yBottom,
            _internal_totalWidthScaled: totalWidthScaled,
            _internal_totalHeightScaled: totalHeightScaled,
            _internal_radius: radius,
            _internal_horzBorderScaled: horzBorderScaled,
            _internal_xOutside: xOutside,
            _internal_xInside: xInside,
            _internal_xTick: xTick,
            _internal_xText: xText,
            _internal_tickHeight: tickHeight,
            _internal_rightScaled: rightScaled,
            _internal_textMidCorrection: textMidCorrection,
        };
    }
}
