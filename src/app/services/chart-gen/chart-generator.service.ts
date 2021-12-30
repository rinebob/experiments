import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import * as d3 from 'd3';

import { OHLCData } from 'src/app/common/interfaces';
import { AxisConfig, ChartPaneConfig, ChartPanelConfig, Extents, PlotType, DomRectCoordinates, Indicator, PaneLayout, PanelDetails, PaneType, PaneLayerConfig, PlotConfig, PlotSeries, RenderablePane, RenderablePanel, ScaleLocation, ScaleType, SeriesName, TranslationCoord, SingleLineCoords } from 'src/app/common/interfaces_chart';
import { AXIS_THICKNESS, EXTENTS_HIGH_TARGET_MAP, EXTENTS_LOW_TARGET_MAP, MILLIS_IN_A_DAY, OHLC_INITIALIZER, PANE_HEIGHT_MATRIX} from '../../common/constants';
import * as utils from './chart_generator_utils';


@Injectable({
  providedIn: 'root'
})
export class ChartGeneratorService {

  readonly dataBS = new BehaviorSubject<OHLCData[]>([OHLC_INITIALIZER]);
  readonly datesMillisBS = new BehaviorSubject<number[]>([]);
  readonly datesBS = new BehaviorSubject<Date[]>([]);
  readonly datesWithRawMillisBS = new BehaviorSubject([])

  constructor() { }

  generateRenderablePanel(data: OHLCData[], panelConfig: ChartPanelConfig) {
    // console.log('cGS gRP start: ');
    // console.log('cGS gRP input data[0], panelConfig: ', data[0], panelConfig);
    // console.log('cGS gRP input panelConfig.containerDims:');
    // console.table(panelConfig.containerDims);

    this.dataBS.next(data);
    // this.datesBS.next(utils.generateDates(data));
    const dates = utils.generateDates(data)
    this.datesMillisBS.next(dates.datesMillisArray);
    this.datesBS.next(dates.datesArray);
    this.datesWithRawMillisBS.next(dates.datesWithRawMillis);

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
      // console.log('=======================================================');
      // console.log('============== START PANE: ', pane.paneNumber ,'=============');
      // console.log('cGS genPanel pane number: ', pane.paneNumber);
      // console.log('cGS genPanel start next origin: ', nextOrigin);
      
      const paneLayout = this.generatePaneLayout(pane, nextOrigin, panelConfig.containerDims, panelConfig.details)
      
      nextOrigin = {...nextOrigin, right: nextOrigin.right, down: nextOrigin.down + paneLayout.fullPaneHeight};
      
      const renderItem = this.generateRenderablePane(pane, paneLayout);
      
      renderPanel.append(() => renderItem.node());

      const renderablePane: RenderablePane = {
        layout: paneLayout,
        renderItem,
        config: panelConfig,
      };
      renderablePanel.panesMap.set(pane.paneNumber, renderablePane);
      // console.log('============== END PANE: ', pane.paneNumber ,'=============');
    }
    
    renderablePanel.renderPanel = renderPanel;
    
    // console.log('cGS generatePanel final renderPanel object: ', renderPanel);
    // console.log('cGS generatePanel final renderablePanel object: ', renderablePanel);
    
    return renderablePanel;
  }

  // generateDates(data: OHLCData[]) {
  //   const dates: number[] = [];
  //   const datesWithRawMillis = [];
  //   for (const datum of data) {
  //     const millis = Math.floor((new Date(datum.date).getTime()));
  //     const truncatedMillis = millis / (24 * 60 * 1000);
  //     dates.push(truncatedMillis);
  //     datesWithRawMillis.push(
  //       {
  //         rawDate: datum.date,
  //         millis,
  //         truncatedMillis
  //       }
  //     );

  //   }
  //   // console.log('cGS gD dates with raw millis:');
  //   // console.table(datesWithRawMillis);
  //   return dates;
  // }

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

  generateXAxis(xScale, extents: Extents, layout: PaneLayout, layerConfig: PaneLayerConfig) {
    // console.log('cGS gXA input extents, layout, axis config: ', extents, layout, config);
    let axis:d3.Axis;
    
    switch(layerConfig.xAxisConfig.type) {
      case ScaleType.DATE: 
        axis = utils.generateDateXAxis(xScale, layout, layerConfig);
        // console.log('cGS gXA genDateAxis final axis: ', axis);
        
        return axis;
      
      case ScaleType.FINANCE_DATE: 
        // axis = utils.generateFinanceTimeXAxis(xScale);
        // console.log('cGS gXA genFinTimeAxis axis - no op for now');
        // return axis;

        break;
    }
  }

  generateYScale(yMin: number, yMax: number, layout: PaneLayout, scaleType: ScaleType) {
    // console.log('cGS gYS input yMin/yMax/scaleType/layout: ', yMin, yMax, scaleType);
    // console.table(layout);

    let yScale: d3.Scale;

    switch(scaleType) {
      case ScaleType.LINEAR: 
        yScale = utils.generateLinearYScale(yMin, yMax, layout);
        
        // console.log('cGS gYS output linear yScale: ', yScale);

      break;

      case ScaleType.LOG: 
        yScale = utils.generateLogYScale(yMin, yMax, layout);
        
        // console.log('cGS gYS output log yScale: ', yScale);
      
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
    
    yAxis = utils.generateYAxis(yScale, layout, title, paneNumber, location);
    // console.log('cGS gYA output yAxis: ', yAxis);

    return yAxis;
  }
  
  generateSeriesData(series: PlotSeries, data: OHLCData[]) {
    // console.log('----------- gSD series:', series.seriesName,' ------------------');
    // console.log('cGS gSD series:');
    // console.table(series);
    // console.table(series.params);
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
        // console.log('cGS gSD ema.  output data[100]:');
        // console.table(seriesData[100]);
        this.dataBS.next(seriesData);
        break;
      
        case SeriesName.RSI: 
        // console.log('cGS gSD in rsi');
        seriesData = utils.generateRSI(data, series.params);
        this.dataBS.next(seriesData);
        break;

      case SeriesName.MACD: 
        // console.log('cGS gSD in macd');
        seriesData = utils.generateMACD(data, series.params);
        this.dataBS.next(seriesData);
        // console.log('cGS gSD macd ouput data:');
        // console.table(this.dataBS.value[100])
        break;

      case SeriesName.STOCHASTIC: 
        // console.log('cGS gSD in stoch');
        seriesData = utils.generateStochastic(data, series.params);
        this.dataBS.next(seriesData);
        break;

      case SeriesName.BOLLINGER_BANDS: 
      // console.log('cGS gSD in bb');
        seriesData = utils.generateBollingerBands(data, series.params);
        // console.log('cGS gSD bb.  output data[100]:');
        // console.table(seriesData[100]);
        this.dataBS.next(seriesData);
        break;

        // not an indicator so just return out
      default: return;
    }

    return seriesData;

  }

  generateRenderablePane(paneConfig: ChartPaneConfig, layout: PaneLayout) {
    // console.log('-------- gRL START GENERATE RENDERABLE PANE - Pane: ', paneConfig.paneNumber,' ----------------------------------');
    // console.log('cGS gRP paneConfig:');
    // console.table(paneConfig);

    const rect = d3.create('svg:rect')
        .attr('id', 'test-rect')
        .attr('transform', `translate(${AXIS_THICKNESS}, ${layout.paneOrigin.down + AXIS_THICKNESS})`)
        .attr('height', layout.chartIndHeight)
        .attr('width', AXIS_THICKNESS)
        .attr('stroke', 'white')
        .attr('fill', 'none')
        .attr('stroke-width', '1.5');
    
    const renderItem = d3.create('svg:g')
      .attr('id', `${paneConfig.idLabel}`);

    renderItem.append(() => rect.node())

    
      
    for (const layer of paneConfig.layerConfigs) {
      // console.log('cGS gRP layerConfig:');
      const renderableLayer = this.generateRenderableLayer(paneConfig, layout, layer);
      
      renderItem.append(() => renderableLayer.node());
    }

    // const tooltip = this.generateTooltip(paneConfig.idLabel, layout.paneOrigin);
    // console.log('cGS gRP tooltip: ', tooltip);

    // renderItem.append(() => tooltip.node());
    // renderItem.append(tooltip);
    
    
    // console.log('-------- gRL END GENERATE RENDERABLE PANE - Pane: ', paneConfig.paneNumber,' ----------------------------------');
    // return the root node (=renderable pane)
    return renderItem;
  }

  generateXYTracker(pane, paneNumber: number, xSc: d3.Scale, ySc: d3.Scale, layout: PaneLayout) {
    // console.log('cGS gXYT input paneId: ', paneId);
    // const pane = d3.select('#paneId');
    // console.log('cGS gXYT pane: ', pane);

    pane
      // .on('mousemove', (event, d) => {
      .on('mousemove', (event) => {
        console.log('------------------------ XY Tracker --------------------' );
        console.log('cGU gXYT -- paneId/x/y coords.  Pane-',paneNumber,' x:', d3.pointer(event)[0],' y:', d3.pointer(event)[1],' ----------------' );
        // crosshairs
        console.log('cGU gXYT x/y before axis thickness adjustment: ', d3.pointer(event)[0], d3.pointer(event)[1]);
        const pointerX = d3.pointer(event)[0] - AXIS_THICKNESS;
        const pointerY = d3.pointer(event)[1] - AXIS_THICKNESS;
        console.log('cGU gXYT x/y after axis thickness adjustment: ', pointerX, pointerY);
        console.log('cGU gXYT x/y diff: ', d3.pointer(event)[0] - pointerX, d3.pointer(event)[1] - pointerY);
        
        
        pane.selectAll('.crosshairs')
          .remove();
        
        const crosshairs = utils.generateCrosshairs(pointerX, pointerY, layout);

        console.log('cGS gXYT crosshairs: ', crosshairs);

        pane.append(() => crosshairs.node());

        
       

        // data window
        // const date = xSc.invert(d3.pointer(event)[0]);
        const date = xSc.invert(pointerX);
        const millis = date.getTime();

        console.log('cGS gXYT date/x millis: ', date, millis);
        const midnight = d3.timeDay(date);
        
        const midnightMillis = midnight.getTime();
        console.log('cGS gXYT midnight/millis: ', midnight, midnightMillis);
        
        
        const value = this.datesMillisBS.value.find(dt => dt === midnightMillis);
        const index = this.datesMillisBS.value.indexOf(value);
        console.log('cGS gXYT value, index: ', value ?? 'oh no value :(', index)
        console.log('cGS gXYT this.dataBS.value[index].close: ', this.dataBS.value[index] ? this.dataBS.value[index].close : 'ohh thats too bad no close... :( ');
        console.log('cGS gXYT this.dataBS.value[index]: ', this.dataBS.value[index]);
        // console.table(this.dataBS.value[index]);
        
    })
    .on('mouseleave', (event) => {
      pane.selectAll('.crosshairs')
        .remove();
    }

    )
    return pane;
}

  generateTooltip(target: string, origin: TranslationCoord) {
    // const tooltip = d3.create('svg:rect')
    //     .attr('height', '50px')
    //     .attr('width', '100px')
    //     .attr('fill', 'lightcyan')
    //     .attr('stroke', '1px solid black')
    //     .attr('transform', `translate(${origin.right}, ${origin.down})`)
    //     .html('dude its a tooltip!');

    const tooltip = d3.select(target)
      .append('div')
        .attr('height', '50px')
        .attr('width', '100px')
        .attr('fill', 'lightcyan')
        .attr('stroke', '1px solid black')
        .attr('transform', `translate(${origin.right}, ${origin.down})`)
        // .style('top', '100px')
        // .style('left', '100px')
        .html('dude its a tooltip!');

    return tooltip;
  }

  generateRenderableLayer(paneConfig: ChartPaneConfig, layout: PaneLayout, layerConfig: PaneLayerConfig) {
    // console.log('-------- gRL START GENERATE RENDERABLE LAYER ', layerConfig.title,' ----------------------------------');
    // console.log('--------------- gRL layer config: -------------------------------');
    // console.table(layerConfig);

    let renderItem = d3.create('svg:g')
      .attr('id', `${paneConfig.idLabel}-${layerConfig.idLabel}`);

    let xScale: d3.Scale;
    let yScale: d3.Scale;
    let extents: Extents;
    
    
    // console.log('---------------- gRL Generate Layer Data -------------------------------');
    
    
      // GENERATE DATA
      // generate data only if plot is derived value (ie not ohlcv ('primitive') data)
    // console.log('---------------- gRL start generate data series loop.  num series: ', layerConfig.series.length,' -------------------------------');
    for (const series of layerConfig.series) {
      // console.log('---------------- gRL Generating data for: ', series.seriesName,' -------------------------------');
      
    
      // console.log('cGS gPane pre generatePlotData dataBS.value[100]:');
      // console.table(this.dataBS.value[100]);
      
      const indicatorValues = Array.from(Object.values(Indicator));
      const seriesName = series.seriesName as unknown as Indicator;

      // console.log('cGS gRL O.values(Ind): ', indicatorValues);
      // console.log('cGS gRL includes seriesName: ', series.seriesName, indicatorValues.includes(seriesName));

      // generate series data only if series is an indicator (ie not ohlcv data)
      if (indicatorValues.includes(seriesName)) {
        const layerData = this.generateSeriesData(series, this.dataBS.value);

        // return a data set with all the necessary columns of data for the entire layer
        // push this new data set to BehaviorSubject

        this.dataBS.next(layerData)

        // console.log('cGS gRL with new layer data dataBS.value[100]:');
        // console.table((this.dataBS.value)[100]);

      }
      

      // console.log('---------------- gRL Generate Layer Extents -------------------------------');

      let minTarget, maxTarget;

      // TODO: replace hardcoded target strings with dynamically generated targets
      // when PanelConfig UI constructed
      if (series.seriesName === SeriesName.MACD) {
        let minExtentsTarget = `macd-macd-12-26-5`;
        let maxExtentsTarget = `macd-macd-12-26-5`;
        
        const macdExtents = utils.generateExtents(this.dataBS.value, minExtentsTarget, maxExtentsTarget);
        
        minExtentsTarget = `divergence-macd-12-26-5`;
        maxExtentsTarget = `divergence-macd-12-26-5`;
        
        const divExtents = utils.generateExtents(this.dataBS.value, minExtentsTarget, maxExtentsTarget);

        // console.log('cGS gRL macd/div extents: ');
        // console.table(macdExtents);
        // console.table(divExtents);

        minTarget = macdExtents.yMin < divExtents.yMin ? `macd-macd-12-26-5` : `divergence-macd-12-26-5`
        maxTarget = macdExtents.yMax > divExtents.yMax ? `macd-macd-12-26-5` : `divergence-macd-12-26-5`

      } else {
        minTarget = series.minExtentsTarget ?? EXTENTS_LOW_TARGET_MAP.get(series.seriesName);
        maxTarget = series.maxExtentsTarget ?? EXTENTS_HIGH_TARGET_MAP.get(series.seriesName);
      }

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
    
    // console.log('gRL final extents:');
    // console.table(extents);

    // GENERATE SCALES AND AXES
    // console.log('---------------- gRL Generate Layer X Scale and Axis -------------------------------');
    if (layerConfig.xAxisConfig.type !== ScaleType.NONE) {
        
      // generateXAxis(xScale, extents: Extents, layout: PaneLayout, series: Series, xAxisConfig: AxisConfig, paneConfig: ChartPaneConfig) {
      xScale = utils.generateXScale(extents.xMin, extents.xMax, layout);
      const xAxis = this.generateXAxis(xScale, extents, layout, layerConfig);
      
      renderItem.append(() => xAxis.node());

      // console.log('gRL final xScale/xAxis: ', xScale, xAxis);
    }




    // console.log('---------------- gRL Generate Layer Y Scale and Axis -------------------------------');
    if (layerConfig.yAxisConfig.type !== ScaleType.NONE) {
      yScale = this.generateYScale(extents.yMin, extents.yMax, layout, layerConfig.yAxisConfig.type);
      const yAxis = this.generateYAxis(yScale, extents, layout, layerConfig.idLabel, paneConfig.paneNumber, layerConfig.yAxisConfig.location);
          
      renderItem.append(() => yAxis.node());
    }


    // console.log('---------------- gRL Generate Gridlines -------------------------------');
    if (layerConfig.showGridlines) {
      const gridlines = utils.generateGridlines(xScale, yScale, this.datesBS.value, layerConfig, layout);
      // console.log('cGS gRL gridlines: ', gridlines);
      
      renderItem.append(() => gridlines.node());
    }




    // console.log('---------------- gRL Generate Indicator OB/OS/Zero Lines-------------------------------');
    if (!!layerConfig.upperLineLevel || !!layerConfig.lowerLineLevel || !!layerConfig.hasZeroLine) {
      const indicatorLines = utils.generateIndicatorLines(yScale, layerConfig, layout);

      renderItem.append(() => indicatorLines.node());

    }



    // console.log('---------------- gRL Generate XY Tracker -------------------------------');
    renderItem = this.generateXYTracker(renderItem, paneConfig.paneNumber, xScale, yScale, layout);
    


    // console.log('---------------------- gRL start generate plots series loop. num series: ', layerConfig.series.length,' --------------------------');
    for (const series of layerConfig.series) {
      // console.log('---------------------- gRL Series: ', series.seriesName,' --------------------------');

    
    
      // GENERATE PLOTS
      // console.log('---------------------- gRL start plot loop. num plots: ', series.plots.length,' --------------------------');
      for (const plot of series.plots) {
        // console.log('---------------------- gRL Plot: ', plot.plotName, plot.plotType,' -------------------------');
        // console.log('cGS gRL plotConfig:');
        // console.table(plot);
    
        const renderablePlot = this.generateRenderablePlot(this.dataBS.value, xScale, yScale, plot, paneConfig.paneNumber, layerConfig.layerNumber, plot.target);
        
        renderItem.append(() => renderablePlot.node());

        // console.log('---------------------- gRL End generate plot --------------------------');
      }
      // console.log('---------------------- gRL End series --------------------------');
    }
    // console.log('-------- gRL END GENERATE RENDERABLE LAYER ----------------------------------');

    return renderItem;
  }

  
  generateRenderablePlot(data: OHLCData[], xScale: d3.xScale, yScale: d3.yScale, plotConfig: PlotConfig, paneNumber: number, layerNumber: number, target: string) {
      // console.log('cGS gRP paneNum/target/extents: ', paneNumber, target);
      // console.table(extents);
  
      const renderItem = d3.create('svg:g')
        .attr('id', `pane${paneNumber}-layer${layerNumber}-${plotConfig.plotName}`);
  
      let render;
  
      switch(plotConfig.plotType) {
        case PlotType.LINE: 
        // console.log('cGS gRP in type=line');
          render = utils.generateLineSeries(data, xScale, yScale, plotConfig, paneNumber, layerNumber, target);
  
          break;
  
        case PlotType.CANDLESTICK: 
        render = utils.generateCandlestickSeries(data, xScale, yScale, plotConfig, paneNumber, layerNumber);
          
  
          break;
  
        case PlotType.OHLCBAR: 
        render = utils.generateOHLCBarSeries(data, xScale, yScale, plotConfig, paneNumber, layerNumber);
  
          break;

        case PlotType.BAR: 
          render = utils.generateBarSeries(data, xScale, yScale, plotConfig, paneNumber, layerNumber, target);
  
          break;
  
        default: ;
      }
      renderItem.append(() => render.node());
      // console.log('cGS gSR OUTPUT RENDER ITEM: ', render);

      return renderItem;
  }
}
