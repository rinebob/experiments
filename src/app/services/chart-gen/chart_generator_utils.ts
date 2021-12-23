import * as d3 from 'd3';
import * as fc from 'd3fc';
import { AXIS_THICKNESS } from 'src/app/common/constants';

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

export function generateXScale(xMin: number, xMax: number, layout: PaneLayout) {
    console.log('cGSU gXS input x min/max/layout.paneOrigin ', xMin, xMax);
    console.table(layout.paneOrigin);
    const xScale = d3
    .scaleTime()
    .domain([xMin, xMax])
    .range([layout.paneOrigin.right, layout.paneOrigin.right + layout.chartIndWidth]);
    
    console.log('cGSU gXS final xScale domain/range: ', xScale.domain(), xScale.range());
    return xScale;
}

export function generateLinearYScale(yMin: number, yMax: number, layout: PaneLayout) {
    console.log('cGSU gLinYS input y min/max/layout ', yMin, yMax);
    console.table(layout.paneOrigin);
    const yScale = d3
        .scaleLinear()
        .domain([yMin, yMax])
        .range([layout.paneOrigin.down + layout.chartIndHeight, layout.paneOrigin.down]);

        console.log('cGSU gLinYS final yScale domain/range: ', yScale.domain(), yScale.range());
        return yScale;

}

export function generateLogYScale(yMin: number, yMax: number, layout: PaneLayout) {
    console.log('cGSU gLogYS input y min/max/layout ', yMin, yMax);
    console.table(layout.paneOrigin);
    const yScale = d3
        .scaleLog()
        .domain([yMin, yMax])
        .range([layout.paneOrigin.down + layout.chartIndHeight, layout.paneOrigin.down]);

        console.log('cGSU gLogYS final yScale domain/range: ', yScale.domain(), yScale.range());
    return yScale;



}

export function generateYAxis(yScale, layout: PaneLayout, seriesType: string, paneNumber: number, location: ScaleLocation) {
    console.log('cGSU gYA input seriesType/paneNumber/location/layout',seriesType, paneNumber, location);
    console.log('cGSU gYA input yScale range/domain', yScale.range(), yScale.domain());
    console.table(layout);

    let axis: d3.Axis;
    let origin: TranslationCoord;

    // const rect = d3.create('svg:rect')
    // .attr('height', layout.chartIndHeight)
    // .attr('width', AXIS_THICKNESS)
    // .attr('stroke', 'white')
    // .attr('fill', 'none')
    // .attr('stroke-width', '1.5');

    const yAxis = d3.create('svg:g')
        .attr('id', `${seriesType}-yAxis-${paneNumber}`);
    // const axis = location === ScaleLocation.LEFT ? d3.axisLeft(yScale) : d3.axisRight(yScale);
    
    if (location === ScaleLocation.LEFT) {
        axis = d3.axisLeft(yScale);
        origin = layout.leftAxisOrigin;
        yAxis.attr('transform', `translate(${AXIS_THICKNESS}, ${AXIS_THICKNESS})`)
        .call(axis);

        

    } else {
        axis = d3.axisRight(yScale);
        origin = layout.rightAxisOrigin;
        yAxis.attr('transform', `translate(${layout.fullPaneWidth - AXIS_THICKNESS}, ${AXIS_THICKNESS})`)
        .call(axis);

        

    }

    console.log('cGSU gYA yScale origin: ', origin);

    // rect.attr('transform', `translate(${origin.right}, ${origin.down})`)
    
    // console.log('cGSU gYA rect: ', rect);
    // yAxis.append(() => rect.node());

    return yAxis;



}

export function generateDateXAxis(xScale, layout: PaneLayout, seriesType: Series, paneNumber: number, location: ScaleLocation) {
    console.log('cGSU gDXA input xScale/origin/seriesType/paneNumber/location', xScale, seriesType, paneNumber, location);
    console.log('cGSU gDXA input xScale domain/range: ', xScale.domain(), xScale.range());
    console.table(layout);

    const axis = location === ScaleLocation.TOP ? d3.axisTop(xScale) : d3.axisBottom(xScale);
    const origin = location === ScaleLocation.TOP ? layout.topAxisOrigin : layout.bottomAxisOrigin;
    console.log('cGU gDXA origin: ', origin);

    const dateXAxis = d3.create('svg:g')
        .attr('id', `${seriesType}-xAxis-${paneNumber}`)
        .attr('transform', `translate(${origin.right}, ${origin.down})`)
        .call(axis);

    // const rect = d3.create('svg:rect')
    // .attr('height', AXIS_THICKNESS)
    // .attr('width', layout.chartIndWidth)
    // .attr('stroke', 'yellow')
    // .attr('fill', 'none')
    // .attr('stroke-width', '1.5');

    // console.log('cGSU gYA rect: ', rect);
    // dateXAxis.append(() => rect.node());

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
export function generateLineSeries(data: OHLCData[], xScale, yScale, config: ChartSeriesConfig, paneNumber: number, layout: PaneLayout) {
    console.log('cGSU gLS input series/paneNumber/origin', config.seriesType, paneNumber, layout.paneOrigin);
    console.log('cGSU gLS input yScale range/domain', yScale.range(), yScale.domain());
    console.table(data.slice(100,110));

    const lineSeriesFn = d3.line()
        .x(d => xScale(d['date']))
        .y(d => yScale(d['close']));

    // const rect = d3.create('svg:rect')
    // .attr('height', layout.chartIndHeight)
    // .attr('width', layout.chartIndWidth)
    // // .attr('transform', `translate(${layout.dataOrigin.right}, ${layout.dataOrigin.down})`)
    // .attr('transform', `translate(0, ${layout.paneOrigin.down})`)
    // .attr('stroke', 'blue')
    // .attr('fill', 'none')
    // .attr('stroke-width', '1.5');

    // console.log('cGSU gYA rect: ', rect);
    
        
    // const lineSeries = d3.create('svg:g')
    //     .append('path')
    //     .data([data])
    //     .attr('id', `${series}-line-${paneNumber}`)
    //     .attr('transform', `translate(${layout.paneOrigin.right}, ${layout.paneOrigin.down})`)
    //     .style('fill', 'none')
    //     .attr('stroke', 'darkblue')
    //     .attr('stroke-width', '1.5')
    //     .attr('d', lineSeriesFn);

    // console.log('cGSU gLS output line series: ', lineSeries);

    // lineSeries.append(() => rect.node());

    // return lineSeries;

    // d3fc
    const renderItem = d3.create('svg:g')
        .attr('id', `${config.seriesType}-line-${paneNumber}`)
        // .attr('transform', `translate(${layout.dataOrigin.right}, ${layout.dataOrigin.down})`);
        .attr('transform', `translate(${AXIS_THICKNESS}, ${AXIS_THICKNESS})`);
        
    const line = fc.seriesSvgLine()
        .xScale(xScale)
        .yScale(yScale)
        .crossValue(d => d.date)
        .mainValue(d => d[config.seriesType])
        .decorate(selection => 
            selection.enter()
            .style('fill', 'none')
            .attr('stroke', config.displayConfig.color)
            .attr('stroke-width', '1.5')
            // .attr('transform', `translate(${layout.dataOrigin.right}, ${layout.dataOrigin.down})`)
        );

    renderItem
        .datum(data)
        .call(line);

        // renderItem.append(() => rect.node());

    console.log('cGSU gLS output render item: ', renderItem);
    return renderItem;

    // return lineSeries;



    
}

export function generateCandlestickSeries(data: OHLCData[], xScale, yScale, config: ChartSeriesConfig, paneNumber: number, layout: PaneLayout) {
    console.log('cGSU gCS input series/paneNumber/origin', config.seriesType, paneNumber, origin);
    console.log('cGSU gCS input yScale range/domain', yScale.range(), yScale.domain());
    console.table(data.slice(100,110));

    const renderItem = d3.create('svg:g')
      .attr('id', `${config.seriesType}-cndl-${paneNumber}`);

    const candlestick = fc.seriesSvgCandlestick()
    .xScale(xScale)
    .yScale(yScale)
    .crossValue(d => d.date)
    .openValue(d => d.open)
    .highValue(d => d.high)
    .lowValue(d => d.low)
    .closeValue(d => d.close);

    renderItem
    .datum(data)
    .call(candlestick);

    return renderItem;


}

export function generateBarSeries(data: OHLCData[], xScale, yScale, config: ChartSeriesConfig, paneNumber: number, layout: PaneLayout) {
    console.log('cGSU gBS input series/paneNumber/origin', config.seriesType, paneNumber, origin);
    console.log('cGSU gBS input yScale range/domain', yScale.range(), yScale.domain());
    console.table(data.slice(100,110));

    const renderItem = d3.create('svg:g')
      .attr('id', `${config.seriesType}-bar-${paneNumber}`);

    const ohlcBar = fc.seriesSvgOhlc()
    .xScale(xScale)
    .yScale(yScale)
    .crossValue(d => d.date)
    .openValue(d => d.open)
    .highValue(d => d.high)
    .lowValue(d => d.low)
    .closeValue(d => d.close);

    renderItem
    .datum(data)
    .call(ohlcBar);

    return renderItem;

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

export function mergeArrayData(into, from, label) {
    // console.log('cGU mAD input into/from: ', into[0], from[0]);
    // console.log('cGU mAD input from[0]/value: ', from[0], from[0].value);
    
    const output = into.map((d, i) => {
        const datum = {...d};

        // console.log('cGU mD i/from[i]: ', i, from[i]);
        datum[`${label}`] = from[i];
      
      return {...datum};
    });

    console.log('cGU mD output:');
    console.table(output.slice(100,110));
    
    return output;
}

export function mergeObjectData(into, from) {
    console.log('cGU mOD input into/from[0]: ', into[0], from[0]);
    console.log('cGU mOD input from[0].key/value: ', from[0].key, from[0].value);
    
    const output = into.map((d, i) => {
      const datum = {...d};

      for (const [key, value] of Object.entries(from[i])) {
        // console.log('cGU mD key/value: ', key, value);
        datum[`${key}`] = value;
      }

      return {...datum};
    });

    console.log('cGU mOD output:');
    console.table(output.slice(100,110));
    
    return output;
}

export function returnDataWithSmoothD(into, smoothDSource) {
    console.log('cGU rDWFK input into/fastKSource[100]: ', into[100], smoothDSource[100]);
    // console.log('cGU rDWFK input from[0].key/value: ', from[0].key, from[0].value);

    const output = into.map((d, i) => {
        const datum = {...d};

        // take the value from fastKSource.k and add it to into['fastK']
        datum['smoothD'] = smoothDSource[i].k;
    


    });
    console.log('cGU rDWFK output data:');
    console.table(output.slice(100, 110));

    return output;

}