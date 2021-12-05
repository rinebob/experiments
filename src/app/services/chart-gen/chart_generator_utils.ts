import * as d3 from 'd3';
import * as fc from 'd3fc';

import { OHLCData } from 'src/app/common/interfaces';
import { AxisConfig, ChartPaneConfig, ChartSeriesConfig, ChartType, Series, SeriesConfig, PaneExtents } from 'src/app/common/interfaces_chart';

export function generateExtents(data: OHLCData[]) {
    const extents: PaneExtents = {xMin: 0, yMin: 0, xMax: 0, yMax: 0};

    return extents;
}

export function generateXScale(xMin: number, xMax: number) {
    const scale = {};
    return scale;
}

export function generateYScale(yMin: number, yMax: number) {
    const scale = {};
    return scale;
}

export function generateLinearYAxis(yScale) {
    const axis = {};
    return axis;
}

export function generateLogYAxis(yScale) {
    const axis = {};
    return axis;

}

export function generatePercentChangeYAxis(yScale) {
    const axis = {};
    return axis;
}

export function generateDateXAxis(xScale) {
    const axis = {};
    return axis;
}

export function generateFinanceTimeXAxis(xScale) {
    const axis = {};
    return axis;
}

export function generateLineSeries(data: OHLCData[]) {
    const series = {};
    return series;
}

export function generateCandlestickSeries(data: OHLCData[]) {
    const series = {};
    return series;
}

export function generateBarSeries(data: OHLCData[]) {
    const series = {};
    return series;
}

export function generateSMA(data: OHLCData[]) {
    const series = {};
    return series;
}

export function generateEMA(data: OHLCData[]) {
    const series = {};
    return series;
}

export function generateMACD(data: OHLCData[]) {
    const series = {};
    return series;
}

export function generateRSI(data: OHLCData[]) {
    const series = {};
    return series;
}

export function generateStochastic(data: OHLCData[]) {
    const series = {};
    return series;
}

// export function generateXAxis(extents: PaneExtents, config: AxisConfig) {

// }

// export function generateYAxis(extents: PaneExtents, config: AxisConfig) {

// }

// export function generatePriceSeries(data: OHLCData[], xScale, yScale, config: ChartSeriesConfig) {

// }

// export function generateIndicatorSeries(data: OHLCData[], xScale, yScale, config: IndicatorConfig) {

// }