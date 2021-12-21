import { Injectable } from '@angular/core';
import { axisBottom } from 'd3fc';
import { BehaviorSubject, config } from 'rxjs';

import * as d3 from 'd3';

import { OHLCData } from 'src/app/common/interfaces';
import { AxisConfig, ChartPaneConfig, ChartPanelConfig, ChartSeriesConfig, ChartType, DomRectCoordinates, PaneExtents, PaneLayout, PanelDetails, PaneType, RenderablePane, RenderablePanel, ScaleLocation, ScaleType, Series, TranslationCoord } from 'src/app/common/interfaces_chart';
import { AXIS_THICKNESS, PANE_HEIGHT_MATRIX} from '../../common/constants';
import * as utils from './chart_generator_utils';
import { D3fcComponent } from 'src/app/experiments/d3fc/d3fc.component';


@Injectable({
  providedIn: 'root'
})
export class ChartGeneratorService {

  private svg;
  private g;

  constructor() { }

  // rename to generateRenderablePanel
  generatePanel(data: OHLCData[], panelConfig: ChartPanelConfig) {
    console.log('cGS gPanel start: ');
    // console.log('cGS gPanel input data[0], panelConfig: ', data[0], panelConfig);
    // console.log('cGS gPanel input panelConfig.containerDims:');
    // console.table(panelConfig.containerDims);


    const panelDetails = this.generatePanelDetails(panelConfig);
    panelConfig.details = {...panelDetails};
    let nextOrigin = {...panelConfig.details.panelOrigin};

    const renderablePanel: RenderablePanel = {
      panelConfig: panelConfig,
      panesMap: new Map<number, RenderablePane>()
    };

    // create root svg node for entire panel
    const renderPanel = d3.create('svg')
      .attr('width', panelConfig.containerDims.width)
      .attr('height', panelConfig.containerDims.height)
      .attr('id', panelConfig.title);

    // call the for of on each ChartPaneConfig object in the panelConfig.panes property
    for (const pane of panelConfig.panes) {
      console.log('-----------------------------------------------');
      console.log('cGS genPanel pane number: ', pane.paneNumber);
        
      const paneLayout = this.generatePaneLayout(pane, nextOrigin, panelConfig.containerDims, panelConfig.details)
      nextOrigin = {right: nextOrigin.right, down: nextOrigin.down + paneLayout.fullPaneHeight};

      const renderItem = this.generateRenderItem(data, pane, paneLayout);
      const testRenderItem = this.generateTestRenderItem(pane, paneLayout, panelDetails);

      // const itemWidth = renderItem._groups[0].viewportElement.clientWidth;
      // const itemHeight = renderItem._groups[0].viewportElement.clientHeight;
      
      
      // const item = renderItem._groups[0];
      // console.log('cGS gP item: ', item)

      // for (const [key, value] of Object.entries(item)) {
        // console.log('cGS gP item key: ', key)
        // console.log('cGS gP item value: ', value)

      // }


      // renderPanel.append(() => testRenderItem.node());
      renderPanel.append(() => renderItem.node());

      const renderablePane: RenderablePane = {
        layout: paneLayout,
        renderItem,
        config: panelConfig,
      };
      renderablePanel.panesMap.set(pane.paneNumber, renderablePane);
    }
    
    renderablePanel.renderPanel = renderPanel;
    
    // console.log('cGS generatePanel final renderPanel object: ', renderPanel);
    // console.log('cGS generatePanel final renderablePanel object: ', renderablePanel);
    
    return renderablePanel;
  }

  generatePanelDetails(panelConfig: ChartPanelConfig) {
    // console.log('cGS genPanelDeets panelConfig.panes: ', panelConfig.panes);
    // console.log('cGS genPanelDeets input container w/h: ', panelConfig.containerDims.height, panelConfig.containerDims.height);

    let chartPresent = false;
    let chartHeight, chartPaneHeight, numIndicatorPanes, indicatorHeight, singleIndicatorPaneHeight, 
    chartIndWidth, fullPaneWidth; 
    
    const panelHeight = panelConfig.containerDims.height - panelConfig.containerDims.margin.top - panelConfig.containerDims.margin.bottom;
    const panelWidth = panelConfig.containerDims.width - panelConfig.containerDims.margin.left - panelConfig.containerDims.margin.right;

    // initialize panelOrigin and nextOrigin vars as TranslationCoord objects
    const panelOrigin: TranslationCoord = {
      right: panelConfig.containerDims.margin.left,
      down: panelConfig.containerDims.margin.top
    };

    for (const pane of panelConfig.panes) {
      // console.log('cGS genPanelDeets paneType: ', pane.paneType);
      if (pane.paneType === PaneType.CHART) {
        chartPresent = true;
        break;
      }
    }

    if (chartPresent) {
      numIndicatorPanes = panelConfig.panes.length - 1;
      chartPaneHeight = Math.floor((PANE_HEIGHT_MATRIX.get(panelConfig.panes.length) * panelHeight));
      chartHeight = chartPaneHeight - (AXIS_THICKNESS * 2);
      const remainingHeight = panelHeight - chartPaneHeight;

      singleIndicatorPaneHeight = Math.floor(remainingHeight / numIndicatorPanes);
      indicatorHeight = singleIndicatorPaneHeight - (AXIS_THICKNESS * 2);

    } else {
      numIndicatorPanes = panelConfig.panes.length;
      chartPaneHeight = 0;
      chartHeight = 0;
      singleIndicatorPaneHeight = Math.floor(panelConfig.containerDims.height / numIndicatorPanes);
      indicatorHeight = singleIndicatorPaneHeight - (AXIS_THICKNESS * 2);

    }

    fullPaneWidth = panelConfig.containerDims.width - panelConfig.containerDims.margin.left - panelConfig.containerDims.margin.right;
    chartIndWidth = fullPaneWidth - (AXIS_THICKNESS * 2);

    // panelHeight = panelHeight + indicatorHeight;
    // panelWidth = panelConfig.containerDims.width + (AXIS_THICKNESS * 2);
    
    const panelDetails: PanelDetails = {
      panelOrigin,
      chartPresent,
      chartHeight,
      chartPaneHeight,
      numIndicatorPanes,
      indicatorHeight,
      singleIndicatorPaneHeight,
      chartIndWidth,
      fullPaneWidth,
      panelHeight,
      panelWidth,
    }

    // console.log('cGS genPanelDeets final panel details:');
    // console.table(panelDetails);


    return panelDetails;

  }

  generatePaneLayout(config: ChartPaneConfig, origin: TranslationCoord, container: DomRectCoordinates, details: PanelDetails) {
    // console.log('cGS gPL origin/config/container: ', origin, config, container);
    // const width = container.width - container.margin.left - container.margin.right;
    const fullPaneHeight = config.paneType === PaneType.CHART ? details.chartPaneHeight : details.singleIndicatorPaneHeight;
    const chartIndHeight = config.paneType === PaneType.CHART ? details.chartHeight : details.indicatorHeight;
    
    const paneLayout: PaneLayout = {
      paneNumber: config.paneNumber,
      fullPaneWidth: details.fullPaneWidth,
      fullPaneHeight,
      chartIndHeight,
      chartIndWidth: details.chartIndWidth,
      paneOrigin: {right: origin.right + AXIS_THICKNESS, down: origin.down + AXIS_THICKNESS},
      topAxisOrigin: {right: origin.right + AXIS_THICKNESS, down: origin.down},
      rightAxisOrigin: {right: origin.right + details.fullPaneWidth - AXIS_THICKNESS, down: origin.down + AXIS_THICKNESS},
      bottomAxisOrigin: {right: origin.right + AXIS_THICKNESS, down: origin.down + AXIS_THICKNESS + chartIndHeight},
      leftAxisOrigin: {right: origin.right, down: origin.down + AXIS_THICKNESS},

    };
    // console.log('cGS gPL final pane layout pane number: ', config.paneNumber);
    // console.table(paneLayout);

    return paneLayout;


  }

  generateTestRenderItem(paneConfig: ChartPaneConfig, layout: PaneLayout, details: PanelDetails) {
    // console.log('cGS gTRI paneConfig: ', paneConfig);
    // console.log('cGS gTRI layout:');
    // console.table(layout);
    
    // create pane root group node
    // const renderItem = d3.create('svg')
    //   .attr('id', paneConfig.title);
    const renderItem = d3.create('svg:g')
      .attr('id', paneConfig.title);

    // console.log('cGS gTRI root svg: ', renderItem);

    // for each series of paneConfig series
    for (const config of paneConfig.seriesConfigs) {

         // create chart/indicator rect
      const pane = renderItem.append('rect')
        .attr('height', layout.chartIndHeight)
        .attr('width', layout.chartIndWidth)
        .attr('fill', 'blue')
        .attr('stroke', 'yellow')
        .attr('id', `${config.seriesType}-pane-${paneConfig.paneNumber}`)
        // .attr('x', layout.paneOrigin.right)
        // .attr('y', layout.paneOrigin.down)
        .attr('transform', `translate(${layout.paneOrigin.right}, ${layout.paneOrigin.down})`);

        // console.log('cGS gTRI chart/ind pane: ', pane);
      
      if (config.xAxisConfig) {

        const xAxisLocation = config.xAxisConfig.location;
        const xAxisTransform = xAxisLocation === ScaleLocation.TOP ? layout.topAxisOrigin : layout.bottomAxisOrigin;
        // console.log('cGS gTRI xAxis location/transform: ', xAxisLocation, xAxisTransform)

          // generate x axis rect
        const xAxisRect = renderItem.append('rect')
          .attr('height', AXIS_THICKNESS)
          .attr('width', details.chartIndWidth)
          .attr('fill', 'green')
          .attr('stroke', 'white')
          .attr('id', `${config.seriesType}-xAxis-${paneConfig.paneNumber}`)
          // .attr('x', xAxisTransform.right)
          // .attr('y', xAxisTransform.down)
          .attr('transform', `translate(${xAxisTransform.right}, ${xAxisTransform.down})`);

        // console.log('cGS gTRI xAxisRect:');
        // console.table(xAxisRect);

      }

      if (config.yAxisConfig) {
        const yAxisLocation = config.yAxisConfig.location;
        const yAxisTransform = yAxisLocation == ScaleLocation.LEFT ? layout.leftAxisOrigin : layout.rightAxisOrigin;

        // console.log('cGS gTRI yAxis location/transform: ', yAxisLocation, yAxisTransform)
        
        // generate y axis rect
        const yAxisRect = renderItem.append('rect')
          .attr('height', layout.chartIndHeight)
          .attr('width', AXIS_THICKNESS)
          .attr('fill', 'red')
          .attr('stroke', 'black')
          .attr('id', `${config.seriesType}-yAxis-${paneConfig.paneNumber}`)
          // .attr('x', yAxisTransform.right)
          // .attr('y', yAxisTransform.down)
          .attr('transform', `translate(${yAxisTransform.right}, ${yAxisTransform.down})`);
          
          // console.log('cGS gTRI yAxisRect:');
          // console.log(yAxisRect);
      }
    }

    // console.log('cGS gTRI final renderItem: ', renderItem);

    return renderItem;
  }

  // const renderItem = this.generateRenderItem(data, pane, paneLayout);
  generateRenderItem(data: OHLCData[], paneConfig: ChartPaneConfig, layout: PaneLayout) {
    
    console.log('-----------------------------------------------');
    console.log('cGS gPane paneConfig:');
    console.table(paneConfig);
    // console.log('cGS gPane layout:');
    // console.table(layout);
    
    // create pane root group node
    const renderItem = d3.create('svg:g')
      .attr('id', paneConfig.title);

    // generate pane dimensions
    const extents: PaneExtents = utils.generateExtents(data);
    // console.log('cGS gPane output extents:');
    console.table({...extents});

    // for each series of paneConfig series array
    for (const config of paneConfig.seriesConfigs) {
      console.log('cGS gPane series config:');
      console.table(config);

      // generate x axis if present
      if (config.xAxisConfig.type !== ScaleType.NONE) {
        const xAxis = this.generateXAxis(extents, layout, config, paneConfig);
        // console.log('cGS gRI final xAxis: ', xAxis);

        renderItem.append(() => xAxis.node());
      }
      
            
      // generate y axis if present
      if (config.yAxisConfig.type !== ScaleType.NONE) {
        const yAxis = this.generateYAxis(extents, layout, config, paneConfig);
        // console.log('cGS gRI final yAxis: ', yAxis);
        
        renderItem.append(() => yAxis.node());
      }
      
      // generate indicator series data (price data is ohlcv)
      // now there are series types for all of ohlc 
      // and 'price' but that will be deprecated

      // const series = this.generateSeriesData(config, data);
      // console.log('cGS gRI generated series: ', series);

      // how to handle the existing ohlcv data object and the newly
      // created indicator data?
      // look at what comes back...

      // const seriesRender = this.generateSeriesRender(data, config.displayConfig.chartType, config.seriesType, paneConfig.paneNumber, layout);
      const seriesRender = this.generateSeriesRender(data, config, paneConfig.paneNumber, layout);

      
      // // append series render item
      renderItem.append(() => seriesRender.node());

      // generate and append annotations
      
    }

    return renderItem;
  }

  generateXAxis(extents: PaneExtents, layout: PaneLayout, config: ChartSeriesConfig, paneConfig: ChartPaneConfig) {
    // console.log('cGS gXA input extents, layout, axis config: ', extents, layout, config);
    let axis:d3.Axis;
    const xScale = utils.generateXScale(extents.xMin, extents.xMax, layout.chartIndWidth);
    
    switch(config.xAxisConfig.type) {
      case ScaleType.DATE: 
      // genDateXAxis needs axis origin also
        axis = utils.generateDateXAxis(xScale, layout, config.seriesType, paneConfig.paneNumber, config.xAxisConfig.location);
        // console.log('cGS gXA genDateAxis final axis: ', axis);
        
        return utils.generateDateXAxis(xScale, layout, config.seriesType, paneConfig.paneNumber, config.xAxisConfig.location);
      
      case ScaleType.FINANCE_DATE: 
        // axis = utils.generateFinanceTimeXAxis(xScale);
        // console.log('cGS gXA genFinTimeAxis axis - no op for now');
        // return utils.generateFinanceTimeXAxis(xScale);

        break;
    }
  }

  generateYScale(yMin: number, yMax: number, chartIndHeight: number, scaleType: ScaleType) {
    console.log('cGS gYS input yMin/yMax/chartIndHeight/scaleType: ', yMin, yMax, chartIndHeight, scaleType);

    let yScale: d3.Scale;

    switch(scaleType) {
      case ScaleType.LINEAR: 
        yScale = utils.generateLinearYScale(yMin, yMax, chartIndHeight);
        
        // console.log('cGS gYS output linear yScale: ', yScale);

      break;

      case ScaleType.LOG: 
        yScale = utils.generateLogYScale(yMin, yMax, chartIndHeight);
        
        // console.log('cGS gYS output log yScale: ', yScale);
      
      break;
    }

    return yScale;

  }

  generateYAxis(extents: PaneExtents, layout: PaneLayout, config: ChartSeriesConfig, paneConfig: ChartPaneConfig) {
    console.log('cGS gYA input axis config/layout/extents:');
    console.table(config);
    console.table(layout);
    console.table(extents);
    let yAxis: d3.Axis;
    let yScale: d3.Scale;
    
    switch(config.yAxisConfig.type) {
      case ScaleType.LINEAR: 
        yScale = utils.generateLinearYScale(extents.yMin, extents.yMax, layout.chartIndHeight);
        // axis = utils.generateLinearYAxis(yScale, layout.paneOrigin, config.seriesType, paneConfig.paneNumber, config.yAxisConfig.location);
        // console.log('cGS gYA output linear yScale: ', yScale);

        break;

      case ScaleType.LOG: 
        yScale = utils.generateLogYScale(extents.yMin, extents.yMax, layout.chartIndHeight);
        // axis = utils.generateLogYAxis(yScale, layout.paneOrigin, config.seriesType, paneConfig.paneNumber, config.yAxisConfig.location);

        // console.log('cGS gYA output log yScale: ', yScale);
        
        break;
        
        // Percent Change will use a linear y scale.  Only the data will be different.  
        // don't need to create a pct chg scale
        
    }
      
    yAxis = utils.generateYAxis(yScale, layout, config.seriesType, paneConfig.paneNumber, config.yAxisConfig.location);
    // console.log('cGS gYA output yAxis: ', yAxis);

    return yAxis;
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

  // generateSeriesRender(data: OHLCData[], type: ChartType, series: Series, paneNumber: number, layout: PaneLayout) {
  generateSeriesRender(data: OHLCData[], config: ChartSeriesConfig, paneNumber: number, layout: PaneLayout) {
    console.log('cGS gSR pane/series: ', paneNumber, config.seriesType);
    
    const extents: PaneExtents = utils.generateExtents(data);
    const xScale = utils.generateXScale(extents.xMin, extents.xMax, layout.chartIndWidth);
    const yScale = this.generateYScale(extents.yMin, extents.yMax, layout.chartIndHeight, config.yAxisConfig.type);
    
    let render;
    
    switch(config.displayConfig.chartType) {
      case ChartType.LINE: 
        render = utils.generateLineSeries(data, xScale, yScale, config.seriesType, paneNumber, layout.paneOrigin);

        break;

      case ChartType.CANDLESTICK: 
      render = utils.generateCandlestickSeries(data, xScale, yScale, config.seriesType, paneNumber, layout.paneOrigin);
        

        break;

      case ChartType.BAR: 
      render = utils.generateBarSeries(data, xScale, yScale, config.seriesType, paneNumber, layout.paneOrigin);

        break;

      default: ;
    }

    console.log('cGS gSR OUTPUT RENDER ITEM: ', render);

    return render;
  }
}
