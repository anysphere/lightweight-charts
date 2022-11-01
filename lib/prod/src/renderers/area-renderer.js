import { PaneRendererAreaBase } from './area-renderer-base';
export class PaneRendererArea extends PaneRendererAreaBase {
    constructor() {
        super(...arguments);
        this._private__fillCache = null;
    }
    _internal__fillStyle(ctx, item) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const data = this._internal__data;
        const { _internal_topColor: topColor, _internal_bottomColor: bottomColor } = item;
        const bottom = data._internal_bottom;
        if (this._private__fillCache !== null &&
            this._private__fillCache.topColor === topColor &&
            this._private__fillCache.bottomColor === bottomColor &&
            this._private__fillCache.bottom === bottom) {
            return this._private__fillCache.fillStyle;
        }
        const fillStyle = ctx.createLinearGradient(0, 0, 0, bottom);
        fillStyle.addColorStop(0, topColor);
        fillStyle.addColorStop(1, bottomColor);
        this._private__fillCache = { topColor, bottomColor, fillStyle, bottom };
        return fillStyle;
    }
}
