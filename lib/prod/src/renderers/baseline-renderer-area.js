import { clamp } from '../helpers/mathex';
import { PaneRendererAreaBase } from './area-renderer-base';
export class PaneRendererBaselineArea extends PaneRendererAreaBase {
    constructor() {
        super(...arguments);
        this._private__fillCache = null;
    }
    _internal__fillStyle(ctx, item) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const data = this._internal__data;
        const { _internal_topFillColor1: topFillColor1, _internal_topFillColor2: topFillColor2, _internal_bottomFillColor1: bottomFillColor1, _internal_bottomFillColor2: bottomFillColor2 } = item;
        const { _internal_baseLevelCoordinate: baseLevelCoordinate, _internal_bottom: bottom } = data;
        if (this._private__fillCache !== null &&
            this._private__fillCache.topFillColor1 === topFillColor1 &&
            this._private__fillCache.topFillColor2 === topFillColor2 &&
            this._private__fillCache.bottomFillColor1 === bottomFillColor1 &&
            this._private__fillCache.bottomFillColor2 === bottomFillColor2 &&
            this._private__fillCache.baseLevelCoordinate === baseLevelCoordinate &&
            this._private__fillCache.bottom === bottom) {
            return this._private__fillCache.fillStyle;
        }
        const fillStyle = ctx.createLinearGradient(0, 0, 0, bottom);
        const baselinePercent = clamp(baseLevelCoordinate / bottom, 0, 1);
        fillStyle.addColorStop(0, topFillColor1);
        fillStyle.addColorStop(baselinePercent, topFillColor2);
        fillStyle.addColorStop(baselinePercent, bottomFillColor1);
        fillStyle.addColorStop(1, bottomFillColor2);
        this._private__fillCache = {
            topFillColor1,
            topFillColor2,
            bottomFillColor1,
            bottomFillColor2,
            fillStyle,
            baseLevelCoordinate,
            bottom,
        };
        return fillStyle;
    }
}
