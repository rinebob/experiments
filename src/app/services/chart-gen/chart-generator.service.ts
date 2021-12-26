import { Injectable } from '@angular/core';
import { axisBottom } from 'd3fc';
import { BehaviorSubject, config } from 'rxjs';

import * as d3 from 'd3';

import { OHLCData } from 'src/app/common/interfaces';
import { AxisConfig, ChartPaneConfig, ChartPanelConfig, ChartSeriesConfig, PlotType, DomRectCoordinates, Indicator, PlotName, Extents, PaneLayout, PanelDetails, PaneType, RenderablePane, RenderablePanel, ScaleLocation, ScaleType, SeriesName, TranslationCoord, PaneLayerConfig, PlotConfig, PlotSeries } from 'src/app/common/interfaces_chart';
import { AXIS_THICKNESS, EXTENTS_HIGH_TARGET_MAP, EXTENTS_LOW_TARGET_MAP, INDICATOR_LINES_MAP, OHLC_INITIALIZER, PANE_HEIGHT_MATRIX} from '../../common/constants';
import * as utils from './chart_generator_utils';
import { D3fcComponent } from 'src/app/experiments/d3fc/d3fc.component';
import { layer } from '@fortawesome/fontawesome-svg-core';
import { title } from 'process';


@Injectable({
  providedIn: 'root'
})
export class ChartGeneratorService {

  private svg;
  private g;

  readonly dataBS = new BehaviorSubject<OHLCData[]>([OHLC_INITIALIZER]);

  constructor() { }

  // rename to generateRenderablePanel
  generatePanel(data: OHLCData[], panelConfig: ChartPanelConfig) {
    console.log('cGS gPanel start: ');
    // console.log('cGS gPanel input data[0], panelConfig: ', data[0], panelConfig);
    // console.log('cGS gPanel input panelConfig.containerDims:');
    // console.table(panelConfig.containerDims);

    this.dataBS.next(data);

    const panelDetails = this.generatePanelDetails(panelConfig);
    panelConfig.details = {...panelDetails};

    const renderablePanel: RenderablePanel = {
      panelConfig: panelConfig,
      panesMap: new Map<number, RenderablePane>()
    };

    // create root svg node for entire panel.  This is the dimensions of the entire container
    // Panel origin is offset right = margin.left, down = margin.top
    const renderPanel = d3.create('svg')
      .attr('width', panelConfig.containerDims.width)
      .attr('height', panelConfig.containerDims.height)
      .attr('id', panelConfig.title);

    let nextOrigin = {...panelConfig.details.panelOrigin};

    for (const pane of panelConfig.panes) {
      console.log('=======================================================');
      console.log('============== START PANE: ', pane.paneNumber ,'=============');
      // console.log('cGS genPanel pane number: ', pane.paneNumber);
      // console.log('cGS genPanel start next origin: ', nextOrigin);
      
      const paneLayout = this.generatePaneLayout(pane, nextOrigin, panelConfig.containerDims, panelConfig.details)
      
      nextOrigin = {...nextOrigin, right: nextOrigin.right, down: nextOrigin.down + paneLayout.fullPaneHeight};
      
      // const renderItem = this.generateRenderItem(this.dataBS.value, pane, paneLayout);

      // revision for Pane Layer model
      // instead of directly generating render items, generate a renderable pane
      const renderItem = this.generateRenderablePane(pane, paneLayout);
      
      renderPanel.append(() => renderItem.node());

      const renderablePane: RenderablePane = {
        layout: paneLayout,
        renderItem,
        config: panelConfig,
      };
      renderablePanel.panesMap.set(pane.paneNumber, renderablePane);
      console.log('============== END PANE: ', pane.paneNumber ,'=============');
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

  generatePaneLayout(config: ChartPaneConfig, nextOrigin: TranslationCoord, container: DomRectCoordinates, details: PanelDetails) {
    // console.log('cGS gPL input origin/config/container: ', nextOrigin, config, container);
    const width = container.width - container.margin.left - container.margin.right;
    const fullPaneHeight = config.paneType === PaneType.CHART ? details.chartPaneHeight : details.singleIndicatorPaneHeight;
    const chartIndHeight = config.paneType === PaneType.CHART ? details.chartHeight : details.indicatorHeight;
    
    // const paneLayout: PaneLayout = {
    //   paneNumber: config.paneNumber,
    //   fullPaneWidth: details.fullPaneWidth,
    //   fullPaneHeight,
    //   chartIndHeight,
    //   chartIndWidth: details.chartIndWidth,
    //   paneOrigin: {right: nextOrigin.right, down: nextOrigin.down},
    //   dataOrigin: {right: nextOrigin.right + AXIS_THICKNESS, down: nextOrigin.down + AXIS_THICKNESS},
    //   topAxisOrigin: {right: nextOrigin.right, down: nextOrigin.down},
    //   rightAxisOrigin: {right: nextOrigin.right + details.fullPaneWidth - AXIS_THICKNESS, down: nextOrigin.down},
    //   bottomAxisOrigin: {right: nextOrigin.right, down: nextOrigin.down + AXIS_THICKNESS + chartIndHeight},
    //   leftAxisOrigin: {right: nextOrigin.right, down: nextOrigin.down},
    // };

    const paneLayout: PaneLayout = {
      paneNumber: config.paneNumber,
      fullPaneWidth: details.fullPaneWidth,
      fullPaneHeight,
      chartIndHeight,
      chartIndWidth: details.chartIndWidth,
      paneOrigin: {right: nextOrigin.right, down: nextOrigin.down},
      dataOrigin: {right: nextOrigin.right + AXIS_THICKNESS, down: nextOrigin.down + AXIS_THICKNESS},
      topAxisOrigin: {right: nextOrigin.right  + AXIS_THICKNESS, down: nextOrigin.down + AXIS_THICKNESS},
      rightAxisOrigin: {right: nextOrigin.right + details.fullPaneWidth - AXIS_THICKNESS, down: nextOrigin.down + AXIS_THICKNESS},
      bottomAxisOrigin: {right: nextOrigin.right + AXIS_THICKNESS, down: nextOrigin.down + AXIS_THICKNESS + chartIndHeight},
      leftAxisOrigin: {right: nextOrigin.right + AXIS_THICKNESS, down: nextOrigin.down + AXIS_THICKNESS},

    };
    // console.log('cGS gPL final pane layout pane number: ', config.paneNumber);
    // console.table(paneLayout);

    return paneLayout;


  }

  generateRenderItem(data: OHLCData[], paneConfig: ChartPaneConfig, layout: PaneLayout) {
    
    console.log('-------- gRI START GENERATE RENDER ITEM Pane: ', paneConfig.paneNumber,' ----------------------------------');
    // console.log('cGS gPane paneConfig:');
    // console.table(paneConfig);
    // console.log('cGS gPane layout:');
    // console.table(layout);
    

    const renderItem = d3.create('svg:g')
      .attr('id', paneConfig.title);

    let xScale: d3.Scale;
    let yScale: d3.Scale;

    console.log('--------------- gRI start config of seriesConfigs  -------------------------------');
    for (const config of paneConfig.seriesConfigs) {
      console.log('--------------- gRI Config: ', config.seriesType,' -------------------------------');
      console.log('cGS gPane series config:');
      console.table(config);



      console.log('---------------- gRI Generate Series Data ', config.seriesType,' -------------------------------');
      const seriesData = this.generateSeriesData(config.seriesType, this.dataBS.value);

      // this.dataBS.next(seriesData);

      console.log('cGS gPane dataBS.value[100]:');
      console.table(this.dataBS.value[100]);



      console.log('---------------- gRI Generate Extents ', config.seriesType,' -------------------------------');
      const minTarget = EXTENTS_LOW_TARGET_MAP.get(config.seriesType);
      const maxTarget = EXTENTS_HIGH_TARGET_MAP.get(config.seriesType);

      

      const extents: Extents = utils.generateExtents(this.dataBS.value, minTarget, maxTarget);

      console.log('---------------- gRI Generate X Scale and Axis -------------------------------');
      if (config.xAxisConfig.type !== ScaleType.NONE) {
        
        xScale = utils.generateXScale(extents.xMin, extents.xMax, layout);
        const xAxis = this.generateXAxis(xScale, extents, layout, config.xAxisConfig, paneConfig);
        
        renderItem.append(() => xAxis.node());
      }
      
      console.log('---------------- gRI Generate Y Scale and Axis -------------------------------');
      if (config.yAxisConfig.type !== ScaleType.NONE) {
        
    
        yScale = this.generateYScale(extents.yMin, extents.yMax, layout, config.yAxisConfig.type);
        // const yAxis = this.generateYAxis(yScale, extents, layout, config, paneConfig);
        
        // renderItem.append(() => yAxis.node());
      }
      
      console.log('---------------- gRI Generate Series Render -------------------------------');

      const multiline = [...INDICATOR_LINES_MAP.keys()].includes(config.seriesType);
      const lines = multiline ? INDICATOR_LINES_MAP.get(config.seriesType) : [config.seriesType];

      for (const line of lines) {
        
        console.log('---------------------- gRI Line: ', line ,' --------------------------');

        const seriesRender = this.generateSeriesRender(this.dataBS.value, xScale, yScale, extents, config, paneConfig.paneNumber, layout, line);
        console.log('cGS gPane returned seriesRender to append: ', seriesRender);
        
        // renderItem.append(() => seriesRender.node());
      }

      console.log('---------------------- gRI End config: ', config.seriesType,' --------------------------');
    }

    console.log('-------- gRI END GENERATE RENDER ITEM Pane: ', paneConfig.paneNumber,' ----------------------------------');
    return renderItem;
  }

  generateXAxis(xScale, extents: Extents, layout: PaneLayout, xAxisConfig: AxisConfig, paneConfig: ChartPaneConfig) {
    // console.log('cGS gXA input extents, layout, axis config: ', extents, layout, config);
    let axis:d3.Axis;
    
    // switch(config.xAxisConfig.type) {
    //   case ScaleType.DATE: 
    //     axis = utils.generateDateXAxis(xScale, layout, config.seriesType, paneConfig.paneNumber, config.xAxisConfig.location);
    //     // console.log('cGS gXA genDateAxis final axis: ', axis);
        
    //     return utils.generateDateXAxis(xScale, layout, config.seriesType, paneConfig.paneNumber, config.xAxisConfig.location);
      
    //   case ScaleType.FINANCE_DATE: 
    //     // axis = utils.generateFinanceTimeXAxis(xScale);
    //     // console.log('cGS gXA genFinTimeAxis axis - no op for now');
    //     // return utils.generateFinanceTimeXAxis(xScale);

    //     break;
    // }
    switch(xAxisConfig.type) {
      case ScaleType.DATE: 
        axis = utils.generateDateXAxis(xScale, layout, paneConfig, xAxisConfig.location);
        // console.log('cGS gXA genDateAxis final axis: ', axis);
        
        return utils.generateDateXAxis(xScale, layout, paneConfig, xAxisConfig.location);
      
      case ScaleType.FINANCE_DATE: 
        // axis = utils.generateFinanceTimeXAxis(xScale);
        // console.log('cGS gXA genFinTimeAxis axis - no op for now');
        // return utils.generateFinanceTimeXAxis(xScale);

        break;
    }
  }

  generateYScale(yMin: number, yMax: number, layout: PaneLayout, scaleType: ScaleType) {
    console.log('cGS gYS input yMin/yMax/scaleType/layout: ', yMin, yMax, scaleType);
    console.table(layout);

    let yScale: d3.Scale;

    switch(scaleType) {
      case ScaleType.LINEAR: 
        yScale = utils.generateLinearYScale(yMin, yMax, layout);
        
        console.log('cGS gYS output linear yScale: ', yScale);

      break;

      case ScaleType.LOG: 
        yScale = utils.generateLogYScale(yMin, yMax, layout);
        
        console.log('cGS gYS output log yScale: ', yScale);
      
      break;
    }

    return yScale;

  }

  generateYAxis(yScale, extents: Extents, layout: PaneLayout, title: string, paneNumber: number, location: ScaleLocation) {
    // console.log('cGS gYA input axis config/layout/extents:');
    // console.table(config);
    // console.table(layout);
    // console.table(extents);
    let yAxis: d3.Axis;
    // let yScale: d3.Scale;
    
    yAxis = utils.generateYAxis(yScale, layout, title, paneNumber, location);
    // console.log('cGS gYA output yAxis: ', yAxis);

    return yAxis;
  }
  
  // generateSeriesData(config: ChartSeriesConfig, data: OHLCData[]) {
  generateSeriesData(series: SeriesName, data: OHLCData[]) {
    console.log('----------- gSD series:', series,' ------------------');
    console.log('cGS gSD config:');
    console.table(config);
    let seriesData;
    
    // console.log('cGS gSD input data[100]:');
    // console.table(data[100]);
    
    // we already have price and volume data so don't need to generate those
    // switch(config.seriesType) {
    switch(series) {
      case SeriesName.SMA: 
        // console.log('cGS gSD in sma');
        // seriesData = utils.generateSMA(data);
        // this.dataBS.next(seriesData);
        break;

      case SeriesName.EMA: 
        // console.log('cGS gSD in ema');
        // seriesData = utils.generateEMA(data);
        // this.dataBS.next(seriesData);
        break;

      case SeriesName.MACD: 
        console.log('cGS gSD in macd');
        // seriesData = utils.generateMACD(data);
        // this.dataBS.next(seriesData);
        // console.log('cGS gSD macd ouput data:');
        // console.table(this.dataBS.value[100])
        break;

      case SeriesName.RSI: 
        console.log('cGS gSD in rsi');
        // seriesData = utils.generateRSI(data);
        // this.dataBS.next(seriesData);
        break;

      case SeriesName.STOCHASTIC: 
        console.log('cGS gSD in stoch');
        // seriesData = utils.generateStochastic(data);
        // this.dataBS.next(seriesData);
        break;

      case SeriesName.BOLLINGER_BANDS: 
      console.log('cGS gSD in bb');
        // seriesData = utils.generateBollingerBands(data);
        // this.dataBS.next(seriesData);
        break;

        // not an indicator so just return out
      default: return;
    }

    return seriesData;

  }

  generateSeriesRender(data: OHLCData[], xScale, yScale, extents: Extents, config: ChartSeriesConfig, paneNumber: number, layout: PaneLayout, target: string) {
    console.log('cGS gSR pane/series/extents: ', paneNumber, config.seriesType);
    console.table(extents);
    
    // const xScale = utils.generateXScale(extents.xMin, extents.xMax, layout);
    // const yScale = this.generateYScale(extents.yMin, extents.yMax, layout, config.yAxisConfig.type);
    // console.log('cGS gSR yScale: ', yScale);
    
    let render;
    
    switch(config.displayConfig.chartType) {
      case PlotType.LINE: 
      console.log('cGS gSR in type=line');

      // BREAKING CHANGE: utils.generateLineSeries now takes a plotConfig instead of a ChartSeriesConfig
        // render = utils.generateLineSeries(data, xScale, yScale, config, paneNumber, layout, target);

        break;

      case PlotType.CANDLESTICK: 
      // render = utils.generateCandlestickSeries(data, xScale, yScale, config, paneNumber, layout);
        

        break;

      case PlotType.OHLCBAR: 
      // render = utils.generateBarSeries(data, xScale, yScale, config, paneNumber, layout);

        break;

      default: ;
    }

    console.log('cGS gSR OUTPUT RENDER ITEM: ', render);

    return render;
  }

  generateSeriesData2(series: PlotSeries, data: OHLCData[]) {
    console.log('----------- gSD2 series:', series.seriesName,' ------------------');
    console.log('cGS gSD2 series:');
    console.table(series);
    console.table(series.params);
    let seriesData;
    
    // console.log('cGS gSD input data[100]:');
    // console.table(data[100]);
    
    // we already have price and volume data so don't need to generate those
    // switch(config.seriesType) {
    switch(series.seriesName) {
      case SeriesName.SMA: 
        // console.log('cGS gSD in sma');
        seriesData = utils.generateSMA(data, series.params);
        this.dataBS.next(seriesData);
        break;

      case SeriesName.EMA: 
        // console.log('cGS gSD in ema');
        seriesData = utils.generateEMA(data, series.params);
        console.log('cGS gSD2 ema.  output data[100]:');
        console.table(seriesData[100]);
        this.dataBS.next(seriesData);
        break;
      
        case SeriesName.RSI: 
        console.log('cGS gSD in rsi');
        seriesData = utils.generateRSI(data, series.params);
        this.dataBS.next(seriesData);
        break;

      case SeriesName.MACD: 
        console.log('cGS gSD in macd');
        seriesData = utils.generateMACD(data, series.params);
        this.dataBS.next(seriesData);
        // console.log('cGS gSD macd ouput data:');
        // console.table(this.dataBS.value[100])
        break;

      case SeriesName.STOCHASTIC: 
        console.log('cGS gSD in stoch');
        seriesData = utils.generateStochastic(data, series.params);
        this.dataBS.next(seriesData);
        break;

      case SeriesName.BOLLINGER_BANDS: 
      console.log('cGS gSD in bb');
        seriesData = utils.generateBollingerBands(data, series.params);
        console.log('cGS gSD2 bb.  output data[100]:');
        console.table(seriesData[100]);
        this.dataBS.next(seriesData);
        break;

        // not an indicator so just return out
      default: return;
    }

    return seriesData;

  }

    // revision for Pane Layer model
    // instead of directly generating render items, generate a renderable pane
    // for each pane, generate a renderable layer
    
  generateRenderablePane(paneConfig: ChartPaneConfig, layout: PaneLayout) {
    console.log('-------- gRL START GENERATE RENDERABLE PANE - Pane: ', paneConfig.paneNumber,' ----------------------------------');
    console.log('cGS gRP paneConfig:');
    console.table(paneConfig);
    
    // create a group element as root node
    const renderItem = d3.create('svg:g')
      .attr('id', `pane-${paneConfig.title}`);
    
    for (const layer of paneConfig.layerConfigs) {
      console.log('cGS gRP layerConfig:');
      const renderableLayer = this.generateRenderableLayer(paneConfig, layout, layer);
      
      // append the renderable layer to the root node
      renderItem.append(() => renderableLayer.node());
    }
    
    
    console.log('-------- gRL END GENERATE RENDERABLE PANE - Pane: ', paneConfig.paneNumber,' ----------------------------------');
    // return the root node (=renderable pane)
    return renderItem;
  }

  // for each layer, generate all necessary data, a renderable xAxis, yAxis, all lines, annotations, gridlines and crosshairs

  generateRenderableLayer(paneConfig: ChartPaneConfig, layout: PaneLayout, layerConfig: PaneLayerConfig) {
    console.log('-------- gRL START GENERATE RENDERABLE LAYER ', layerConfig.title,' ----------------------------------');
    console.log('--------------- gRL layer config: -------------------------------');
    console.table(layerConfig);

    const renderItem = d3.create('svg:g')
      .attr('id', layerConfig.title);

    let xScale: d3.Scale;
    let yScale: d3.Scale;
    let extents: Extents;
    
    
    console.log('---------------- gRL Generate Layer Data -------------------------------');
    
    
      // GENERATE DATA
      // generate data only if plot is derived value (ie not ohlcv ('primitive') data)
    console.log('---------------- gRL start generate data series loop.  num series: ', layerConfig.series.length,' -------------------------------');
    for (const series of layerConfig.series) {
      console.log('---------------- gRL Generating data for: ', series.seriesName,' -------------------------------');
      
    
      console.log('cGS gPane pre generatePlotData dataBS.value[100]:');
      console.table(this.dataBS.value[100]);
      
      const indicatorValues = Array.from(Object.values(Indicator));
      const seriesName = series.seriesName as unknown as Indicator;

      console.log('cGS gRL O.values(Ind): ', indicatorValues);
      console.log('cGS gRL includes seriesName: ', series.seriesName, indicatorValues.includes(seriesName));

      // generate series data only if series is an indicator (ie not ohlcv data)
      if (indicatorValues.includes(seriesName)) {
        const layerData = this.generateSeriesData2(series, this.dataBS.value);

        // return a data set with all the necessary columns of data for the entire layer
        // push this new data set to BehaviorSubject

        this.dataBS.next(layerData)

        console.log('cGS gRL with new layer data dataBS.value[100]:');
        console.table((this.dataBS.value)[100]);

      }
      

      console.log('---------------- gRL Generate Extents -------------------------------');


      const minTarget = series.minExtentsTarget ?? EXTENTS_LOW_TARGET_MAP.get(series.seriesName);
      const maxTarget = series.maxExtentsTarget ?? EXTENTS_HIGH_TARGET_MAP.get(series.seriesName);


      console.log('cGS gRL minTarget/maxTarget: ', minTarget, maxTarget);
      extents = utils.generateExtents(this.dataBS.value, minTarget, maxTarget);

      if (layerConfig.upperRangeLimit && layerConfig.lowerRangeLimit) {
        // console.log('gRL extents:');
        // console.table(extents);
          // EXTENTS - BOUNDED
          // if layer based on bounded domain (ie rsi, stoch) use upper/lower rangeLimit values
        extents.yMax = layerConfig.upperRangeLimit;
        extents.yMin = layerConfig.lowerRangeLimit;

      }
      
    }
    
    console.log('gRL final extents:');
    console.table(extents);

    // GENERATE SCALES AND AXES
    console.log('---------------- gRL Generate Layer X Scale and Axis -------------------------------');
    if (layerConfig.xAxisConfig.type !== ScaleType.NONE) {
        
      // generateXAxis(xScale, extents: Extents, layout: PaneLayout, series: Series, xAxisConfig: AxisConfig, paneConfig: ChartPaneConfig) {
      xScale = utils.generateXScale(extents.xMin, extents.xMax, layout);
      const xAxis = this.generateXAxis(xScale, extents, layout, layerConfig.xAxisConfig, paneConfig);
      
      renderItem.append(() => xAxis.node());

      console.log('gRL final xScale/xAxis: ', xScale, xAxis);
    }









    console.log('---------------- gRL Generate Layer Y Scale and Axis -------------------------------');
    if (layerConfig.yAxisConfig.type !== ScaleType.NONE) {
      yScale = this.generateYScale(extents.yMin, extents.yMax, layout, layerConfig.yAxisConfig.type);
      const yAxis = this.generateYAxis(yScale, extents, layout, layerConfig.title, paneConfig.paneNumber, layerConfig.yAxisConfig.location);
          
      renderItem.append(() => yAxis.node());

      console.log('gRL final yScale/yAxis: ', yScale, yAxis);
    }






    console.log('---------------------- gRL start generate plots series loop. num series: ', layerConfig.series.length,' --------------------------');
    for (const series of layerConfig.series) {
      console.log('---------------------- gRL Series: ', series.seriesName,' --------------------------');

    
    
      // GENERATE PLOTS
      console.log('---------------------- gRL start plot loop. num plots: ', series.plots.length,' --------------------------');
      for (const plot of series.plots) {
        console.log('---------------------- gRL Plot: ', plot.plotName, plot.plotType,' -------------------------');
        console.log('cGS gRL plotConfig:');
        console.table(plot);
    
    

        
        



        // generateRenderablePlot(data: OHLCData[], xScale: d3.xScale, yScale: d3.yScale, extents: Extents, plot: PlotConfig, paneNumber: number, layout: PaneLayout, target: string) {
        const renderablePlot = this.generateRenderablePlot(this.dataBS.value, xScale, yScale, extents, plot, paneConfig.paneNumber, layout, plot.target);

        // append the plot to the root node
        renderItem.append(() => renderablePlot.node());

        console.log('---------------------- gRL End generate plot --------------------------');
    
    
    
    
    
    
    
    
      }
      console.log('---------------------- gRL End series --------------------------');
    }
    console.log('-------- gRL END GENERATE RENDERABLE LAYER ----------------------------------');

    return renderItem;
  }

  
    generateRenderablePlot(data: OHLCData[], xScale: d3.xScale, yScale: d3.yScale, extents: Extents, plot: PlotConfig, paneNumber: number, layout: PaneLayout, target: string) {
      console.log('cGS gRP paneNum/target/extents: ', paneNumber, target);
      console.table(extents);
  
      // create a group element as a root node
      const renderItem = d3.create('svg:g')
        .attr('id', `pane-${paneNumber}-plot-${plot.plotName}`);
  
      let render;
  
      switch(plot.plotType) {
        case PlotType.LINE: 
        console.log('cGS gRP in type=line');
          render = utils.generateLineSeries(data, xScale, yScale, plot, paneNumber, layout, target);
  
          break;
  
        case PlotType.CANDLESTICK: 
        // render = utils.generateCandlestickSeries(data, xScale, yScale, config, paneNumber, layout);
          
  
          break;
  
        case PlotType.OHLCBAR: 
        // render = utils.generateBarSeries(data, xScale, yScale, config, paneNumber, layout);
  
          break;
  
        default: ;
      }
        
      renderItem.append(() => render.node());
      console.log('cGS gSR OUTPUT RENDER ITEM: ', render);

      return renderItem;
  
      
  
    }

 


}
