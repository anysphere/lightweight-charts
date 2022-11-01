import { BarPrice } from '../../model/bar';
import { ChartModel } from '../../model/chart-model';
import { PricedValue, PriceScale } from '../../model/price-scale';
import { Series } from '../../model/series';
import { SeriesBarColorer } from '../../model/series-bar-colorer';
import { TimedValue, TimePointIndex } from '../../model/time-data';
import { TimeScale } from '../../model/time-scale';
import { IPaneRenderer } from '../../renderers/ipane-renderer';
import { SeriesPaneViewBase } from './series-pane-view-base';
export declare abstract class LinePaneViewBase<TSeriesType extends 'Line' | 'Area' | 'Baseline' | 'Histogram', ItemType extends PricedValue & TimedValue, TRenderer extends IPaneRenderer> extends SeriesPaneViewBase<TSeriesType, ItemType, TRenderer> {
    constructor(series: Series<TSeriesType>, model: ChartModel);
    protected _convertToCoordinates(priceScale: PriceScale, timeScale: TimeScale, firstValue: number): void;
    protected abstract _createRawItem(time: TimePointIndex, price: BarPrice, colorer: SeriesBarColorer<TSeriesType>): ItemType;
    protected _createRawItemBase(time: TimePointIndex, price: BarPrice): PricedValue & TimedValue;
    protected _fillRawPoints(): void;
}
