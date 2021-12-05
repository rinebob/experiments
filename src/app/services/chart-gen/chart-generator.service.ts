import { Injectable } from '@angular/core';
import { axisBottom } from 'd3fc';

import { OHLCData } from 'src/app/common/interfaces';
import { AxisConfig, ChartPaneConfig, ChartPanelConfig, ChartSeriesConfig, ChartType, SeriesConfig, PaneExtents, ScaleType, Series } from 'src/app/common/interfaces_chart';
import * as utils from './chart_generator_utils';

@Injectable({
  providedIn: 'root'
})
export class ChartGeneratorService {

  constructor() { }

  generatePanel(data: OHLCData[], panelConfig: ChartPanelConfig) {
    // create root group node for entire panel
    const root = document.createElement('g');

    // for each pane of panelConfig panes
    for (const pane of panelConfig.panes) {
      // generate pane
      const chartPane = this.generatePane(data, pane);

      // append each pane to the node in the proper location
      root.append(chartPane);
    }
    // return the entire panel to the calling component
    return root;
  }

  generatePane(data: OHLCData[], paneConfig: ChartPaneConfig) {
    // create pane root group node
    const pane = document.createElement('g');

    // generate pane dimensions
    const extents: PaneExtents = utils.generateExtents(data);

    // generate x axis
    const xAxis = this.generateXAxis(extents, paneConfig.xAxisConfig);
    // append x axis
    pane.append(xAxis);
    
    // generate y axis
    const yAxis = this.generateYAxis(extents, paneConfig.yAxisConfig)
    // append y axis
    pane.append(yAxis);

    // for each series of paneConfig series
    for (const series of paneConfig.series) {
      // generate series
      const seriesData = this.generateSeriesData(extents, series);
      // append series

      const render = this.generateSeriesRender(extents, seriesData);

      pane.append(render);

    }
    // generate annotations
    // append annotations

    // return the pane group node 
    return pane;
  }

  generateXAxis(extents: PaneExtents, config: AxisConfig) {
    const root = document.createElement('g');
    const axis = {};
    // switch case for config AxisType
    // nearly always will be date axis 
    // call the util method
    const xScale = utils.generateXScale(extents.xMin, extents.xMax);
    
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
    const root = document.createElement('g');
    const axis = {};
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

  generateSeriesData(data: OHLCData[], extents: PaneExtents, config: ChartSeriesConfig) {
    const series = {};
    
    // we already have price and volume data so don't need to generate those
    switch(config.series.type) {
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
    const render = {};
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
