import { Injectable } from '@angular/core';
import { axisBottom } from 'd3fc';
import { config } from 'rxjs';

import { OHLCData } from 'src/app/common/interfaces';
import { AxisConfig, ChartPaneConfig, ChartPanelConfig, ChartSeriesConfig, ChartType, PaneExtents, ScaleType, Series } from 'src/app/common/interfaces_chart';
import * as utils from './chart_generator_utils';

@Injectable({
  providedIn: 'root'
})
export class ChartGeneratorService {

  constructor() { }

  generatePanel(data: OHLCData[], panelConfig: ChartPanelConfig) {

    console.log('cGS gPanel input data[0], panelConfig: ', data[0], panelConfig);
    // create root group node for entire panel
    const root = document.createElement('g');

    // for each pane of panelConfig panes
    for (const pane of panelConfig.panes) {
      // generate pane
      const chartPane = this.generatePane(data, pane);

      // append each pane to the node in the proper location
      // root.append(chartPane);
    }
    // return the entire panel to the calling component
    return root;
  }

  generatePane(data: OHLCData[], paneConfig: ChartPaneConfig) {
    console.log('-----------------------------------------------');
    console.log('cGS gPane paneConfig: ', paneConfig);
    // create pane root group node
    const pane = document.createElement('g');

    // generate pane dimensions
    const extents: PaneExtents = utils.generateExtents(data);
    console.log('cGS gPane output extents:');
    console.table({...extents});

    const seriesToRender = [];

    // for each series of paneConfig series
    for (const config of paneConfig.seriesConfigs) {

      // generate x axis
      const xAxis = this.generateXAxis(extents, config.xAxisConfig);
      // append x axis
      // pane.append(xAxis);
      
      // generate y axis
      const yAxis = this.generateYAxis(extents, config.yAxisConfig)
      // append y axis
      // pane.append(yAxis);

      // generate series
      const seriesData = this.generateSeriesData(config, data);
      
      // append series

      // const render = this.generateSeriesRender(seriesData);
      const render = this.generateSeriesRender(data, config.displayConfig.chartType);

      // pane.append(render);

      seriesToRender.push(render);

    }
    // generate annotations
    // append annotations

    // return the pane group node 
    return pane;
  }

  generateXAxis(extents: PaneExtents, config: AxisConfig) {
    console.log('cGS gXA input extents, axis config: ', extents, config);
    let axis = {};
    // switch case for config AxisType
    // nearly always will be date axis 
    // call the util method
    const xScale = utils.generateXScale(extents.xMin, extents.xMax);
    console.log('cGS gXA input extents, axis config: ', extents, config);
    
    switch(config.type) {
      case ScaleType.DATE: 
        axis = utils.generateDateXAxis(xScale);

        break;

      case ScaleType.FINANCE_DATE: 
        axis = utils.generateFinanceTimeXAxis(xScale);

        break;
    }

    return axis;

  }

  generateYAxis(extents: PaneExtents, config: AxisConfig) {
    console.log('cGS gYA input extents, axis config: ', extents, config);
    let axis = {};
    const yScale = utils.generateYScale(extents.yMin, extents.yMax);
    // switch case for config AxisType
    // linear, log, percent change
    // call the util method

    switch(config.type) {
      case ScaleType.LINEAR: 
        axis = utils.generateLinearYAxis(yScale);

        break;

      case ScaleType.LOG: 
        axis = utils.generateLogYAxis(yScale);

        break;

      case ScaleType.PERCENT_CHANGE: 
        axis = utils.generatePercentChangeYAxis(yScale);

        break;
    }

    return axis;
  }

  // generateSeriesData(data: OHLCData[], extents: PaneExtents, config: ChartSeriesConfig) {
  generateSeriesData(config: ChartSeriesConfig, data: OHLCData[]) {
    console.log('cGS gSD input series config, data[0]: ', config, data[0]);
    let series = {};
    
    // we already have price and volume data so don't need to generate those
    switch(config.seriesType) {
      case Series.SMA: 
        series = utils.generateSMA(data);

        break;

      case Series.EMA: 
      series = utils.generateEMA(data);

        break;

      case Series.MACD: 
      series = utils.generateMACD(data);

        break;

      case Series.RSI: 
      series = utils.generateRSI(data);
        

        break;

      case Series.STOCHASTIC: 
        series = utils.generateStochastic(data);

        break;

      default: ;
    }

    return series;

  }

  generateSeriesRender(data: OHLCData[], type: ChartType) {
    console.log('cGS gSR input chart type, data[0]: ', type, data[0]);
    let render = {};
    switch(type) {
      case ChartType.LINE: 
        render = utils.generateLineSeries(data);

        break;

      case ChartType.CANDLESTICK: 
        render = utils.generateCandlestickSeries(data);
        

        break;

      case ChartType.BAR: 
        render = utils.generateBarSeries(data);

        break;

      default: ;
    }

    return render;
  }
}
