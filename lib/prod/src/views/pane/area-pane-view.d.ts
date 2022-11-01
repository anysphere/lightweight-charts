import { BarPrice } from '../../model/bar';
import { ChartModel } from '../../model/chart-model';
import { Series } from '../../model/series';
import { SeriesBarColorer } from '../../model/series-bar-colorer';
import { TimePointIndex } from '../../model/time-data';
import { AreaFillItem } from '../../renderers/area-renderer';
import { CompositeRenderer } from '../../renderers/composite-renderer';
import { LineStrokeItem } from '../../renderers/line-renderer';
import { LinePaneViewBase } from './line-pane-view-base';
export declare class SeriesAreaPaneView extends LinePaneViewBase<'Area', AreaFillItem & LineStrokeItem, CompositeRenderer> {
    protected readonly _renderer: CompositeRenderer;
    private readonly _areaRenderer;
    private readonly _lineRenderer;
    constructor(series: Series<'Area'>, model: ChartModel);
    protected _createRawItem(time: TimePointIndex, price: BarPrice, colorer: SeriesBarColorer<'Area'>): AreaFillItem & LineStrokeItem;
    protected _prepareRendererData(width: number, height: number): void;
}
