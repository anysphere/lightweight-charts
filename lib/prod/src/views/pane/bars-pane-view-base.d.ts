import { ChartModel } from '../../model/chart-model';
import { PriceScale } from '../../model/price-scale';
import { Series } from '../../model/series';
import { SeriesBarColorer } from '../../model/series-bar-colorer';
import { SeriesPlotRow } from '../../model/series-data';
import { TimePointIndex } from '../../model/time-data';
import { TimeScale } from '../../model/time-scale';
import { BarCandlestickItemBase } from '../../renderers/bars-renderer';
import { IPaneRenderer } from '../../renderers/ipane-renderer';
import { SeriesPaneViewBase } from './series-pane-view-base';
export declare abstract class BarsPaneViewBase<TSeriesType extends 'Bar' | 'Candlestick', ItemType extends BarCandlestickItemBase, TRenderer extends IPaneRenderer> extends SeriesPaneViewBase<TSeriesType, ItemType, TRenderer> {
    constructor(series: Series<TSeriesType>, model: ChartModel);
    protected _convertToCoordinates(priceScale: PriceScale, timeScale: TimeScale, firstValue: number): void;
    protected abstract _createRawItem(time: TimePointIndex, bar: SeriesPlotRow, colorer: SeriesBarColorer<TSeriesType>): ItemType;
    protected _createDefaultItem(time: TimePointIndex, bar: SeriesPlotRow, colorer: SeriesBarColorer<TSeriesType>): BarCandlestickItemBase;
    protected _fillRawPoints(): void;
}
