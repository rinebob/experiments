import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import * as d3 from 'd3';

import { OHLCData } from 'src/app/common/interfaces';
import { AxisConfig, ChartPaneConfig, ChartPanelConfig, Extents, PlotType, DomRectCoordinates, Indicator, PaneAnnotationConfig, PaneLayout, PanelDetails, PanelOptions, PaneType, PaneLayerConfig, PlotConfig, Series, RenderablePane, RenderablePanel, ScaleLocation, ScaleType, SeriesAnnotationConfig, SeriesLabel, SeriesName, TranslationCoord, SingleLineCoords } from 'src/app/common/interfaces_chart';
import { AXIS_THICKNESS, EXTENTS_HIGH_TARGET_MAP, EXTENTS_LOW_TARGET_MAP, MILLIS_IN_A_DAY, OHLC_INITIALIZER, PANE_HEIGHT_MATRIX, PRICE_SERIES} from '../../common/constants';
import * as utils from './chart_generator_utils';
import { pointer } from 'd3fc';


@Injectable({
  providedIn: 'root'
})
export class ChartGeneratorService {
  
  readonly dataBS = new BehaviorSubject<OHLCData[]>([OHLC_INITIALIZER]);
  readonly datesMillisBS = new BehaviorSubject<number[]>([]);
  readonly datesBS = new BehaviorSubject<Date[]>([]);
  readonly datesWithRawMillisBS = new BehaviorSubject([]);
  readonly annotationsConfigBS = new BehaviorSubject<PaneAnnotationConfig[]>([]);
  readonly paneLayoutsBS = new BehaviorSubject<PaneLayout[]>([]);
  readonly activePaneNumberBS = new BehaviorSubject<number>(1);
  
  constructor() { }

  getActivePane() {
    console.log('cGS gAP get active pane called.  t.aPNBS.v: ', this.activePaneNumberBS.value);
    return this.activePaneNumberBS.value;

  }

  generateRenderablePanel(data: OHLCData[], panelConfig: ChartPanelConfig, options?: PanelOptions) {
    // console.log('-----------------------  cGS gR Panel Start  ---------------');
    // console.log('cGS gRP input data[0], panelConfig: ', data[0], panelConfig);
    // console.log('cGS gRP input panelConfig.containerDims:');
    // console.table(panelConfig.containerDims);

    if (!panelConfig.containerDims) {
      console.log('cGS gRP dude no container dims!  outta here!');
      return;
    }

    this.dataBS.next(data);
    // this.datesBS.next(utils.generateDates(data));
    const dates = utils.generateDates(data)
    this.datesMillisBS.next(dates.datesMillisArray);
    this.datesBS.next(dates.datesArray);
    this.datesWithRawMillisBS.next(dates.datesWithRawMillis);

    const panelDetails = this.generatePanelDetails(panelConfig);
    panelConfig.details = {...panelDetails};

    console.log('cGS gRP panel details:');
    console.table(panelDetails);

    const renderablePanel: RenderablePanel = {
      panelConfig: panelConfig,
      panesMap: new Map<number, RenderablePane>()
    };

    // create root svg node for entire panel.  This is the dimensions of the entire container
    // Panel origin is offset right = margin.left, down = margin.top
    const renderPanel = d3.create('svg')
      .attr('width', panelConfig.containerDims.width)
      .attr('height', panelConfig.containerDims.height)
      .attr('id', 'root-panel');

    // origin point for each pane.  Updated dynamically for each pane to create stack
    let nextOrigin = {...panelConfig.details.panelOrigin};

    // generate all annotations for entire panel.  They'll be added in generateRenderablePane
    const annotationsList = this.generateAnnotationsList(panelConfig);
    this.annotationsConfigBS.next(annotationsList);

    const paneLayouts: PaneLayout[] = [];

    for (const pane of panelConfig.panes) {
      // console.log('=======================================================');
      // console.log('============== START PANE: ', pane.paneNumber ,'=============');
      // console.log('cGS genPanel pane number: ', pane.paneNumber);
      // console.log('cGS genPanel start next origin: ', nextOrigin);
      
      const paneLayout = this.generatePaneLayout(pane, nextOrigin, panelConfig.containerDims, panelConfig.details);
      paneLayouts.push(paneLayout);
      
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

    this.paneLayoutsBS.next(paneLayouts);

    if (options && options.showCrosshairs === true) {
      const panelCrosshairs = utils.generatePanelCrosshairs(this.paneLayoutsBS.value);
      // console.log('cGS gRP panelCrosshairs: ', panelCrosshairs);

      renderPanel.append(() => panelCrosshairs.node());

      // console.log('-------- cGS gRPanel horzLine click listener setup ---------');
      // const horzLine = panelCrosshairs.select('#panel-crosshairs-x');
      // console.log('horzLine: ', horzLine);

      // horzLine.on('click', (event) => {
      //   const paneNumber = this.getPaneNumberFromClick(event);
      //   this.activePaneNumberBS.next(paneNumber);
      //   console.log('cGS gRPanel click listener paneNo/t.aPNBS.v: ', paneNumber, this.activePaneNumberBS.value);
      // });

    }

    renderPanel.on('mousemove', (event) => {
      this.handleMouseMove(event, panelDetails, panelConfig.panes);
    });

    // renderPanel.on('click', (event) => {
      // this.setFocusPane(event);
      // console.log('cGS gRP typeof/event: ', typeof event, event);
    // });
    
    renderablePanel.renderPanel = renderPanel;
    
    // console.log('cGS generatePanel final renderPanel object: ', renderPanel);
    // console.log('cGS generatePanel final renderablePanel object: ', renderablePanel);

    return renderablePanel;
  }

  getPaneNumberFromClick(event: PointerEvent) {
    console.log('----   cGS gPNFC called:')
    const layouts = this.paneLayoutsBS.value;

    const pointerY = d3.pointer(event)[1];
    console.log('cGU gPNFC panel pointer y:', pointerY);
    
    let paneNumber = 1;
    
    for (const layout of layouts) {
      // console.log('cGS gPNFC paneNo/layout: ', layout.paneNumber)
      // console.table(layout)
      
      const inThisPaneVertically = pointerY > layout.paneOrigin.down && pointerY < layout.paneOrigin.down + layout.chartIndHeight;
      if (inThisPaneVertically) {
        paneNumber = layout.paneNumber;
        break;
        
      }
    }
    
    console.log('cGU gPNFC final pane number:', paneNumber);
    return paneNumber
  }

  handleMouseMove(event: MouseEvent, panelDetails: PanelDetails, paneConfigs: ChartPaneConfig[]) {
    // console.log('cGU gPXYT panel x/y coords. x:', d3.pointer(event)[0],' y:', d3.pointer(event)[1]);
    const pointerX = d3.pointer(event)[0] - AXIS_THICKNESS;
    const pointerY = d3.pointer(event)[1] - AXIS_THICKNESS;
    // console.log('cGU gPXYT panel pointer x/y:', pointerX, pointerY);

    // this will return xScale(pointerX) and the index of this date in the data BS
    const xDetails = this.getXDetails(pointerX, panelDetails);

    const data = this.dataBS.value[xDetails.index];

    for (const paneConfig of paneConfigs) {
      
      if (data) {
        // console.log('cGS gRP calling update annotations for pane: ', paneConfig.paneNumber);
        this.updateAnnotationsElements(paneConfig.paneNumber, data);
      } 
    }

    this.updatePanelCrosshairs(pointerX, pointerY, panelDetails);
  }

  generatePanelDetails(panelConfig: ChartPanelConfig) {
    // console.log('cGS genPanelDeets panelConfig: ', panelConfig);
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

  generateAnnotationsList(panelConfig: ChartPanelConfig) {
    const annotationsList = [];

    for (const paneConfig of panelConfig.panes) {
      // console.log('cGS gAL paneNumber: ', paneConfig.paneNumber);

      const paneAnnotation: PaneAnnotationConfig = {
        pane: paneConfig.paneNumber,
        seriesAnnotations: [],
      };
      
      for (const layerConfig of paneConfig.layerConfigs) {
        // console.log('cGS gAL layerNumber: ', layerConfig.layerNumber);
        
        for (const series of layerConfig.series) {
          console.log('cGS gAL series name: ', series.seriesName);

          if (series.seriesName === SeriesName.PRICE) {
            const annotation: SeriesAnnotationConfig = {
              seriesName: SeriesName.PRICE,
              seriesLabel: SeriesLabel.PRICE,
            }
            paneAnnotation.seriesAnnotations.push(annotation);
          }
          
          if (!!series.params) {
            const annotation: SeriesAnnotationConfig = {
              seriesName: series.seriesName,
              seriesLabel: series.seriesLabel,
              params: [],
              plots: [],
            }
            for (const param of series.params.values()) {
              // console.log('cGS gAL param name/value: ', param.name, param.value);
              annotation.params.push(param);
            }
            for (const plot of series.plots.values()) {
              // console.log('cGS gAL plot name/target: ', plot.plotName, plot.target);
              annotation.plots.push(plot);
            }
            paneAnnotation.seriesAnnotations.push(annotation);
          }
        }
      }
      annotationsList.push(paneAnnotation)
    }

    // console.log('cGS gAL final annotations list: ', annotationsList);
    return annotationsList;
  }

  generateAnnotationElements(config: PaneAnnotationConfig, layout: PaneLayout, data: OHLCData){
    if (!config) return;
    const LEFT_MARGIN = 10;
    const LINE_HEIGHT = 16;
    let vertCount = 1;
    
    const renderItem = d3.create('svg:g')
      .attr('id', `pane-${config.pane}-annotations`);

    // console.log('cGS gAE annotations for pane: ', config.pane);

    // Date annotation for all panes
    const dateGroup = d3.create('svg:g')
          .attr('id', `pane-${config.pane}-ann-group-date`)
          ;

    // const dateTextString = `Date: ${data.stringDate}`;
    const dateTextString = `Date: ${data.index}`;

    const dateText =  d3.create('svg:text')
      .attr('id', `pane-${config.pane}-ann-date`)
      .attr('font-size', '10px')
      .attr('transform', `translate(${AXIS_THICKNESS + LEFT_MARGIN}, ${AXIS_THICKNESS + vertCount * LINE_HEIGHT + layout.paneOrigin.down})`)
      .text(dateTextString)
      // .attr('fill', 'white')
      .attr('fill', 'black')
      ;

    dateGroup.append(() => dateText.node());
    renderItem.append(() => dateGroup.node());

    vertCount++;
    
    for (const seriesAnnotation of config.seriesAnnotations) {
      // console.log('cGS gAE series for annotation: ', seriesAnnotation.seriesName);
      
      if (seriesAnnotation.seriesName === SeriesName.PRICE) {
        const priceGroup = d3.create('svg:g')
          .attr('id', `ann-group-price`);

        const priceTextString = `Price open: ${data.open} high: ${data.high} low: ${data.low} close: ${data.close}`;

        const priceText =  d3.create('svg:text')
          .attr('id', `ann-price`)
          .attr('font-size', '10px')
          .attr('transform', `translate(${AXIS_THICKNESS + LEFT_MARGIN}, ${AXIS_THICKNESS + vertCount * LINE_HEIGHT + layout.paneOrigin.down})`)
          .text(priceTextString)
          // .attr('fill', 'white')
          .attr('fill', 'black')
          ;

        priceGroup.append(() => priceText.node());
        renderItem.append(() => priceGroup.node());
      }

      if (!!seriesAnnotation.params) {

        const group = d3.create('svg:g')
          .attr('id', `ann-group-${seriesAnnotation.seriesLabel}`);

        let textString = `${seriesAnnotation.seriesName}: `;

        const params = seriesAnnotation.params;
        const plots = seriesAnnotation.plots

        for (let i = 0; i < params.length; i++) {
          const param = params[i];
          textString = textString + ` ${param.name}: ${param.value}`;
        }

        textString += ' | ';

        for (let i = 0; i < plots.length; i++) {
          const plot = plots[i];
          textString = textString + `${plot.target}: ${data[plot.target] ?? 'no value'}`;
          if (i < plots.length - 1) {textString += ' | ';}
        }
        const text =  d3.create('svg:text')
          .attr('id', `ann-${seriesAnnotation.seriesLabel}`)
          .attr('font-size', '10px')
          .attr('transform', `translate(${AXIS_THICKNESS + LEFT_MARGIN}, ${AXIS_THICKNESS + vertCount * LINE_HEIGHT + layout.paneOrigin.down})`)
          .text(textString)
          // .attr('fill', `${plots[0].color}` ?? 'white')
          .attr('fill', `${plots[0].color}` ?? 'black')
          ;
          
          group.append(() => text.node());
          renderItem.append(() => group.node());
      }

      vertCount++;
      
    }
    return renderItem;
  }

  updateAnnotationsElements(paneNumber: number, data: OHLCData) {
    if (!data) return;
    // console.log('------------------ cGS uAE pane/date: ', paneNumber, data.stringDate.split(',')[0],' -------------------');
    const config = this.annotationsConfigBS.value.find(config => config.pane === paneNumber);

    const pane = d3.select(`#pane-${paneNumber}`);

    // console.log('cGS uAE pane: ', pane);
    // console.log('cGS uAE data: ', data);
    
    for (const [key, value] of Object.entries(data)) {
      if (typeof value === 'number') {
        data[key] = Number(value.toFixed(3));
      }
    }
    
    // const elements = pane.select(`#pane-${config.pane}-annotations`);
    // console.log('cGS gAE existing elements: ', elements);

    const existingDateGroup = pane.select(`#pane-${paneNumber}-ann-group-date`);
    // console.log('cGS gAE existing date group: ', existingDateGroup);
    
    // const dateOnlyText = data.stringDate.split(',')[0];
    const dateOnlyText = data.index;
    // console.log('cGS gAE string date/dateOnlyText: ', data.stringDate, dateOnlyText);
    // const dateTextString = `Date: ${data.stringDate}`;
    const dateTextString = `Date: ${dateOnlyText}`;
    // console.log('cGS uAE date newString: ', dateTextString);
    
    existingDateGroup.select('text')
      .text(dateTextString);

    // console.log('cGS gAE updated date group: ', existingDateGroup);

    for (const seriesAnnotation of config.seriesAnnotations) {

      if (seriesAnnotation.seriesName === SeriesName.PRICE) {
        const existingPriceGroup = pane.select(`#ann-group-price`)
        // console.log('cGS gAE existing price group: ', existingPriceGroup);
        
        const priceTextString = `Price open: ${data.open} high: ${data.high} low: ${data.low} close: ${data.close}`;
        // console.log('cGS uAE start priceTextString: ', priceTextString);
  
        existingPriceGroup.select('text')
          .text(priceTextString);
        
        // console.log('cGS gAE updated price group: ', existingPriceGroup);

      }

      if (!!seriesAnnotation.params) {
        // console.log('---------------------', seriesAnnotation.seriesLabel,' -------------------');

        // line series plot id format
        // `pane${paneNumber}-layer${layerNumber}-${target}`

        const existingGroup = pane.select(`#ann-group-${seriesAnnotation.seriesLabel}`);
        // console.log('cGS gAE existing group for: ', seriesAnnotation.seriesLabel, existingGroup);
        
        let textString = `${seriesAnnotation.seriesName}: `;
        // console.log('cGS uAE start param textString: ', textString);
        
        const params = seriesAnnotation.params;
        const plots = seriesAnnotation.plots
        
        for (let i = 0; i < params.length; i++) {
          const param = params[i];
          // console.log('cGS gAE for loop i: ', i);
          
          const newString = ` ${param.name}: ${param.value}`;
          // console.log('cGS uAE param newString: ', newString);

          textString = textString + newString;
        }

        textString += ' | ';

        for (let i = 0; i < plots.length; i++) {
          const plot = plots[i];
          // console.log('cGS gAE for loop i: ', i);
          
          const newString = `${plot.target}: ${data[plot.target] ?? 'no value'}`;
          // console.log('cGS uAE plot newString: ', newString);
          
          textString = textString + newString;
          if (i < plots.length - 1) {textString += ' | ';}
        }

        // console.log('cGS uAE final param textString: ', textString);

        existingGroup.select('text')
          .text(textString);

      }
    }
  }

  generatePaneLayout(config: ChartPaneConfig, nextOrigin: TranslationCoord, container: DomRectCoordinates, details: PanelDetails) {
    // console.log('cGS gPL input origin/config/container: ', nextOrigin, config, container);
    const width = container.width - container.margin.left - container.margin.right;
    const fullPaneHeight = config.paneType === PaneType.CHART ? details.chartPaneHeight : details.singleIndicatorPaneHeight;
    const chartIndHeight = config.paneType === PaneType.CHART ? details.chartHeight : details.indicatorHeight;
    
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
    console.log('cGS gXA input extents, layout, layer config: ', extents, layout, layerConfig);
    let axis:d3.Axis;
    
    switch(layerConfig.xAxisConfig.type) {
      case ScaleType.DATE: 
        axis = utils.generateDateXAxis(xScale, layout, layerConfig);
        console.log('cGS gXA genDateXAxis final axis: ', axis);
        
        return axis;

      case ScaleType.LINEAR: 
        axis = utils.generateLinearXAxis(xScale, layout, layerConfig);
        console.log('cGS gXA genLinearXAxis final axis: ', axis);
        
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
  
  generateSeriesData(series: Series, data: OHLCData[]) {
    // console.log('----------- cGS gSD series:', series.seriesName,' ------------------');
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

    // console.log('cGS gSD final seriesData.slice(100, 101):')
    // console.table(seriesData.slice(100, 101))

    return seriesData;

  }

  generateRenderablePane(paneConfig: ChartPaneConfig, layout: PaneLayout) {
    // console.log('-------- gRL START GENERATE RENDERABLE PANE - Pane: ', paneConfig.paneNumber,' ----------------------------------');
    // console.log('cGS gRP paneConfig:');
    // console.table(paneConfig);
    // console.log('cGS gRP paneConfig id label: ', paneConfig.idLabel);

    const focusRect = d3.create('svg:rect')
        .classed('focus-rect', true)
        .attr('id', `pane-${paneConfig.paneNumber}-focus-rect`)
        .attr('height', layout.chartIndHeight)
        .attr('width', layout.chartIndWidth)
        // .attr('stroke', 'red')
        .attr('fill', 'rgba(0, 0, 0, 0)')
        .attr('z-index', 100)
        .attr('data-pane-number', paneConfig.paneNumber)
        .attr('transform', `translate(${AXIS_THICKNESS + layout.paneOrigin.right}, ${AXIS_THICKNESS + layout.paneOrigin.down})`)
        
        ;
    
    const renderItem = d3.create('svg:g')
      .attr('id', `${paneConfig.idLabel}`)
      // .attr('data-pane-number', paneConfig.paneNumber)
      // .attr('data-pane-name', 'pane name dude!')
      ;

    

    // generate annotations elements for this pane BEFORE the plots are appended
    // append them after the plots though, so they are on top of the lines
    const config = this.annotationsConfigBS.value.find(config => config.pane === paneConfig.paneNumber);
    // const annotationsElements = this.generateAnnotationElements(config, layout, OHLC_INITIALIZER);

    for (const layer of paneConfig.layerConfigs) {
      // console.log('cGS gRP layerConfig:');
      const renderableLayer = this.generateRenderableLayer(paneConfig, layout, layer);
      
      renderItem.append(() => renderableLayer.node());
    }

    // const tooltip = this.generateTooltip(paneConfig.idLabel, layout.paneOrigin);
    // console.log('cGS gRP tooltip: ', tooltip);

    // renderItem.append(() => tooltip.node());
    // renderItem.append(tooltip);

    // generate above, append here
    // renderItem.append(() => annotationsElements.node());

    // renderItem.append(() => focusRect.node());
    
    // console.log('-------- gRL END GENERATE RENDERABLE PANE - Pane: ', paneConfig.paneNumber,' ----------------------------------');
    // return the root node (=renderable pane)
    return renderItem;
  }


  getXDetails(pointerX: number, panelDetails: PanelDetails) {
    // console.log('cGS gXD input pointerX: ', pointerX);
    const xMin = this.dataBS.value[0].date;
    // console.log('cGS gXD xMin: ', xMin);
    const xMax = this.dataBS.value[this.dataBS.value.length - 1].date;
    // console.log('cGS gXD xMax: ', xMax);

    const xSc = d3
      .scaleTime()
      .domain([xMin, xMax])
      // .range([AXIS_THICKNESS, AXIS_THICKNESS + panelDetails.chartIndWidth])
      .range([0, panelDetails.chartIndWidth])
      .nice();

    // data window
    // const date = xSc.invert(d3.pointer(event)[0]);
    const date = xSc.invert(pointerX);
    const millis = date.getTime();
    // console.log('cGS gXD date/x millis: ', date, millis);

    const midnight = d3.timeDay(date);
    const midnightMillis = midnight.getTime();
    // console.log('cGS gXD midnight/millis: ', midnight, midnightMillis);
    
    
    const value = this.datesMillisBS.value.find(dt => dt === midnightMillis);
    const index = this.datesMillisBS.value.indexOf(value);
    // console.log('cGS gXD millis value/index: ', value, index);

    return {date, index};

  }

  updatePanelCrosshairs(pointerX: number, pointerY: number, panelDetails: PanelDetails) {
    // console.log('------------------------ cGS uPC update crosshairs pX/pY: ', pointerX, pointerY,' --');
    const horzCoords = {x1: 0, y1: pointerY, x2: panelDetails.chartIndWidth, y2: pointerY};
    // console.log('cGS uPC horz coords: ', horzCoords);
    // console.log('cGS uPC horz/vert coords:');
    // console.table(horzCoords);
    const horzLine = d3.select('#panel-crosshairs-x')
      .attr('x1', horzCoords.x1)
      .attr('y1', horzCoords.y1)
      .attr('x2', horzCoords.x2)
      .attr('y2', horzCoords.y2)
      
      ;

    for (const layout of this.paneLayoutsBS.value) {
      const vertCoords = {x1: pointerX, y1: layout.paneOrigin.down + layout.chartIndHeight, x2: pointerX, y2: layout.paneOrigin.down};
      // console.log('cGS uPC layout:');
      // console.table(layout);
      // console.log('cGS uPC vert coords: ', vertCoords);
      // console.log('cGS uPC vert coords:');
      // console.table(vertCoords);

      
      const vertLine = d3.select(`#panel-crosshairs-y-pane-${layout.paneNumber}`)
        .attr('x1', vertCoords.x1)
        .attr('y1', vertCoords.y1)
        .attr('x2', vertCoords.x2)
        .attr('y2', vertCoords.y2)
      ;
      
    }

    const inAPaneVertically = [];

    for (const layout of this.paneLayoutsBS.value) {
      const inThisPaneVertically = pointerY > layout.paneOrigin.down && pointerY < layout.paneOrigin.down + layout.chartIndHeight;
      // console.log('cgS uPC inThisPane: ', inThisPaneVertically);
      inAPaneVertically.push(inThisPaneVertically);

    }

    const inPaneHorizontally = pointerX > 0 && pointerX < panelDetails.chartIndWidth;
    // console.log('cgS uPC showHorz: ', inPaneHorizontally);
    
    const inAnyPaneVertically = inAPaneVertically.includes(true)
    // console.log('cgS uPC inAPane/showVert: ', inAPaneVertically, inAnyPaneVertically);
    
    let showHorz = true;
    let showVert = true;
    // console.log('cgS uPC inPaneHorz/inAnyPaneVert: ', inPaneHorizontally, inAnyPaneVertically);
    // outside of panes horizontally, but within a pane vertically
    // show horizontal within the pane 
    if (!inPaneHorizontally && inAnyPaneVertically) {
      // console.log('cgS uPC 2 not horz / vert');
      showHorz = true;
      showVert = false;
      // console.log('cgS uPC final show horz/vert: ', showHorz, showVert);
      
    // inside of panes horizontally, but in between panes vertically
    // show all vertical 
    } else if (inPaneHorizontally && !inAnyPaneVertically) {
      // console.log('cgS uPC 3 horz / not vert');
      showHorz = false;
      showVert = true;
      // console.log('cgS uPC final show horz/vert: ', showHorz, showVert);

    }

    // outside of panes horizontally and vertically
    // don't show either horizontal or vertical
    else if (!inPaneHorizontally && !inAnyPaneVertically) {
      // console.log('cgS uPC 3 horz / not vert');
      showHorz = false;
      showVert = false;
      // console.log('cgS uPC final show horz/vert: ', showHorz, showVert);

    }


    
    const xCrosshair = d3.select('.panel-crosshairs-x');
    xCrosshair
      .attr('stroke', showHorz ? 'white' : 'rgba(0, 0, 0, 0)')
      ;
    // console.log('cgS uPC xCrosshair: ', xCrosshair);

    for (const layout of this.paneLayoutsBS.value) {
      // console.log('cgS uPC yCrosshair id: ', `#panel-crosshairs-y-pane-${layout.paneNumber}`);
      const yCrosshair = d3.select(`#panel-crosshairs-y-pane-${layout.paneNumber}`);
      yCrosshair
          .attr('stroke', showVert ? 'white' : 'rgba(0, 0, 0, 0')
          ;

      // console.log('cgS uPC yCrosshair: ', yCrosshair);

    }
      
    
    // console.log('cGS uPC updated crosshairs horz/vert lines: ', horzLine, vertLine);
    
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
    console.log('-------- gRL START GENERATE RENDERABLE LAYER ', layerConfig.title,' ----------------------------------');
    console.log('--------------- gRL layer config: -------------------------------');
    console.table(layerConfig);

    let renderItem = d3.create('svg:g')
      .attr('id', `${paneConfig.idLabel}-${layerConfig.idLabel}`);

    let xScale: d3.Scale;
    let yScale: d3.Scale;
    let extents: Extents;
    
    const extentsConfig = layerConfig.extentsConfig;
    
    // console.log('---------------- gRL Generate Layer Extents -------------------------------');
    
    
    // console.log('---------------- gRL start loop. num series: ', layerConfig.series.length,' -------------------------------');
    for (const series of layerConfig.series) {

      // console.log('---------------- gRL Series ', series.seriesName,' -------------------------------');

      // let minTarget, maxTarget;

      let xMinTarget, xMaxTarget, yMinTarget, yMaxTarget;
      
      
      // const macdExtents = utils.generateExtents(this.dataBS.value, extConfig);
      // const divExtents = utils.generateExtents(this.dataBS.value, extConfig);

      // // console.log('cGS gRL macd/div extents: ');
      // // console.table(macdExtents);
      // // console.table(divExtents);

      // minTarget = macdExtents.yMin < divExtents.yMin ? xMinTarget : `divergence-macd-12-26-5`
      // maxTarget = macdExtents.yMax > divExtents.yMax ? xMaxTarget : `divergence-macd-12-26-5`


      // TODO: replace hardcoded target strings with dynamically generated targets
      // when PanelConfig UI constructed
      if (series.seriesName === SeriesName.MACD) {
        // let minExtentsTarget = `macd-macd-12-26-5`;
        // let maxExtentsTarget = `macd-macd-12-26-5`;
        // const macdExtents = utils.generateExtents(this.dataBS.value, minExtentsTarget, maxExtentsTarget);
        // minExtentsTarget = `divergence-macd-12-26-5`;
        // maxExtentsTarget = `divergence-macd-12-26-5`;
        // const divExtents = utils.generateExtents(this.dataBS.value, minExtentsTarget, maxExtentsTarget);
        // minTarget = macdExtents.yMin < divExtents.yMin ? `macd-macd-12-26-5` : `divergence-macd-12-26-5`
        // maxTarget = macdExtents.yMax > divExtents.yMax ? `macd-macd-12-26-5` : `divergence-macd-12-26-5`

        // console.log('cGS gRL macd/div extents: ');
        // console.table(macdExtents);
        // console.table(divExtents);

      

      } else {
        // console.log('gRL series.minET/maxET: ', series.minExtentsTarget, series.maxExtentsTarget);
        // minTarget = series.minExtentsTarget ?? EXTENTS_LOW_TARGET_MAP.get(series.seriesName);
        // maxTarget = series.maxExtentsTarget ?? EXTENTS_HIGH_TARGET_MAP.get(series.seriesName);
        // console.log('gRL generated min/max targets: ', minTarget, maxTarget);
        
      }

      // extents = utils.generateExtents(this.dataBS.value, minTarget, maxTarget);
      extents = utils.generateExtents(this.dataBS.value, extentsConfig);

      if (layerConfig.upperRangeLimit && layerConfig.lowerRangeLimit) {
        extents.yMax = layerConfig.upperRangeLimit;
        extents.yMin = layerConfig.lowerRangeLimit;

      }
    }
    
    console.log('gRL final extents:');
    console.table(extents);

    // console.log('---------------- gRL Generate Layer X Scale and Axis -------------------------------');
    if (layerConfig.xAxisConfig.type !== ScaleType.NONE) {
        
      // generateXAxis(xScale, extents: Extents, layout: PaneLayout, series: Series, xAxisConfig: AxisConfig, paneConfig: ChartPaneConfig) {
      xScale = utils.generateXScale(extents.xMin, extents.xMax, layout);
      // console.log('gRL final xScale: ', xScale);
      const xAxis = this.generateXAxis(xScale, extents, layout, layerConfig);
      // console.log('gRL final xScale/xAxis: ', xScale, xAxis);
      
      renderItem.append(() => xAxis.node());

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
      // console.log('cGS gRP called: ', paneNumber, target);
      
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
