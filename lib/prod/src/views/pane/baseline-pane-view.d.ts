import { BarPrice } from '../../model/bar';
import { ChartModel } from '../../model/chart-model';
import { Series } from '../../model/series';
import { SeriesBarColorer } from '../../model/series-bar-colorer';
import { TimePointIndex } from '../../model/time-data';
import { BaselineFillItem } from '../../renderers/baseline-renderer-area';
import { BaselineStrokeItem } from '../../renderers/baseline-renderer-line';
import { CompositeRenderer } from '../../renderers/composite-renderer';
import { LinePaneViewBase } from './line-pane-view-base';
export declare class SeriesBaselinePaneView extends LinePaneViewBase<'Baseline', BaselineFillItem & BaselineStrokeItem, CompositeRenderer> {
    protected readonly _renderer: CompositeRenderer;
    private readonly _baselineAreaRenderer;
    private readonly _baselineLineRenderer;
    constructor(series: Series<'Baseline'>, model: ChartModel);
    protected _createRawItem(time: TimePointIndex, price: BarPrice, colorer: SeriesBarColorer<'Baseline'>): BaselineFillItem & BaselineStrokeItem;
    protected _prepareRendererData(width: number, height: number): void;
}
