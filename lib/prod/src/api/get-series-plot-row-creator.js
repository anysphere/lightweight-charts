import { isWhitespaceData } from './data-consumer';
function getColoredLineBasedSeriesPlotRow(time, index, item, originalTime) {
    const val = item.value;
    const res = { _internal_index: index, _internal_time: time, _internal_value: [val, val, val, val], _internal_originalTime: originalTime };
    if (item.color !== undefined) {
        res._internal_color = item.color;
    }
    return res;
}
function getAreaSeriesPlotRow(time, index, item, originalTime) {
    const val = item.value;
    const res = { _internal_index: index, _internal_time: time, _internal_value: [val, val, val, val], _internal_originalTime: originalTime };
    if (item.lineColor !== undefined) {
        res._internal_lineColor = item.lineColor;
    }
    if (item.topColor !== undefined) {
        res._internal_topColor = item.topColor;
    }
    if (item.bottomColor !== undefined) {
        res._internal_bottomColor = item.bottomColor;
    }
    return res;
}
function getBaselineSeriesPlotRow(time, index, item, originalTime) {
    const val = item.value;
    const res = { _internal_index: index, _internal_time: time, _internal_value: [val, val, val, val], _internal_originalTime: originalTime };
    if (item.topLineColor !== undefined) {
        res._internal_topLineColor = item.topLineColor;
    }
    if (item.bottomLineColor !== undefined) {
        res._internal_bottomLineColor = item.bottomLineColor;
    }
    if (item.topFillColor1 !== undefined) {
        res._internal_topFillColor1 = item.topFillColor1;
    }
    if (item.topFillColor2 !== undefined) {
        res._internal_topFillColor2 = item.topFillColor2;
    }
    if (item.bottomFillColor1 !== undefined) {
        res._internal_bottomFillColor1 = item.bottomFillColor1;
    }
    if (item.bottomFillColor2 !== undefined) {
        res._internal_bottomFillColor2 = item.bottomFillColor2;
    }
    return res;
}
function getBarSeriesPlotRow(time, index, item, originalTime) {
    const res = { _internal_index: index, _internal_time: time, _internal_value: [item.open, item.high, item.low, item.close], _internal_originalTime: originalTime };
    if (item.color !== undefined) {
        res._internal_color = item.color;
    }
    return res;
}
function getCandlestickSeriesPlotRow(time, index, item, originalTime) {
    const res = { _internal_index: index, _internal_time: time, _internal_value: [item.open, item.high, item.low, item.close], _internal_originalTime: originalTime };
    if (item.color !== undefined) {
        res._internal_color = item.color;
    }
    if (item.borderColor !== undefined) {
        res._internal_borderColor = item.borderColor;
    }
    if (item.wickColor !== undefined) {
        res._internal_wickColor = item.wickColor;
    }
    return res;
}
export function isSeriesPlotRow(row) {
    return row._internal_value !== undefined;
}
function wrapWhitespaceData(createPlotRowFn) {
    return (time, index, bar, originalTime) => {
        if (isWhitespaceData(bar)) {
            return { _internal_time: time, _internal_index: index, _internal_originalTime: originalTime };
        }
        return createPlotRowFn(time, index, bar, originalTime);
    };
}
const seriesPlotRowFnMap = {
    Candlestick: wrapWhitespaceData(getCandlestickSeriesPlotRow),
    Bar: wrapWhitespaceData(getBarSeriesPlotRow),
    Area: wrapWhitespaceData(getAreaSeriesPlotRow),
    Baseline: wrapWhitespaceData(getBaselineSeriesPlotRow),
    Histogram: wrapWhitespaceData(getColoredLineBasedSeriesPlotRow),
    Line: wrapWhitespaceData(getColoredLineBasedSeriesPlotRow),
};
export function getSeriesPlotRowCreator(seriesType) {
    return seriesPlotRowFnMap[seriesType];
}
