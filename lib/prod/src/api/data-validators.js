import { assert } from '../helpers/assertions';
import { isFulfilledData } from './data-consumer';
import { convertTime } from './data-layer';
export function checkPriceLineOptions(options) {
    if (process.env.LIGHTWEIGHT_CHARTS_NODE_ENV === "production") {
        return;
    }
    // eslint-disable-next-line @typescript-eslint/tslint/config
    assert(typeof options.price === "number", `the type of 'price' price line's property must be a number, got '${typeof options.price}'`);
}
export function checkItemsAreOrdered(data, allowDuplicates = false) {
    if (process.env.LIGHTWEIGHT_CHARTS_NODE_ENV === "production") {
        return;
    }
    if (data.length === 0) {
        return;
    }
    let prevTime = convertTime(data[0].time)._internal_timestamp;
    for (let i = 1; i < data.length; ++i) {
        const currentTime = convertTime(data[i].time)._internal_timestamp;
        const checkResult = allowDuplicates
            ? prevTime <= currentTime
            : prevTime < currentTime;
        assert(checkResult, `data must be asc ordered by time, index=${i}, time=${currentTime}, prev time=${prevTime}`);
        prevTime = currentTime;
    }
}
export function checkSeriesValuesType(type, data) {
    if (process.env.LIGHTWEIGHT_CHARTS_NODE_ENV === "production") {
        return;
    }
    data.forEach(getChecker(type));
}
function getChecker(type) {
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
function checkBarItem(type, barItem) {
    if (!isFulfilledData(barItem)) {
        return;
    }
}
function checkLineItem(type, lineItem) {
    if (!isFulfilledData(lineItem)) {
        return;
    }
}
