import { clamp } from '../helpers/mathex';
import { PaneRendererLineBase } from './line-renderer-base';
export class PaneRendererBaselineLine extends PaneRendererLineBase {
    constructor() {
        super(...arguments);
        this._private__strokeCache = null;
    }
    _internal__strokeStyle(ctx, item) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const data = this._internal__data;
        const { _internal_topLineColor: topLineColor, _internal_bottomLineColor: bottomLineColor } = item;
        const { _internal_baseLevelCoordinate: baseLevelCoordinate, _internal_bottom: bottom } = data;
        if (this._private__strokeCache !== null &&
            this._private__strokeCache.topLineColor === topLineColor &&
            this._private__strokeCache.bottomLineColor === bottomLineColor &&
            this._private__strokeCache.baseLevelCoordinate === baseLevelCoordinate &&
            this._private__strokeCache.bottom === bottom) {
            return this._private__strokeCache.strokeStyle;
        }
        const strokeStyle = ctx.createLinearGradient(0, 0, 0, bottom);
        const baselinePercent = clamp(baseLevelCoordinate / bottom, 0, 1);
        strokeStyle.addColorStop(0, topLineColor);
        strokeStyle.addColorStop(baselinePercent, topLineColor);
        strokeStyle.addColorStop(baselinePercent, bottomLineColor);
        strokeStyle.addColorStop(1, bottomLineColor);
        this._private__strokeCache = {
            topLineColor,
            bottomLineColor,
            strokeStyle,
            baseLevelCoordinate,
            bottom,
        };
        return strokeStyle;
    }
}
