import { assert } from '../helpers/assertions';

import { CreatePriceLineOptions } from '../model/price-line-options';
import { SeriesMarker } from '../model/series-markers';
import { SeriesType } from '../model/series-options';
import { Time } from '../model/time-data';

import { isFulfilledData, SeriesDataItemTypeMap } from './data-consumer';
import { convertTime } from './data-layer';

export function checkPriceLineOptions(options: CreatePriceLineOptions): void {
	if (process.env.LIGHTWEIGHT_CHARTS_NODE_ENV === "production") {
		return;
	}

	// eslint-disable-next-line @typescript-eslint/tslint/config
	assert(
		typeof options.price === "number",
		`the type of 'price' price line's property must be a number, got '${typeof options.price}'`
	);
}

export function checkItemsAreOrdered(
	data: readonly (SeriesMarker<Time> | SeriesDataItemTypeMap[SeriesType])[],
	allowDuplicates: boolean = false
): void {
	if (process.env.LIGHTWEIGHT_CHARTS_NODE_ENV === "production") {
		return;
	}

	if (data.length === 0) {
		return;
	}

	let prevTime = convertTime(data[0].time).timestamp;
	for (let i = 1; i < data.length; ++i) {
		const currentTime = convertTime(data[i].time).timestamp;
		const checkResult = allowDuplicates
			? prevTime <= currentTime
			: prevTime < currentTime;
		assert(
			checkResult,
			`data must be asc ordered by time, index=${i}, time=${currentTime}, prev time=${prevTime}`
		);
		prevTime = currentTime;
	}
}

export function checkSeriesValuesType(
	type: SeriesType,
	data: readonly SeriesDataItemTypeMap[SeriesType][]
): void {
	if (process.env.LIGHTWEIGHT_CHARTS_NODE_ENV === "production") {
		return;
	}

	data.forEach(getChecker(type));
}

type Checker = (item: SeriesDataItemTypeMap[SeriesType]) => void;

function getChecker(type: SeriesType): Checker {
	switch (type) {
		case "Bar":
		case "Candlestick":
			return checkBarItem.bind(null, type);

		case "Area":
		case "Baseline":
		case "Line":
		case "Histogram":
			return checkLineItem.bind(null, type);
	}
}

function checkBarItem(
	type: "Bar" | "Candlestick",
	barItem: SeriesDataItemTypeMap[typeof type]
): void {
	if (!isFulfilledData(barItem)) {
		return;
	}
}

function checkLineItem(
	type: "Area" | "Baseline" | "Line" | "Histogram",
	lineItem: SeriesDataItemTypeMap[typeof type]
): void {
	if (!isFulfilledData(lineItem)) {
		return;
	}
}
