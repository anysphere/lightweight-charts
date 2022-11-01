import { ChartModel } from '../../model/chart-model';
import { PriceScale } from '../../model/price-scale';
import { Series } from '../../model/series';
import { SeriesType } from '../../model/series-options';
import { SeriesItemsIndexesRange, TimedValue } from '../../model/time-data';
import { TimeScale } from '../../model/time-scale';
import { IPaneRenderer } from '../../renderers/ipane-renderer';
import { IUpdatablePaneView, UpdateType } from './iupdatable-pane-view';
export declare abstract class SeriesPaneViewBase<TSeriesType extends SeriesType, ItemType extends TimedValue, TRenderer extends IPaneRenderer> implements IUpdatablePaneView {
    protected readonly _series: Series<TSeriesType>;
    protected readonly _model: ChartModel;
    protected _invalidated: boolean;
    protected _dataInvalidated: boolean;
    protected _optionsInvalidated: boolean;
    protected _items: ItemType[];
    protected _itemsVisibleRange: SeriesItemsIndexesRange | null;
    protected readonly abstract _renderer: TRenderer;
    private readonly _extendedVisibleRange;
    constructor(series: Series<TSeriesType>, model: ChartModel, extendedVisibleRange: boolean);
    update(updateType?: UpdateType): void;
    renderer(height: number, width: number): IPaneRenderer | null;
    protected abstract _fillRawPoints(): void;
    protected _updateOptions(): void;
    protected abstract _convertToCoordinates(priceScale: PriceScale, timeScale: TimeScale, firstValue: number): void;
    protected _clearVisibleRange(): void;
    protected abstract _prepareRendererData(width: number, height: number): void;
    private _makeValid;
    private _makeValidImpl;
}
