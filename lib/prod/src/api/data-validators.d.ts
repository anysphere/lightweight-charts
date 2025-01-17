import { CreatePriceLineOptions } from '../model/price-line-options';
import { SeriesMarker } from '../model/series-markers';
import { SeriesType } from '../model/series-options';
import { Time } from '../model/time-data';
import { SeriesDataItemTypeMap } from './data-consumer';
export declare function checkPriceLineOptions(options: CreatePriceLineOptions): void;
export declare function checkItemsAreOrdered(data: readonly (SeriesMarker<Time> | SeriesDataItemTypeMap[SeriesType])[], allowDuplicates?: boolean): void;
export declare function checkSeriesValuesType(type: SeriesType, data: readonly SeriesDataItemTypeMap[SeriesType][]): void;
