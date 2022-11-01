import { PaneRendererBaselineArea } from '../../renderers/baseline-renderer-area';
import { PaneRendererBaselineLine } from '../../renderers/baseline-renderer-line';
import { CompositeRenderer } from '../../renderers/composite-renderer';
import { LinePaneViewBase } from './line-pane-view-base';
export class SeriesBaselinePaneView extends LinePaneViewBase {
    constructor(series, model) {
        super(series, model);
        this._internal__renderer = new CompositeRenderer();
        this._private__baselineAreaRenderer = new PaneRendererBaselineArea();
        this._private__baselineLineRenderer = new PaneRendererBaselineLine();
        this._internal__renderer._internal_setRenderers([this._private__baselineAreaRenderer, this._private__baselineLineRenderer]);
    }
    _internal__createRawItem(time, price, colorer) {
        return Object.assign(Object.assign({}, this._internal__createRawItemBase(time, price)), colorer._internal_barStyle(time));
    }
    _internal__prepareRendererData(width, height) {
        const firstValue = this._internal__series._internal_firstValue();
        if (firstValue === null) {
            return;
        }
        const baselineProps = this._internal__series._internal_options();
        const baseLevelCoordinate = this._internal__series._internal_priceScale()._internal_priceToCoordinate(baselineProps.baseValue.price, firstValue._internal_value);
        const barWidth = this._internal__model._internal_timeScale()._internal_barSpacing();
        this._private__baselineAreaRenderer._internal_setData({
            _internal_items: this._internal__items,
            _internal_lineWidth: baselineProps.lineWidth,
            _internal_lineStyle: baselineProps.lineStyle,
            _internal_lineType: baselineProps.lineType,
            _internal_baseLevelCoordinate: baseLevelCoordinate,
            _internal_bottom: height,
            _internal_visibleRange: this._internal__itemsVisibleRange,
            _internal_barWidth: barWidth,
        });
        this._private__baselineLineRenderer._internal_setData({
            _internal_items: this._internal__items,
            _internal_lineWidth: baselineProps.lineWidth,
            _internal_lineStyle: baselineProps.lineStyle,
            _internal_lineType: baselineProps.lineType,
            _internal_baseLevelCoordinate: baseLevelCoordinate,
            _internal_bottom: height,
            _internal_visibleRange: this._internal__itemsVisibleRange,
            _internal_barWidth: barWidth,
        });
    }
}
