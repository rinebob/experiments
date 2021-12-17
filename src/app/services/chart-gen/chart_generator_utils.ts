import * as d3 from 'd3';
import * as fc from 'd3fc';

import { OHLCData } from 'src/app/common/interfaces';
import { AxisConfig, ChartPaneConfig, ChartSeriesConfig, ChartType, DomRectCoordinates, Series, PaneExtents, ScaleType, TranslationCoord, ScaleLocation, PaneLayout } from 'src/app/common/interfaces_chart';

export function generateExtents(data: OHLCData[]) {
    // console.log('cGSU gE input data[0]: ', data[0]);
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

export function generateXScale(xMin: number, xMax: number, width: number) {
    // console.log('cGSU gXS input x min/max/w ', xMin, xMax, width);
    const xScale = d3
    .scaleTime()
    .domain([xMin, xMax])
    .range([0, width]);
    
    // console.log('cGSU gXS final xScale: ', xScale);
    return xScale;
}

export function generateLinearYScale(yMin: number, yMax: number, height: number) {
    // console.log('cGSU gLinYS input y min/max/h ', yMin, yMax, height);
    const yScale = d3
        .scaleLinear()
        .domain([yMin, yMax])
        .range([height, 0]);

        // console.log('cGSU gLinYS final yScale: ', yScale);
        return yScale;

}

export function generateLogYScale(yMin: number, yMax: number, height: number) {
    // console.log('cGSU gLogYS input y min/max/h ', yMin, yMax, height);
    const yScale = d3
        .scaleLog()
        .domain([yMin, yMax])
        .range([height, 0]);

    // console.log('cGSU gLogYS final yScale: ', yScale);
    return yScale;



}

export function generateYAxis(yScale, layout: PaneLayout, seriesType: string, paneNumber: number, location: ScaleLocation) {
    // console.log('cGSU gYA input yScale/origin/seriesType/paneNumber/location', yScale, layout, seriesType, paneNumber, location);

    const axis = location === ScaleLocation.LEFT ? d3.axisLeft(yScale) : d3.axisRight(yScale);
    const origin = location === ScaleLocation.LEFT ? layout.leftAxisOrigin : layout.rightAxisOrigin;

    const yAxis = d3.create('svg:g')
        .attr('id', `${seriesType}-yAxis-${paneNumber}`)
        .attr('transform', `translate(${origin.right}, ${origin.down})`)
        .call(axis);

    return yAxis;



}

export function generateDateXAxis(xScale, layout: PaneLayout, seriesType: Series, paneNumber: number, location: ScaleLocation) {
    // console.log('cGSU gDXA input xScale/origin/seriesType/paneNumber/location', xScale, layout, seriesType, paneNumber, location);

    const axis = location === ScaleLocation.TOP ? d3.axisTop(xScale) : d3.axisBottom(xScale);
    const origin = location === ScaleLocation.TOP ? layout.topAxisOrigin : layout.bottomAxisOrigin;
    // console.log('cGU gDXA origin: ', origin);

    const dateXAxis = d3.create('svg:g')
        .attr('id', `${seriesType}-xAxis-${paneNumber}`)
        .attr('transform', `translate(${origin.right}, ${origin.down})`)
        .call(axis);

    return dateXAxis;
    
}

export function generateFinanceTimeXAxis(xScale, origin: TranslationCoord) {
    // console.log('cGSU gFTA input xScale', xScale);
    const axis = {};
    return axis;
}

// line series needs extents, xScale and yScale
// get those here based on data
// generateXScale(xMin: number, xMax: number, width: number)
// xScale, yScale, series, paneNumber
export function generateLineSeries(data: OHLCData[], xScale, yScale, series:Series, paneNumber: number, origin: TranslationCoord) {
    console.log('cGSU gLS input x/yScale/series/paneNumber', yScale, series, paneNumber);
    console.table(data.slice(0,10));

         
    // dataDisplay = d3
    // .line()
    // .x(d => xScale(d['date']))
    // .y(d => yScale(d['close']));
    // // .y(d => yScale(d['stochastic'].d));
    // // .y(d => yScale(d.stochastic.d));


    const lineSeriesFn = d3.line()
        .x(d => xScale(d['date']))
        .y(d => yScale(d['close']));
        // .y(d => yScale(d.series));  // ohlc v sma rsi etc
        
    console.log('cGSU gLS output line series', lineSeriesFn);

    // const dateXAxis = d3.create('svg:g')
    //     .attr('id', `${seriesType}-xAxis-${paneNumber}`)
    //     .attr('transform', `translate(${origin.right}, ${origin.down})`)
    //     .call(axis);

    const lineSeries = d3.create('svg:g')
        .append('path')
        .data(data)
        .attr('id', `${series}-data-${paneNumber}`)
        .attr('transform', `translate(${origin.right}, ${origin.down})`)
        .style('fill', 'none')
        .attr('stroke', 'darkblue')
        .attr('stroke-width', '1.5')
        .attr('d', lineSeriesFn);


    return lineSeries;
    
}

export function generateCandlestickSeries(data: OHLCData[], series:Series, paneNumber: number) {
    console.log('cGSU gCS input data[0]', data[0]);
    // const series = {};
    // return series;
}

export function generateBarSeries(data: OHLCData[], series:Series) {
    console.log('cGSU gBS input data[0]', data[0]);
    // const series = {};
    // return series;
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