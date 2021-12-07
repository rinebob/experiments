import * as d3 from 'd3';
import * as fc from 'd3fc';

import { OHLCData } from 'src/app/common/interfaces';
import { AxisConfig, ChartPaneConfig, ChartSeriesConfig, ChartType, Series, PaneExtents } from 'src/app/common/interfaces_chart';

export function generateExtents(data: OHLCData[]) {
    console.log('cGSU gE input data[0]: ', data[0]);
    // const extents: PaneExtents = {xMin: 0, yMin: 0, xMax: 0, yMax: 0};

    const xMin = Math.floor(d3.min(data, d => d['date']));
    const xMax = Math.ceil(d3.max(data, d => d['date']));
    let yMin = d3.min(data, d => d['low']);
    let yMax = d3.max(data, d => d['high']);
    
    // ===== DO NOT DELETE ========
    // ===== vertical expand/contract code  ========
    // const center = yMax - ((yMax - yMin) / 2);
    // const height = yMax - yMin;
    // const newHeight = height * this.verticalScaleFactor;
    // yMin = Math.ceil(center - newHeight / 2);
    // yMax = Math.ceil(center + newHeight / 2);
    // ===== DO NOT DELETE ========
    
    // console.log('bC gE post adjust yMax, yMin: ', yMax, yMin);
    const extents = {xMax, xMin, yMax, yMin}

    return {...extents};

    // return extents;
}

export function generateXScale(xMin: number, xMax: number) {
    console.log('cGSU gXS input x min/max ', xMin, xMax);
    const scale = {};
    return scale;
//     const xScale = d3
//     .scaleTime()
//     .domain([xMin, xMax])
//     .range([0, this.containerDimsBS.value.width - this.margin.left - this.margin.right]);

//   return xScale;
}

export function generateYScale(yMin: number, yMax: number) {
    console.log('cGSU gYS input y min/max ', yMin, yMax);
    const scale = {};
    return scale;
}

export function generateLinearYAxis(yScale) {
    console.log('cGSU gLiYA input yScale', yScale);
    const axis = {};
    return axis;
}

export function generateLogYAxis(yScale) {
    console.log('cGSU gLgYA input yScale', yScale);
    const axis = {};
    return axis;

}

export function generatePercentChangeYAxis(yScale) {
    console.log('cGSU gPCCYA input yScale', yScale);
    const axis = {};
    return axis;
}

export function generateDateXAxis(xScale) {
    console.log('cGSU gDA input xScale', xScale);
    const axis = {};
    return axis;
}

export function generateFinanceTimeXAxis(xScale) {
    console.log('cGSU gFTA input xScale', xScale);
    const axis = {};
    return axis;
}

export function generateLineSeries(data: OHLCData[]) {
    console.log('cGSU gLS input data[0]', data[0]);
    const series = {};
    return series;
}

export function generateCandlestickSeries(data: OHLCData[]) {
    console.log('cGSU gCS input data[0]', data[0]);
    const series = {};
    return series;
}

export function generateBarSeries(data: OHLCData[]) {
    console.log('cGSU gBS input data[0]', data[0]);
    const series = {};
    return series;
}

export function generateSMA(data: OHLCData[]) {
    console.log('cGSU gSMA input data[0]', data[0]);
    const series = {};
    return series;
}

export function generateEMA(data: OHLCData[]) {
    console.log('cGSU gEMA input data[0]', data[0]);
    const series = {};
    return series;
}

export function generateMACD(data: OHLCData[]) {
    console.log('cGSU gMACD input data[0]', data[0]);
    const series = {};
    return series;
}

export function generateRSI(data: OHLCData[]) {
    console.log('cGSU gRSI input data[0]', data[0]);
    const series = {};
    return series;
}

export function generateStochastic(data: OHLCData[]) {
    console.log('cGSU gS input data[0]', data[0]);
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