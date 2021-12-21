import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as fc from 'd3fc';

import { mergeArrayData, mergeObjectData, returnDataWithSmoothD } from 'src/app/services/chart-gen/chart_generator_utils';
import { MSFTData_sample } from 'src/assets/data/MSFT_21-1112_sample';
import { MSFT_Data_sample2 } from 'src/assets/data/MSFT_21-1112_sample2';



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
    // let data = MSFTData_sample.map((d, i) => ({
    let data = MSFT_Data_sample2.slice(0, 400).map((d, i) => ({
      date: i,
      // date: d.date,
      open: d.open,
      high: d.high,
      low: d.low,
      close: d.close,
      volume: d.volume,
    }));

    const color = d3.scaleOrdinal(d3.schemeCategory10);

    console.log('d3FC rSC data.slice(0,10)[0].open: ', data[0].open);
    console.log('d3FC rSC data.slice(0,10): ');
    console.table(data.slice(0,10));

    // ================ EXTENTS / SCALES ====================

    let xScale: d3.scale;
    let yScale: d3.scale
    
    const xExtent = fc.extentLinear()
      .accessors([d => d.date]);
    const yExtent = fc.extentLinear()
      .accessors([d => d.high, d => d.low]);

    const xLinearScale = d3.scaleLinear()
      .domain([0, xExtent])
      .range([0, 500]);

    const xTimeScale = d3.scaleTime()
      .domain([0, xExtent])
      .range([0, 500]);

    const yLinearScale = d3.scaleLinear()
      .domain([0, yExtent])
      .range([250, 0]);

    const yLogScale = d3.scaleLog()
      .domain([0, yExtent])
      .range([250, 0]);

      xScale = xLinearScale;
      yScale = yLogScale;

    // create gridlines
    const gridlines = fc.annotationSvgGridline();

    // ================ D3FC Series ====================

    // -------------- Line / Point / Area / Bar --------------------
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

    // -------------- Examples --------------------

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

    // -------------- OHLC Bar --------------------

    const ohlc = fc.seriesSvgOhlc()
    .xScale(xScale)
    .yScale(yScale)
    .crossValue(d => d.date)
    .openValue(d => d.open)
    .highValue(d => d.high)
    .lowValue(d => d.low)
    .closeValue(d => d.close);

    // -------------- Candlestick --------------------

    const candlestick = fc.seriesSvgCandlestick()
    .xScale(xScale)
    .yScale(yScale)
    .crossValue(d => d.date)
    .openValue(d => d.open)
    .highValue(d => d.high)
    .lowValue(d => d.low)
    .closeValue(d => d.close);

    // -------------- Error Bar --------------------

    const errorBar = fc.seriesSvgErrorBar()
    .xScale(xScale)
    .yScale(yScale)
    .crossValue(d => d.date)
    .highValue(d => d.high)
    .lowValue(d => d.low);

    // ============== D3FC Technical Indicator =================

    // -------------- Bollinger Bands --------------------
    
    const bbPeriod = 20;
    const bbMultiplier = 2;

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

    

    // ---------------- RSI -------------------

    const rsiXExtent = fc.extentLinear()
                          .accessors([d => d.date]);
    const rsiYExtent = fc.extentLinear()
                          .accessors([d => d.rsi]);

    const rsiXScale = d3.scaleLinear()
        .domain([0, rsiXExtent])
        .range([0, 500]);

    const rsiYScale = d3.scaleLinear()
        // .domain([0, rsiYExtent])
        .domain([0, 100])
        .range([250, 0]);

    const rsiYAxis = fc.axisLeft(rsiYScale);

    const rsiPeriod = 14;

    const rsiFn = fc.indicatorRelativeStrengthIndex()
    .value(d => d.close)
    .period(rsiPeriod);

    const rsiData = rsiFn(data);

    console.log('d3FC rsiData:');
    console.table(rsiData.slice(0,10));

    data = mergeArrayData(data, rsiData, 'rsi');
    console.log('d3FC merged rsiData:');
    console.table(data.slice(0,10));

    const rsi = fc.seriesSvgLine()
    .xScale(rsiXScale)
    .yScale(rsiYScale)
    .mainValue(d => d.rsi)
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

    const macdFast = 12;
    const macdSlow = 26;
    const macdSignal = 9;

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

    const macdDivergence = fc.seriesSvgBar()
    .xScale(macdXScale)
    .yScale(macdYScale)
    .mainValue(d => d.divergence)
    .crossValue(d => d.date);

    const macd = fc.seriesSvgMulti()
    .series([macdLine, macdSignalLine, macdDivergence]);


    // ---------------- REGULAR STOCHASTIC -------------------

     // compute the data domain for each axis (min, max)
     const stochXExtent = fc.extentLinear()
          .accessors([d => d.date]);
      const stochYExtent = fc.extentLinear()
          .accessors([d => d.k]);

      const stochXScale = d3.scaleLinear()
      .domain([0, stochXExtent])
      .range([0, 500]);

      const stochYScale = d3.scaleLinear()
      .domain([0, stochYExtent])
      .range([250, 0]);

      const kPeriod = 14;
      const dPeriod = 3;
      

      // creates a function that calculates stoch k & d values
      const stochFn = fc.indicatorStochasticOscillator()
      .kPeriod(kPeriod)
      .dPeriod(dPeriod)
      
      const stochData = stochFn(data);
      // data = stoch(data);
      console.log('d3FC stochData:');
      console.table(stochData.slice(0,10));

      // create the merged data set
      data = mergeObjectData(data, stochData);

      // create the stoch lines
      const stochKLine = fc.seriesSvgLine()
      .xScale(stochXScale)
      .yScale(stochYScale)
      .mainValue(d => d.k)
      .crossValue(d => d.date);

      const stochDLine = fc.seriesSvgLine()
      .xScale(stochXScale)
      .yScale(stochYScale)
      .mainValue(d => d.d)
      .crossValue(d => d.date);


      const stoch = fc.seriesSvgMulti()
      .series([stochKLine, stochDLine]);

      

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
    .series([gridlines, candlestick, bbUpper, bbAverage, bbLower, sma, ema]);

    
    // const chart = fc.chartCartesian(xScale, yScale)
    // const chart = fc.chartCartesian(
      // d3.scaleLinear()
    const chart = fc.chartCartesian(
      d3.scaleLinear(), d3.scaleLog()
    )
    .xLabel('Some number')
    .yLabel('Another number')
    .xOrient('top')
    .yOrient('right')
    .chartLabel('Dude... it\'s a candlestick chart ...')
    .xDomain(xExtent(data))
    .yDomain(yExtent(data))
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
    .svgPlotArea(emaMulti);
    
    d3.select('#chart')
    .datum(data)
    .call(chart);

// ============== INDICAOR PLOTS ================== 
// ----------------- Indicator One ---------------

    const indicatorGridlines = fc.annotationSvgGridline();

    const indicatorMulti = fc.seriesSvgMulti()
    .series([indicatorGridlines, macd]);

    const indicatorOne: D3fcComponent = fc.chartCartesian(
      d3.scaleLinear(), d3.scaleLinear()
    )
    .xLabel('Some number')
    .yLabel('Another number')
    .yOrient('right')
    .chartLabel('Indicator 1')
    .yDomain(macdYExtent(data))
    .xDomain(macdXExtent(data))
    // .svgPlotArea(macd);
    .svgPlotArea(indicatorMulti);
    
    // d3.select('#indicatorPane1')
    // .datum(data)
    // .call(indicatorOne);

    // ----------------- Indicator Two ---------------

    const indicatorGridlines2 = fc.annotationSvgGridline();

    const rsiMulti = fc.seriesSvgMulti()
    .series([indicatorGridlines2, rsi]);

    const stochMulti = fc.seriesSvgMulti()
    .series([indicatorGridlines2, stoch]);

    const indicatorMulti2 = fc.seriesSvgMulti()
    .series([indicatorGridlines2, rsi, stoch]);

    const indicatorTwo: D3fcComponent = fc.chartCartesian(
      d3.scaleLinear(), d3.scaleLinear()
    )
    .xLabel('Some number')
    .yLabel('Another number')
    .yOrient('right')
    .chartLabel('Indicator 2')
    .yDomain([0, 100])
    .xDomain(rsiXExtent(data))
    // .svgPlotArea(rsi);
    // .svgPlotArea(rsiMulti);
    .svgPlotArea(stoch);
    // .svgPlotArea(stochMulti);
    // .svgPlotArea(indicatorMulti2);
    
    // d3.select('#indicatorPane2')
    // .datum(data)
    // .call(indicatorTwo);

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

  // ---------------- SMOOTHED D STOCHASTIC -------------------

      // Adds a x-period (default = 3) ma to above stoch %d line.
      // Used to reduce typical jagged choppy %k lines.
      // Plot the regular %d as %k, and plot the smoothed %d as the regular %d

      // generateSmoothStochastic() {

      

      //   const smoothDPeriod = 3;
     
        // get the regular stoch k and d values using regular stoch
        // data might already have k and d so check first
        // if (data.hasOwnProperty('k') === false) {
        //   console.log('d3FC in data.hasOwnProperty block');
        //   data = stochFn(data);
        //   console.table(data.slice(100,110));
  
        // }
  
      //   const smoothedDData = fc.indicatorExponentialMovingAverage()
      //   .value(d => d.d)
      //   .period(smoothDPeriod);
  
      //   // console.log('d3FC smoothedDData:');
      //   // console.table(smoothedDData.slice(100,110));
  
      //   // create the merged data set
      //   data = mergeArrayData(data, smoothedDData, 'smoothD');
      //   console.log('d3FC data after adding k d and smoothD:');
      //   console.table(data.slice(100,110));
  
      //   // create the lines
      //   // regular (choppy) %k.  Will be hidden typically
      //   const regStochKLine = fc.seriesSvgLine()
      //   .xScale(stochXScale)
      //   .yScale(stochYScale)
      //   .mainValue(d => d.k)
      //   .crossValue(d => d.date);
  
      //   // regular %d.  Replaces %k to start with a smoothed source
      //   const regStochDLine = fc.seriesSvgLine()
      //   .xScale(stochXScale)
      //   .yScale(stochYScale)
      //   .mainValue(d => d.d)
      //   .crossValue(d => d.date);
  
      //   // smoothed %d.  Replaces %d.  Nice and smooth and readable eh?
      //   const smoothStochDLine = fc.seriesSvgLine()
      //   .xScale(stochXScale)
      //   .yScale(stochYScale)
      //   .mainValue(d => d.smoothD)
      //   .crossValue(d => d.date);
  
  
      //   const smoothDStoch = fc.seriesSvgMulti()
      //   .series([regStochKLine, regStochDLine, smoothStochDLine]);
  
        
      // }

    //   const smoothDStochMulti = fc.seriesSvgMulti()
    // .series([indicatorGridlines2, smoothDStoch]);

}
