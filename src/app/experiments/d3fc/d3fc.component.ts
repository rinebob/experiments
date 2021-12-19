import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as fc from 'd3fc';

import { mergeArrayData, mergeObjectData } from 'src/app/services/chart-gen/chart_generator_utils';
import { MSFTData_sample } from 'src/assets/data/MSFT_21-1112_sample';



// import {element} from '@d3fc/d3fc-element';
// import {extent} from '@d3fc/d3fc-extent';
// import {discontinuousScale} from '@d3fc/d3fc-discontinuous-scale';
// import {axis} from '@d3fc/d3fc-Axis';
// import {series} from '@d3fc/d3fc-series';
// import {chartCartesian} from '@d3fc/d3fc-chart';
// import {technicalIndicator} from '@d3fc/d3fc-technical-indicator';
// import * as anno from '@d3fc/d3fc-annotation';
// import { seriesCanvasArea } from 'd3fc';

@Component({
  selector: 'exp-d3fc',
  templateUrl: './d3fc.component.html',
  styleUrls: ['./d3fc.component.scss']
})
export class D3fcComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // this.renderDocumentationChart();
    // this.renderSineChart();
    this.renderCandlestickChart();
    // this.renderYahooChart();
  }

  // from https://github.com/d3fc/d3fc/tree/master/packages/d3fc-chart
  renderDocumentationChart() {
    const data = d3.range(50).map((d) => ({
      x: d/4,
      y: Math.sin(d/4),
      z: Math.cos(d/4) * 0.7,
    }));

    console.log('d3FC rSC data.slice(0,10): ');
    console.table(data.slice(0,10));

    // compute the data domain for each axis (min, max)
    const xExtent = fc.extentLinear()
                          .accessors([d => d.x]);
    const yExtent = fc.extentLinear()
                          .accessors([d => d.y, d => d.z]);
    // create gridlines
    const gridlines = fc.annotationSvgGridline();

    // create data series
    const line = fc.seriesCanvasLine();
    const area = fc.seriesCanvasArea()
                      .mainValue(d => d.z);

    // combine data series into one render item
    const multi = fc.seriesCanvasMulti()
                    .series([line, area]);

    // render the chart
    // const chart = fc.chartCartesian(
    // const chart: D3fcComponent = fc.chartCartesian(
    //   d3.scaleLinear(), d3.scaleLinear()
    // )
    // .xLabel('Value')
    // .yLabel('Sine / Cosine')
    // .chartLabel('Sine and Cosine')
    // .yDomain(yExtent(data))
    // .xDomain(xExtent(data))
    // .svgPlotArea(gridlines)
    // .canvasPlotArea(multi);


    // d3.select('#sine')
    // .datum(data)
    // .call(chart);


  }


  renderSineChart() {
    
    const data = d3.range(50, 60).map((d) => ({
      x: d,
      y: Math.sin(d/4),
      z: Math.cos(d/4) * 0.7,
     }));

    console.log('d3FC rSC data.slice(0,10): ');
    console.table(data.slice(0,10));

    // compute the data domain for each axis (min, max)
    const xExtent = fc.extentLinear()
                          .accessors([d => d.x]);
    const yExtent = fc.extentLinear()
                          .accessors([d => d.y, d => d.z]);

    
    const xScale = d3.scaleLinear()
        .domain([0, xExtent])
        .range([0, 500]);

    const yScale = d3.scaleLinear()
        .domain([0, yExtent])
        .range([250, 0]);

    // create gridlines
    const gridlines = fc.annotationSvgGridline();

    const line = fc.seriesSvgLine();
    const area = fc.seriesSvgArea()
                      .mainValue(d => d.z);

    const multi = fc.seriesSvgMulti()
                        .series([gridlines, line, area]);

    // const chart: D3fcComponent = fc.chartCartesian(xScale, yScale)
    // .xLabel('Value')
    // .yLabel('Sine / Cosine')
    // .chartLabel('Sine and Cosine')
    // .yDomain(yExtent(data))
    // .xDomain(xExtent(data))
    // .svgPlotArea(multi);

    // d3.select('#sine')
    // .datum(data)
    // .call(chart);



  }

  renderCandlestickChart() {
    let data = MSFTData_sample.map((d, i) => ({
      date: i,
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close,
    }));

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    console.log('d3FC rSC typeof data.slice(0,10)[0].open: ', typeof data[0].open, data[0].open);
    console.log('d3FC rSC data.slice(0,10): ');
    console.table(data.slice(0,10));
    
    const xExtent = fc.extentLinear()
                          .accessors([d => d.date]);
    const yExtent = fc.extentLinear()
                          .accessors([d => d.high, d => d.low]);

    const xScale = d3.scaleLinear()
        .domain([0, xExtent])
        .range([0, 500]);

    const yScale = d3.scaleLinear()
        .domain([0, yExtent])
        .range([250, 0]);

    // create gridlines
    const gridlines = fc.annotationSvgGridline();

    // ================ D3FC Series ====================

    const lineSeries = fc
      .seriesSvgLine()
      .mainValue(d => d.high)
      .crossValue(d => d.date);

    const line = fc.seriesSvgLine()
    .mainValue(d => d.close)
    .crossValue(d => d.date);

    const point = fc.seriesSvgPoint()
    .mainValue(d => d.close)
    .crossValue(d => d.date);

    const area = fc.seriesSvgArea()
    .mainValue(d => d.close)
    .crossValue(d => d.date);

    const bar = fc.seriesSvgBar()
    .mainValue(d => d.close)
    .crossValue(d => d.date);

    // bar color cycles through a color palette
    const rotatingColorBar = fc.seriesSvgBar()
    .mainValue(d => d.close)
    .crossValue(d => d.date)
    .decorate(selection => 
      selection.enter()
      .style('fill', (_, i) => color(i))
    );

    // bar color cycles through a color palette and has spiffy labels
    const rotatingColorBarWithLabels = fc.seriesSvgBar()
    .mainValue(d => d.close)
    .crossValue(d => d.date)
    .decorate(selection => 
      selection.enter()
      .style('fill', (_, i) => color(i))
      .append('text')
      .style('text-anchor', 'middle')
      .attr('transform', 'translate(0, -10)')
      .text(d => d3.format('.2f')(d.high))
      .attr('fill', 'black')
    );

    const ohlc = fc.seriesSvgOhlc()
    .xScale(xScale)
    .yScale(yScale)
    .crossValue(d => d.date)
    .openValue(d => d.open)
    .highValue(d => d.high)
    .lowValue(d => d.low)
    .closeValue(d => d.close);

    const candlestick = fc.seriesSvgCandlestick()
    .xScale(xScale)
    .yScale(yScale)
    .crossValue(d => d.date)
    .openValue(d => d.open)
    .highValue(d => d.high)
    .lowValue(d => d.low)
    .closeValue(d => d.close);

    const errorBar = fc.seriesSvgErrorBar()
    .xScale(xScale)
    .yScale(yScale)
    .crossValue(d => d.date)
    .highValue(d => d.high)
    .lowValue(d => d.low);

    // ============== D3FC Technical Indicator =================

    // -------------- Bollinger Bands --------------------
    
    const bbPeriod = 3;
    const bbMultiplier = 1;

    // logs the data returned by the bb data generator
    const bbFn = fc.indicatorBollingerBands()
    .value(d => d.close)
    .period(bbPeriod)
    .multiplier(bbMultiplier);

    const bbData = bbFn(data);
    console.log('d3FC bbData:');
    console.table(bbData.slice(0,10));

    // create the merged data set
    data = mergeObjectData(data, bbData);

    // create the BB lines
    const bbUpper = fc.seriesSvgLine()
    .xScale(xScale)
    .yScale(yScale)
    .mainValue(d => d.upper)
    .crossValue(d => d.date);

    const bbAverage = fc.seriesSvgLine()
    .xScale(xScale)
    .yScale(yScale)
    .mainValue(d => d.average)
    .crossValue(d => d.date);

    const bbLower = fc.seriesSvgLine()
    .xScale(xScale)
    .yScale(yScale)
    .mainValue(d => d.lower)
    .crossValue(d => d.date);


    // ---------------- SMA -------------------

    const smaPeriod = 20;

    const smaFn = fc.indicatorMovingAverage()
    .value(d => d.close)
    .period(smaPeriod);

    const smaData = smaFn(data);

    console.log('d3FC smaData:');
    console.table(smaData.slice(0,10));

    data = mergeArrayData(data, smaData, 'sma');
    console.log('d3FC merged smaData:');
    console.table(data.slice(0,10));

    const sma = fc.seriesSvgLine()
    .xScale(xScale)
    .yScale(yScale)
    .mainValue(d => d.sma)
    .crossValue(d => d.date);



    // ---------------- EMA -------------------

    const emaPeriod = 20;

    const emaFn = fc.indicatorExponentialMovingAverage()
    .value(d => d.close)
    .period(emaPeriod);

    const emaData = emaFn(data);

    console.log('d3FC emaData:');
    console.table(emaData.slice(0,10));

    data = mergeArrayData(data, emaData, 'ema');
    console.log('d3FC merged emaData:');
    console.table(data.slice(0,10));

    const ema = fc.seriesSvgLine()
    .xScale(xScale)
    .yScale(yScale)
    .mainValue(d => d.ema)
    .crossValue(d => d.date);

    
    // --------------- MACD -------------------

    // compute the data domain for each axis (min, max)
    const macdXExtent = fc.extentLinear()
                          .accessors([d => d.date]);
    const macdYExtent = fc.extentLinear()
                          .accessors([d => d.macd]);

    const macdXScale = d3.scaleLinear()
        .domain([0, macdXExtent])
        .range([0, 500]);

    const macdYScale = d3.scaleLinear()
        .domain([0, macdYExtent])
        .range([250, 0]);

    const macdFast = 3;
    const macdSlow = 8;
    const macdSignal = 2;

    // logs the data returned by the macd data generator
    const macdFn = fc.indicatorMacd()
    .value(d => d.close)
    .fastPeriod(macdFast)
    .slowPeriod(macdSlow)
    .signalPeriod(macdSignal);

    const macdData = macdFn(data);
    // data = macd(data);
    console.log('d3FC macdData:');
    console.table(macdData.slice(0,10));

    // create the merged data set
    data = mergeObjectData(data, macdData);

    // create the macd lines
    const macdLine = fc.seriesSvgLine()
    .xScale(macdXScale)
    .yScale(macdYScale)
    .mainValue(d => d.macd)
    .crossValue(d => d.date);

    const macdSignalLine = fc.seriesSvgLine()
    .xScale(macdXScale)
    .yScale(macdYScale)
    .mainValue(d => d.signal)
    .crossValue(d => d.date);

    const macdDivergence = fc.seriesSvgLine()
    .xScale(macdXScale)
    .yScale(macdYScale)
    .mainValue(d => d.divergence)
    .crossValue(d => d.date);

    const macd = fc.seriesSvgMulti()
    .series([macdLine, macdSignalLine, macdDivergence]);



    // ---------------- RSI -------------------
    // ---------------- STOCHASTIC -------------------
    // --------------- ENVELOPE -------------------



    // ============== Plots =================
    
    const multi = fc.seriesSvgMulti()
    .series([gridlines, line, candlestick, point, area, bar]);
    // .series([gridlines, ohlc, errorBar]);

    const candleBbMulti = fc.seriesSvgMulti()
    .series([gridlines, candlestick, bbUpper, bbAverage, bbLower, sma]);

    const smaMulti = fc.seriesSvgMulti()
    .series([gridlines, candlestick, sma]);

    const emaMulti = fc.seriesSvgMulti()
    .series([gridlines, candlestick, sma, ema]);

    
    // const chart = fc.chartCartesian(xScale, yScale)
    // const chart = fc.chartCartesian(
    // const chart: D3fcComponent = fc.chartCartesian(
    //   d3.scaleLinear(), d3.scaleLinear()
    // )
    // .xLabel('Some number')
    // .yLabel('Another number')
    // .yOrient('right')
    // .chartLabel('This is now a candlestick chart ...')
    // .yDomain(yExtent(data))
    // .xDomain(xExtent(data))
    // .svgPlotArea(multi);
    // .svgPlotArea(line);
    // .svgPlotArea(candlestick);
    // .svgPlotArea(bar);
    // .svgPlotArea(rotatingColorBar);
    // .svgPlotArea(rotatingColorBarWithLabels);
    // .svgPlotArea(ohlc);
    // .svgPlotArea(area);
    // .svgPlotArea(errorBar);
    // .svgPlotArea(bbUpper);
    // .svgPlotArea(candleBbMulti);
    // .svgPlotArea(bollingerBands);
    // .svgPlotArea(sma);
    // .svgPlotArea(smaMulti);
    // .svgPlotArea(ema);
    // .svgPlotArea(emaMulti);
    
    

    // d3.select('#chartPane')
    // .datum(data)
    // .call(chart);

    // const indicatorOne: D3fcComponent = fc.chartCartesian(
    //   d3.scaleLinear(), d3.scaleLinear()
    // )
    // .xLabel('Some number')
    // .yLabel('Another number')
    // .yOrient('right')
    // .chartLabel('Indicator 1')
    // .yDomain(macdYExtent(data))
    // .xDomain(macdXExtent(data))
    // .svgPlotArea(macd);
    
    // d3.select('#indicatorPane1')
    // .datum(data)
    // .call(indicatorOne);

  }

  renderYahooChart() {
    const data = d3.range(50, 60).map((d) => ({
      date: Number(d),
      open: Number(d),
      high: Number(d + 2),
      low: Number(d),
      close: Number(d + 1),
    }));
    
    
    // const xExtent = fc.extentTime()
    //   .accessors([d => d.date]);
    const xExtent = fc.extentLinear()
    .accessors([d => d.date]);
    const yExtent = fc.extentLinear()
      .pad([0.1, 0.1])
      .accessors([d => d.high, d => d.low]);

    const lineSeries = fc
      .seriesSvgLine()
      .mainValue(d => d.high)
      .crossValue(d => d.date);

    // const chart = fc.chartCartesian(
    // const chart: D3fcComponent = fc.chartCartesian(
    //   d3.scaleLinear(), d3.scaleLinear()
    //   )
    //   .yOrient("right")
    //   .yDomain(yExtent(data))
    //   .xDomain(xExtent(data))
    //   .svgPlotArea(lineSeries);

    // d3.select("#chart-element")
    //   .datum(data)
    //   .call(chart);
    


  }

}
