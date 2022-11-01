/// <reference types="_global-types" />
import { PlotRow } from '../model/plot-data';
import { SeriesPlotRow } from '../model/series-data';
import { SeriesType } from '../model/series-options';
import { OriginalTime, TimePoint, TimePointIndex } from '../model/time-data';
import { SeriesDataItemTypeMap } from './data-consumer';
export declare type WhitespacePlotRow = Omit<PlotRow, 'value'>;
export declare function isSeriesPlotRow(row: SeriesPlotRow | WhitespacePlotRow): row is SeriesPlotRow;
declare type SeriesItemValueFnMap = {
    [T in keyof SeriesDataItemTypeMap]: (time: TimePoint, index: TimePointIndex, item: SeriesDataItemTypeMap[T], originalTime: OriginalTime) => Mutable<SeriesPlotRow<T> | WhitespacePlotRow>;
};
export declare function getSeriesPlotRowCreator<TSeriesType extends SeriesType>(seriesType: TSeriesType): SeriesItemValueFnMap[TSeriesType];
export {};
