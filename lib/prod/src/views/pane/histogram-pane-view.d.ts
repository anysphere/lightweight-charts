import { BarPrice } from '../../model/bar';
import { SeriesBarColorer } from '../../model/series-bar-colorer';
import { TimePointIndex } from '../../model/time-data';
import { HistogramItem, PaneRendererHistogram } from '../../renderers/histogram-renderer';
import { LinePaneViewBase } from './line-pane-view-base';
export declare class SeriesHistogramPaneView extends LinePaneViewBase<'Histogram', HistogramItem, PaneRendererHistogram> {
    protected readonly _renderer: PaneRendererHistogram;
    protected _createRawItem(time: TimePointIndex, price: BarPrice, colorer: SeriesBarColorer<'Histogram'>): HistogramItem;
    protected _prepareRendererData(): void;
}
