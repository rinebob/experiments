import { AfterViewChecked, AfterViewInit, Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges, ViewChild, ElementRef} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as d3 from 'd3';
// import * as techan from 'techan';
import * as fc from 'd3fc';

import { ChartGeneratorService } from 'src/app/services/chart-gen/chart-generator.service';
import * as utils from 'src/app/services/chart-gen/chart_generator_utils';
import { GalleryChartMode, OHLCData, PickerTableData } from 'src/app/common/interfaces';
import { ChartDimensions, ChartPanelConfig, ChartPanelDimensions, ExtentsConfig, PlotName, PlotType, DomRectCoordinates, ScaleType } from 'src/app/common/interfaces_chart';
import { CHART_MARGINS, CHART_PANEL_DIMENSIONS_INITIALIZER, DEFAULT_CHART_SETTING, DEFAULT_PICKER_TABLE_DATUM, DOM_RECT_COORDS_INITIALIZER } from 'src/app/common/constants';
import { DEFAULT_CHART_DIMENSIONS, DEFAULT_MARGIN_CONFIG, PANE_HEIGHT_MATRIX} from 'src/app/common/constants';
import { LAYER_PANEL_CONFIG, SINGLE_PANE_LAYER_PANEL_CONFIG} from 'src/app/common/chart_configs';
import {MSFTData_start_99_1101} from '../../../assets/data/MSFT_21-1112';
import { MSFTData_sample } from 'src/assets/data/MSFT_21-1112_sample';


// height of ChartControls component
const CONTROLS_HEIGHT = 50;


// BASE CHART IS DEPRECATED FOR NEW IMPLEMENTATIONS
// USE DYNAMIC PANEL/DYNCAMIC CHART INSTEAD
// TODO: refactor BaseChart to support SimpleChart only
@Component({
  selector: 'exp-base-chart',
  templateUrl: './base-chart.component.html',
  styleUrls: ['./base-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BaseChartComponent implements AfterViewChecked, AfterViewInit, OnChanges, OnInit {
  
  // @Input() chartData: PickerTableData = DEFAULT_PICKER_TABLE_DATUM;
  // @Input() chartMode: GalleryChartMode = GalleryChartMode.FULLSCREEN_MODE;
  // @Input() chartDimensions: ChartDimensions = DEFAULT_CHART_DIMENSIONS;

  @ViewChild('baseChart', {read: ElementRef}) baseChart: ElementRef;
  // @ViewChild('baseChart') baseChart: HTMLElement;

  @Input()
  set chartPanelConfig(config: ChartPanelConfig) {
    this.chartPanelConfigBS.next(config);

  }
  get chartPanelConfig() {
    return this.chartPanelConfigBS.value;
  }
  

  @Input()
  set containerDimensions(dimensions: DomRectCoordinates) {
    // console.log('bC chartDimensions input:');
    // console.table(dimensions);
    const allDimensions = this.setContainerDimensions(dimensions);
    this.chartPanelDimsBS.next(allDimensions);

  }
  get containerDimensions() {
    return this.containerDimsBS.value;
  }
  
  @Input()
  set chartData(data: OHLCData[]) {
    // console.log('bC chartData input data[0]: ', data[0]);
    this.chartDataBS.next(data);
    // this.draw(data)
  }
  get chartData() {
    return this.chartDataBS.value;
  }
  
  @Input()
  set chartMode(mode: GalleryChartMode) {
    // console.log('bC chartMode input mode: ', mode);
    this.chartModeBS.next(mode);
  }
  get chartMode() {
    return this.chartModeBS.value;
  }

  @Input() chartType = DEFAULT_CHART_SETTING.chartType;
  @Input() scaleType = DEFAULT_CHART_SETTING.scaleType;
  @Input() verticalScaleFactor = 2.5;

  readonly chartPanelConfigBS = new BehaviorSubject<ChartPanelConfig>(LAYER_PANEL_CONFIG);
  readonly containerDimsBS = new BehaviorSubject<DomRectCoordinates>(DOM_RECT_COORDS_INITIALIZER);

  // used for prototype - not used in chart generator service
  readonly chartPanelDimsBS = new BehaviorSubject<ChartPanelDimensions>(CHART_PANEL_DIMENSIONS_INITIALIZER);
  
  readonly chartDataBS = new BehaviorSubject<OHLCData[]>([]);
  readonly chartData$: Observable<OHLCData[]> = this.chartDataBS;

  readonly chartModeBS = new BehaviorSubject<GalleryChartMode>(GalleryChartMode.FULLSCREEN_MODE);
  readonly chartMode$: Observable<GalleryChartMode> = this.chartModeBS;

  private svg;
  private g;  // group element that is appended to the svg.  We'll append everything to this element

  private margin = DEFAULT_MARGIN_CONFIG;
 
 
  xScale: d3.svg.Scale;
  yScale: d3.svg.Scale;
  xAxis: d3.svg.Axis;
  yAxis: d3.svg.Axis;
  // ohlcAnnotation: techan.plot.axisannotation;
  // timeAnnotation: techan.plot.axisannotation;
  // crosshair: techan.plot.crosshair;
  coordsText: d3.svg.Text;
  mergedData: OHLCData[] = [];
  
  constructor(private readonly chartGenSvc: ChartGeneratorService) { }

  ngOnChanges(changes: SimpleChanges) {
    // console.log('bC ngOC changes: ', changes);
    if (changes['containerDimensions'] && changes['containerDimensions'].currentValue) {
      
      // console.log('bC ngOC changes-containerDimensions: ');
      // console.table(changes['containerDimensions'].currentValue);
      // console.log('bC ngOC changes-containerDimensions: ');
      // console.table(this.containerDimsBS.value);

      // ===============================
      // PRIOR PROTOTYPE IMPLEMENTATION TO DRAW A CHART
      // WILL BE DEPRECATED WHEN CHART GEN SVC IS COMPLETE
      // this.draw(this.chartDataBS.value);
      // this.draw(this.chartData);

      // *******************************
      // CHART GENERATOR SERVICE CALL
      // console.log('bC ngOI calling CGS generatePanel. panel config: ', this.chartPanelConfig)
      // console.table(this.chartPanelConfig.containerDims)
      
      this.chartPanelConfig.containerDims = this.containerDimsBS.value;

      // runs chart generator service utility functions for testing
      // this.runChartGeneratorServiceUtils();

      if (this.containerDimsBS.value.height > 0 && this.containerDimsBS.value.width > 0) {

        this.refreshChart();
        // const renderablePanel = this.chartGenSvc.generateRenderablePanel(this.chartData, this.chartPanelConfig);
        
        // // console.log('bC ngOC returned renderablePanel: ', renderablePanel);

        // d3.select('svg').remove();
        // this.g = d3.select('#testDiv')
        //   .attr('top', this.containerDimsBS.value.margin.top)
        //   .attr('left', this.containerDimsBS.value.margin.left)
        //   .attr('width', this.containerDimsBS.value.width)
        //   .attr('height', this.containerDimsBS.value.height)
        //   .append(() => renderablePanel.renderPanel.node());
      }

    }

    if (changes['chartData'] && changes['chartData'].currentValue) {
      // console.log('bC ngOC changes-chartData: ', changes['chartData'].currentValue);
      const data: OHLCData[] = (changes['chartData']).currentValue;
      this.chartDataBS.next(data);
      this.refreshChart();
      if (data) {
        // console.log('bC ngOC calling create svg and draw chart');
        // this.createSvg();
        // this.drawChart(this.chartDataBS.value);

        // const dimensions = this.getDimensions(this.baseChart);
        // console.log('bC ngOC chart data.  get dimensions: ', dimensions);

        // this.draw(this.chartDataBS.value);
        // this.draw(data);

        // chart generator service call goes here
      }
    }
    
    if (changes['chartMode']) {
      // console.log('bC ngOC changes-chartMode: ', changes['chartMode']);
      const data: GalleryChartMode = (changes['chartMode']).currentValue;
      this.chartModeBS.next(data);
    }
    
    if (changes['scaleType'] || changes['chartType']) {
      
      // console.log('bC ngOC scale or chart type change. calling create svg and draw chart');
      // this.createSvg();
      // this.drawChart(this.chartDataBS.value);

      // const dimensions = this.getDimensions(this.baseChart);
      // console.log('bC ngOC chart type.  get dimensions: ', dimensions);


      // this.draw(this.chartDataBS.value);

      // chart generator service call goes here
      this.refreshChart();
      
    }

    if (changes['verticalScaleFactor'] && changes['verticalScaleFactor'].currentValue) {
      
      console.log('bC ngOC verticalScaleFactor: ', changes['verticalScaleFactor'].currentValue);
      // this.createSvg();
      // this.drawChart(this.chartDataBS.value);

      // const dimensions = this.getDimensions(this.baseChart);
      // console.log('bC ngOC chart type.  get dimensions: ', dimensions);


      this.draw(this.chartDataBS.value);

      // chart generator service call goes here - pass new vertical scale factor
      // this.refreshChart();
      
    }

  }

  ngOnInit(): void {
    // this.testd3fc();
  }

  ngAfterViewInit() {
    // console.log('bC ngAVI chart data: ', this.chartDataBS.value);
    // console.log('bC ngAVI baseChart div: ', this.baseChart);
  }

  ngAfterViewChecked() {
  }

  refreshChart() {
    
    const renderablePanel = this.chartGenSvc.generateRenderablePanel(this.chartData, this.chartPanelConfig);
        
    // console.log('bC ngOC returned renderablePanel: ', renderablePanel);

    d3.select('svg').remove();
    this.g = d3.select('#testDiv')
      .attr('top', this.containerDimsBS.value.margin.top)
      .attr('left', this.containerDimsBS.value.margin.left)
      .attr('width', this.containerDimsBS.value.width)
      .attr('height', this.containerDimsBS.value.height)
      .append(() => renderablePanel.renderPanel.node());

  }

  runChartGeneratorServiceUtils() {
    const extentsConfig = {
      xScaleType: ScaleType.DATE,
      xMinTarget: PlotName.LOW,
      xMaxTarget: PlotName.HIGH,
      yScaleType: ScaleType.LOG,
      yMinTarget: PlotName.LOW,
      yMaxTarget: PlotName.HIGH,
    }

    const {xMax, xMin, yMax, yMin} = utils.generateExtents(this.chartData, extentsConfig);

    // chart scales
    // const xScale = utils.generateXScale(xMin, xMax, this.containerDimsBS.value);
    // // const xAxis = this.generateFinanceTimeXAxis(xMin, xMax);
    // const yScale = utils.generateYScale(yMin, yMax, this.containerDimsBS.value);

  }

  setContainerDimensions(dimensions: DomRectCoordinates) {
    // const dims = {...dimensions};
    // console.log('bC dims: ', dims);
    // console.log('bC dimensions.height: ', dimensions.height);
    const height = Math.floor(dimensions['height']);
    const width = Math.floor(dimensions['width']);
    // console.log('bC adjusted height/width: ', height, width);

    // this gets passed to ChartGeneratorService to set the ChartPanel Coordinates
    this.containerDimsBS.next({...dimensions, height, width, margin: DEFAULT_MARGIN_CONFIG});

    // Used for current BaseChart component internal chart generation implementation only
    const chartPanelDimensions = this.calculateChartPanelDimensions(this.containerDimsBS.value);
    
    // pushed to chartPanelDimsBS
    return chartPanelDimensions;
  }

  calculateChartPanelDimensions(hostDimensions: DomRectCoordinates) {
    
    // console.log('bC cCD hostDimensions arg: ', hostDimensions)

    const svgDim = {width: hostDimensions.width, height: hostDimensions.height};
    
    const mainChartDim = {
      width: hostDimensions.width - this.margin.left - this.margin.right,
      height: hostDimensions.height - this.margin.top - this.margin.bottom};
    
    const indicatorDim = {
      width: hostDimensions.width - this.margin.left - this.margin.right,
      height: hostDimensions.height - mainChartDim.height - this.margin.top - this.margin.bottom + this.margin.gutter};
    
    const chartAnchor = {
      right: this.margin.left,
      down: this.margin.top,
    };
    
    const xAxisAnchor = {
      right: this.margin.left,
      down: mainChartDim.height,
    };
    
    const yAxisAnchor = {
      right: this.margin.left + mainChartDim.width,
      down: 0,
    };

    // console.log('bC cCD output dimensions:');
    // console.log('svgDim w h: ', svgDim.width, svgDim.height);
    // console.log('mainChartDim w h: ', mainChartDim.width, mainChartDim.height);
    // console.log('indicatorDim w h: ', indicatorDim.width, indicatorDim.height);
    // console.log('chartAnchor r d: ', chartAnchor.right, chartAnchor.down);
    // console.log('xAxisAnchor r d: ', xAxisAnchor.right, xAxisAnchor.down);
    // console.log('yAxisAnchor r d: ',yAxisAnchor.right, yAxisAnchor.down);

    const chartPanelDims: ChartPanelDimensions = {
      svgDim: {...svgDim},
      mainChartDim: {...mainChartDim},
      indicatorDim: {...indicatorDim},
      chartAnchor: {...chartAnchor},
      xAxisAnchor: {...xAxisAnchor},
      yAxisAnchor: {...yAxisAnchor},  
    }

    return chartPanelDims;
  }

  testd3fc() {
    // this.chartDataBS.next(MSFTData_sample);
    // const dataGenerator = fc.randomFinancial().startDate(new Date(MSFTData_sample[0].date));
    const stochasticAlgorithm = fc.indicatorStochasticOscillator().kPeriod(28);
    // console.log('bC tFC dataGenerator: ', dataGenerator);
    // const fakeData = dataGenerator(MSFTData_sample.length);
    // const fakeData = stochasticAlgorithm(MSFTData_sample);
    const fakeData = stochasticAlgorithm(this.chartData);
    // console.log('bC tFC fakeData: ', fakeData);
    // console.log('bC tFC data length: ', MSFTData_sample.length);

    // const mergedData = [];
    // MSFTData_sample.map((d, i) => {
    const chartData = [...this.chartData];
    chartData.map((d, i) => {
      const datum = {...d};
      datum['stochastic'] = fakeData[i];
      // console.log('bC tD datum: ', datum);
      // console.log('bC tD fakeData[i]: ', fakeData[i].k, fakeData[i].d);
      if (fakeData[i].k === undefined) {fakeData[i].k = 0}
      if (fakeData[i].d === undefined) {fakeData[i].d = 0}
      // console.log('bC fakeData[i] after zero set: ', fakeData[i].k, fakeData[i].d);
      this.mergedData.push({...datum});
    
    });

    console.table(this.mergedData['stochastic']);

    // console.log('bC stoch data: ', fakeData);
    // console.log('bC merged data: ', this.mergedData);

   

  }

   // private createSvg() {
  //   d3.select("svg").remove();
  //   this.svg = d3.select('#svgDiv')
  //   .append('svg')
  //   .attr('width', this.dimsBS.value.width - this.margin.buffer)
  //   .attr('height', (this.dimsBS.value.height))
  //   .append('g');
  // }
  // private createSvg() {
  //   d3.select("svg").remove();
  //   this.svg = d3.select('#svgDiv')
  //   .append('svg')
  //   .attr('top', this.margin.buffer)
  //   .attr('left', this.margin.buffer)
  //   .attr('width', this.containerDimsBS.value.width)
  //   .attr('height', this.containerDimsBS.value.height)
  //   .append('g');
  // }

  private createSvg() {
    d3.select("svg").remove();
    // this.svg = d3.select('#svgDiv')
    this.g = d3.select('#svgDiv')
    .append('svg')
    // .attr('top', this.margin.buffer)
    // .attr('left', this.margin.buffer)
    .attr('width', this.chartPanelDimsBS.value.svgDim.width)
    .attr('height', this.chartPanelDimsBS.value.svgDim.height)
    .append('g');
      // .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);
    
  }

  // private createSvg2() {
  //   d3.select('svg').remove();
  //   this.svg = d3.select('#svgDiv')
  //   .append('svg')
  //   .attr('preserveAspectRatio', 'xMinYMin meet')
  //   // .attr('viewBox', '0 0 ' + (this.dimsBS.value.width + this.margin.right) + ' ' + (this.dimsBS.value.height  + this.margin.bottom))
  //   // .attr('viewBox', '0 0 ' + (this.dimsBS.value.width - this.margin.buffer) + ' ' + (this.dimsBS.value.height - this.margin.buffer))
  //   .attr('viewBox', '0 0 ' + this.containerDimsBS.value.width + ' ' + this.containerDimsBS.value.height)
  //   .classed('svg-content', true)
  //   .append('g');
  // }

  draw(data: OHLCData[]) {
    this.createSvg();
    // this.createSvg2();
    // this.drawChart(this.chartDataBS.value);
    this.drawChart(this.chartData);
  }

  private generateExtents(data: OHLCData[]) {
    // console.log('bC gE vert scale factor: ', this.verticalScaleFactor);
    const xMin = Math.floor(d3.min(data, d => d['date']));
    const xMax = Math.ceil(d3.max(data, d => d['date']));
    let yMin = d3.min(data, d => d['low']);
    let yMax = d3.max(data, d => d['high']);
    // let yMin = d3.min(data, d => d.stochastic.d);
    // let yMax = d3.max(data, d => d.stochastic.d);
    // console.log('bC gE pre adjust yMax, yMin: ', yMax, yMin);
    
    const center = yMax - ((yMax - yMin) / 2);
    const height = yMax - yMin;
    const newHeight = height * this.verticalScaleFactor;
    
    yMin = Math.ceil(center - newHeight / 2);
    yMax = Math.ceil(center + newHeight / 2);
    // let maybeYMin = center - newHeight / 2;
    // let maybeYMax = center + newHeight / 2;
    // console.log('bC gE maybeYMax maybeYMin: ', maybeYMax, maybeYMin);

    // yMin = maybeYMin > 0 ? maybeYMin : yMin;
    // yMax = maybeYMin > 0 ? maybeYMax : newHeight;
    
    // console.log('bC gE post adjust yMax, yMin: ', yMax, yMin);
    const extents = {xMax, xMin, yMax, yMin}

    return {...extents};

  }

  private generateXScale(xMin: number, xMax: number) {
    const xScale = d3
      .scaleTime()
      .domain([xMin, xMax])
      .range([0, this.containerDimsBS.value.width - this.margin.left - this.margin.right]);

    return xScale;
  }
  
  generateFinanceTimeXScale() {
    // const xScale = techan.scale
    //   .financetime()
    //   .range([0, this.containerDimsBS.value.width - this.margin.right]);
    
    // return xScale;
  }

  private generateYScale(yMin: number, yMax: number) {
    // console.log('bC gYA yMin: ', yMin);
    let yScale;

    switch(this.scaleType) {
      case ScaleType.LINEAR:

        yScale = d3
          .scaleLinear()
          .domain([yMin, yMax])
          .range([this.containerDimsBS.value.height - this.margin.top - this.margin.bottom, 0]);
        break;

      case ScaleType.LOG:
        yScale = d3
          .scaleLog()
          .domain([Math.max(yMin, 1), yMax])
          .range([this.containerDimsBS.value.height - this.margin.top - this.margin.bottom, 0]);
        break;

      default: console.log('bC gYA default.  ummm... dude... no scale type... WTF???')
    }


    return yScale;
  }

  private generateDataDisplay(xScale, yScale) {
    // console.log('bC gDD data display axes: ', xAxis, yAxis);
    let dataDisplay;

    switch(this.chartType) {
      case PlotType.LINE:
        // console.log('bC gDD chart type line');
        
        dataDisplay = d3
          .line()
          .x(d => xScale(d['date']))
          .y(d => yScale(d['close']));
          // .y(d => yScale(d['stochastic'].d));
          // .y(d => yScale(d.stochastic.d));

      
        break;

      case PlotType.OHLCBAR:
        console.log('bC gDD chart type bar');
        
        break;

      case PlotType.CANDLESTICK:
        // console.log('bC gDD chart type candlestick');

        // this.svg.append("g")
        this.g.append("g")
                .attr("class", "candlestick");
        
        // dataDisplay = techan.plot
        //   .candlestick()
        //   .xScale(xScale)
        //   .yScale(yScale);

        break;


      default: console.log('bC gYA default.  ummm... dude... no y axis type... WTF???');
    }

    // console.log('bC gDD dataDisplay: ', dataDisplay);

    return dataDisplay;
  }

  generateStochastic(xScale, yScale) {
    const stochastic = fc.indicatorStochasticOscillator()
      .xScale(xScale)
      .yScale(yScale)

    // const stochData = stochastic(MSFTData_sample);
    // console.log('bC gS stoch data dude! : ', stochData);

    return stochastic;
  }

  appendStochastic(stochastic) {
    this.g
    .append('path')
    .data([this.chartData])
    .style('fill', 'none')
    .attr('id', 'stochastic')
    .attr('transform', `translate(${this.margin.left}, 0)`)
    // .attr('stroke', 'steelblue')
    // .attr('stroke-width', '1.5')
    .attr('d', stochastic);
  }

  private appendLabels() {
    // this.svg.append('text')
    this.g.append('text')
      .attr('id', 'chartTitle')
      // .attr('x', this.chartPanelDimsBS.value.svgDim.width / 2)
      // .attr('y', this.margin.top)
      .attr('font-size', '20px')
      .attr('text-anchor', 'middle')
      .attr('transform', `translate(${this.chartPanelDimsBS.value.svgDim.width / 2}, ${this.margin.top})`)
      .text('Price chart for <dweezil corp>');

    // this.svg.append('text')
    this.g.append('text')
      .attr('id', 'priceLabel')
      // .attr('x', this.margin.left + this.chartPanelDimsBS.value.mainChartDim.width + this.margin.buffer)
      // .attr('y', (this.margin.top + this.chartPanelDimsBS.value.mainChartDim.height) / 2)
      .attr('transform', 'rotate(-90)')
      .attr('font-size', '14px')
      .attr('text-anchor', 'middle')
      .attr('transform', `translate(${this.margin.left + this.chartPanelDimsBS.value.mainChartDim.width + this.margin.buffer}, ${(this.margin.top + this.chartPanelDimsBS.value.mainChartDim.height) / 2})`)
      .text('Price ($)');

    // this.svg.append('text')
    this.g.append('text')
      .attr('id', 'dateLabel')
      // .attr('x', this.margin.left + this.chartPanelDimsBS.value.mainChartDim.width + this.margin.buffer)
      // .attr('y', this.margin.top + this.chartPanelDimsBS.value.mainChartDim.height + this.margin.buffer)
      .attr('font-size', '14px')
      .attr('text-anchor', 'middle')
      .attr('transform', `translate(${(this.margin.left + this.chartPanelDimsBS.value.mainChartDim.width) / 2}, ${this.margin.top + this.chartPanelDimsBS.value.mainChartDim.height})`)
      .text('Date');
  }

  private appendXAxis(xScale) {
    // this.svg
    this.g
      .append('g')
      .attr('id', 'xAxis')
      // .attr('transform', `translate(0, ${this.dimsBS.value.height - this.margin.bottom - this.margin.top})`)
      // .attr('transform', `translate(${this.margin.left}, ${this.containerDimsBS.value.height - this.margin.bottom - this.margin.top})`)
      .attr('transform', `translate(${this.chartPanelDimsBS.value.xAxisAnchor.right}, ${this.chartPanelDimsBS.value.xAxisAnchor.down})`)
      .call(d3.axisBottom(xScale));

  }

  private appendYAxis(yScale) {
    // this.svg
    this.g
    .append('g')
    .attr('id', 'yAxis')
    // .attr('transform', `translate(${this.containerDimsBS.value.width - this.margin.right}, 0)`)
    .attr('transform', `translate(${this.chartPanelDimsBS.value.yAxisAnchor.right}, ${this.chartPanelDimsBS.value.yAxisAnchor.down})`)
    .call(d3.axisRight(yScale));

  }

  private appendDataDisplay(dataDisplay) {
    // this.svg
    this.g
      .append('path')
      // .data([this.chartData])
      .data([this.mergedData])
      .style('fill', 'none')
      .attr('id', 'priceChart')
      .attr('transform', `translate(${this.margin.left}, 0)`)
      .attr('stroke', 'steelblue')
      .attr('stroke-width', '1.5')
      .attr('d', dataDisplay);

  }

  private drawChart(data: OHLCData[]) {
    // console.log('bC dC data[0]: ', data[0]);
    // find data range
    const {xMax, xMin, yMax, yMin} = this.generateExtents(data);

    // chart scales
    const xScale = this.generateXScale(xMin, xMax);
    // const xAxis = this.generateFinanceTimeXAxis(xMin, xMax);
    const yScale = this.generateYScale(yMin, yMax);

    // actual data rendering
    const dataDisplay = this.generateDataDisplay(xScale, yScale);
    // const stochastic = this.generateStochastic(xScale, yScale);


    const xAxis = this.appendXAxis(xScale);

    const yAxis = this.appendYAxis(yScale);

    if (this.chartType === PlotType.CANDLESTICK) {
      this.drawCandlestick(this.chartData, dataDisplay);
    } else {
      this.appendDataDisplay(dataDisplay);

    }

    this.appendLabels();

    // this.generateCrosshairsWithAnnotations(xScale, yScale, xAxis, yAxis)
  }

  // drawCandlestick(data: OHLCData[], dataDisplay) {
  //   const x = this.generateFinanceTimeXAxis();
  //   const y = d3.scaleLinear().range([this.dimsBS.value.height, 0]);
  //   x.domain(data.map(dataDisplay.accessor().d));
  //   y.domain(techan.scale.plot.ohlc(data, dataDisplay.accessor()).domain());
    
  //   this.svg.selectAll("g.candlestick").datum(data).call(dataDisplay);
  // }

  drawCandlestick(data: OHLCData[], dataDisplay) {
    // const x = this.generateFinanceTimeXScale();
    // const y = d3.scaleLinear().range([this.containerDimsBS.value.height, 0]);
    // x.domain(data.map(dataDisplay.accessor().d));
    // y.domain(techan.scale.plot.ohlc(data, dataDisplay.accessor()).domain());
    
    // // this.svg.selectAll("g.candlestick")
    // this.g.selectAll("g.candlestick")
    // .datum(data)
    // .attr('transform', `translate(${this.margin.left}, 0)`)
    // .call(dataDisplay);
  }



}
