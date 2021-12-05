import { AfterViewChecked, AfterViewInit, Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges, ViewChild, ElementRef} from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import * as d3 from 'd3';
import * as techan from 'techan';
import * as fc from 'd3fc';

import { GalleryChartMode, OHLCData, PickerTableData } from 'src/app/common/interfaces';
import { ChartDimensions, ChartPanelDimensions, ChartType, DomRectCoordinates, ScaleType } from 'src/app/common/interfaces_chart';
import { CHART_MARGINS, CHART_PANEL_DIMENSIONS_INITIALIZER, DEFAULT_CHART_SETTING, DEFAULT_PICKER_TABLE_DATUM, DOM_RECT_COORDS_INITIALIZER } from 'src/app/common/constants';
import { DEFAULT_CHART_DIMENSIONS,  } from 'src/app/common/constants';
import {MSFTData_start_99_1101} from '../../../assets/data/MSFT_21-1112';
import { MSFTData_sample } from 'src/assets/data/MSFT_21-1112_sample';


// height of ChartControls component
const CONTROLS_HEIGHT = 50;

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
  set containerDimensions(dimensions: DomRectCoordinates) {
    console.log('bC chartDimensions input: ', dimensions);
    const dims = {...dimensions};
    // console.log('bC dims: ', dims);
    // console.log('bC dimensions.height: ', dimensions.height);
    const height = Math.floor(dimensions['height'] - CONTROLS_HEIGHT);
    const width = Math.floor(dimensions['width']);
    // console.log('bC adjusted height/width: ', height, width);
    this.containerDimsBS.next({...dimensions, height, width});
    const chartPanelDimensions = this.calculateChartDimensions(this.containerDimsBS.value);
    this.chartPanelDimsBS.next(chartPanelDimensions);
    // console.log('bC t.dimsBS.value: ', this.dimsBS.value);

  }
  get containerDimensions() {
    return this.containerDimsBS.value;
  }
  
  @Input()
  set chartData(data: OHLCData[]) {
    console.log('bC chartData input data[0]: ', data[0]);
    this.chartDataBS.next(data);
    this.draw(data)
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

  readonly containerDimsBS = new BehaviorSubject<DomRectCoordinates>(DOM_RECT_COORDS_INITIALIZER);
  readonly chartPanelDimsBS = new BehaviorSubject<ChartPanelDimensions>(CHART_PANEL_DIMENSIONS_INITIALIZER);
  
  readonly chartDataBS = new BehaviorSubject<OHLCData[]>([]);
  readonly chartData$: Observable<OHLCData[]> = this.chartDataBS;

  readonly chartModeBS = new BehaviorSubject<GalleryChartMode>(GalleryChartMode.FULLSCREEN_MODE);
  readonly chartMode$: Observable<GalleryChartMode> = this.chartModeBS;

  private svg;
  private g;  // group element that is appended to the svg.  We'll append everything to this element

  private margin = { top: 50, right: 100, bottom: 50, left: 100, buffer: 50, gutter: 20, factor: .9 };
 
  xScale: d3.svg.Scale;
  yScale: d3.svg.Scale;
  xAxis: d3.svg.Axis;
  yAxis: d3.svg.Axis;
  ohlcAnnotation: techan.plot.axisannotation;
  timeAnnotation: techan.plot.axisannotation;
  crosshair: techan.plot.crosshair;
  coordsText: d3.svg.Text;
  mergedData: OHLCData[] = [];
  
  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    // console.log('bC ngOC changes: ', changes);
    if (changes['containerDimensions'] && changes['containerDimensions'].currentValue) {
      
      console.log('bC ngOC changes-containerDimensions: ', changes['containerDimensions'].currentValue);
      // this.draw(this.chartDataBS.value);
      this.draw(this.chartData);
    }

    if (changes['chartData'] && changes['chartData'].currentValue) {
      // console.log('bC ngOC changes-chartData: ', changes['chartData'].currentValue);
      const data: OHLCData[] = (changes['chartData']).currentValue;
      this.chartDataBS.next(data);
      if (data) {
        // console.log('bC ngOC calling create svg and draw chart');
        // this.createSvg();
        // this.drawChart(this.chartDataBS.value);

        // const dimensions = this.getDimensions(this.baseChart);
        // console.log('bC ngOC chart data.  get dimensions: ', dimensions);

        // this.draw(this.chartDataBS.value);
        this.draw(data);
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


      this.draw(this.chartDataBS.value);
      
    }

    if (changes['verticalScaleFactor'] && changes['verticalScaleFactor'].currentValue) {
      
      console.log('bC ngOC verticalScaleFactor: ', changes['verticalScaleFactor'].currentValue);
      // this.createSvg();
      // this.drawChart(this.chartDataBS.value);

      // const dimensions = this.getDimensions(this.baseChart);
      // console.log('bC ngOC chart type.  get dimensions: ', dimensions);


      this.draw(this.chartDataBS.value);
      
    }

  }

  ngOnInit(): void {
    this.testd3fc();
    
  }
  
  ngAfterViewInit() {
    // console.log('bC ngAVI chart data: ', this.chartDataBS.value);
    // console.log('bC ngAVI baseChart div: ', this.baseChart);
  }

  ngAfterViewChecked() {
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

  generateCrosshairsWithAnnotations() {
  // generateCrosshairsWithAnnotations(xScale, yScale, xAxis, yAxis) {
    console.log('bC gCWA generate crosshairs called');
    const xScale = 
      techan.scale.financetime()
            .range([0, this.chartPanelDimsBS.value.mainChartDim.width]);

    const yScale = 
      d3.scaleLinear()
        .range([this.chartPanelDimsBS.value.mainChartDim.height, 0]);

    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisRight(yScale);

    this.timeAnnotation = 
      techan.plot.axisannotation()
            .axis(xAxis)
            .orient('bottom')
            .format(d3.timeFormat('%Y-%m-%d'))
            .width(65)
            .translate([0, this.chartPanelDimsBS.value.mainChartDim.height]);

    this.ohlcAnnotation = 
      techan.plot.axisannotation()
            .axis(yAxis)
            .orient('right')
            .translate([this.chartPanelDimsBS.value.mainChartDim.width + this.margin.left, 0]);            

    this.crosshair = 
      techan.plot.crosshair()
            .xScale(xScale)
            .yScale(yScale)
            .xAnnotation([this.timeAnnotation])
            .yAnnotation([this.ohlcAnnotation])
            .on("enter", this.enter)
            .on("out", this.out)
            .on("move", this.move);

    const candlestick = techan.plot.candlestick().xScale(xScale).yScale(yScale);
    const accessor = candlestick.accessor();
    // xScale.domain(this.chartData.map(accessor.d));
    xScale.domain(this.chartData.map(d => d.date));
    yScale.domain(techan.scale.plot.ohlc(this.chartData, accessor).domain());

    if (this.svg) {
      console.log('bC gCWA in if this.svg block');
      this.svg.append("g")
          .attr("class", "x annotation bottom")
          .datum([{value: xScale.domain()[30]}])
          .call(this.timeAnnotation);

      this.svg.append("g")
          .attr("class", "y annotation right")
          .datum([{value: 61}, {value:52}])
          .call(this.ohlcAnnotation);

      this.svg.append('g')
          .attr("class", "crosshair")
          .datum({ x: xScale.domain()[80], y: 200 })
          .call(this.crosshair)
          .each((d) => this.move(d)); // Display the current data

          // console.log('bC gCWA xScale.domain: ', xScale.domain()[80], xScale.domain() );

      this.coordsText = this.svg.append('text')
          .style("text-anchor", "end")
          .attr("class", "coords")
          .attr("x", this.margin.left + this.chartPanelDimsBS.value.mainChartDim.width - 5)
          .attr("y", 200)
          .text('dude!');

    }


  }

  enter() {
    console.log('bC e crosshairs enter called');
    console.log('bC e this.coordsText: ', this.coordsText);

    if (this.coordsText) {
      console.log('bC e coords text block');
      this.coordsText.style("display", "inline");
      
    }
  }
  
  out() {
    console.log('bC crosshairs out called');
    if (this.coordsText) {
      console.log('bC o coords text block');
      this.coordsText.style("display", "none");
    }
    
  }
  
  move(coords) {
    console.log('bC crosshairs move called.  coords: ', coords);
    if (this.coordsText) {
      console.log('bC m in this.coordsText block');
      this.coordsText.text(
        // this.timeAnnotation.format()(coords.x) + ", " + this.ohlcAnnotation.format()(coords.y)
        this.timeAnnotation.format()(coords.x)
      );
    }
  }

  calculateChartDimensions(hostDimensions: DomRectCoordinates) {
    
    console.log('bC cCD hostDimensions arg: ', hostDimensions)

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

    console.log('bC cCD output dimensions:');
    console.log('svgDim w h: ', svgDim.width, svgDim.height);
    console.log('mainChartDim w h: ', mainChartDim.width, mainChartDim.height);
    console.log('indicatorDim w h: ', indicatorDim.width, indicatorDim.height);
    console.log('chartAnchor r d: ', chartAnchor.right, chartAnchor.down);
    console.log('xAxisAnchor r d: ', xAxisAnchor.right, xAxisAnchor.down);
    console.log('yAxisAnchor r d: ',yAxisAnchor.right, yAxisAnchor.down);

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
    console.log('bC gE vert scale factor: ', this.verticalScaleFactor);
    const xMin = Math.floor(d3.min(data, d => d['date']));
    const xMax = Math.ceil(d3.max(data, d => d['date']));
    let yMin = d3.min(data, d => d['low']);
    let yMax = d3.max(data, d => d['high']);
    // let yMin = d3.min(data, d => d.stochastic.d);
    // let yMax = d3.max(data, d => d.stochastic.d);
    console.log('bC gE pre adjust yMax, yMin: ', yMax, yMin);
    
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
    
    console.log('bC gE post adjust yMax, yMin: ', yMax, yMin);
    const extents = {xMax, xMin, yMax, yMin}

    return {...extents};

  }

  private generateXScale(xMin: number, xMax: number) {
    const x = d3
      .scaleTime()
      .domain([xMin, xMax])
      .range([0, this.containerDimsBS.value.width - this.margin.left - this.margin.right]);

    return x;
  }
  
  generateFinanceTimeXScale() {
    const x = techan.scale
      .financetime()
      .range([0, this.containerDimsBS.value.width - this.margin.right]);
    
    return x;
  }

  private generateYScale(yMin: number, yMax: number) {
    console.log('bC gYA yMin: ', yMin);
    let yAxis;

    switch(this.scaleType) {
      case ScaleType.LINEAR:

        yAxis = d3
          .scaleLinear()
          .domain([yMin, yMax])
          .range([this.containerDimsBS.value.height - this.margin.top - this.margin.bottom, 0]);
        break;

      case ScaleType.LOG:
        yAxis = d3
          .scaleLog()
          .domain([Math.max(yMin, 1), yMax])
          .range([this.containerDimsBS.value.height - this.margin.top - this.margin.bottom, 0]);
        break;

      default: console.log('bC gYA default.  ummm... dude... no scale type... WTF???')
    }


    return yAxis;
  }

  private generateDataDisplay(xScale, yScale) {
    // console.log('bC gDD data display axes: ', xAxis, yAxis);
    let dataDisplay;

    switch(this.chartType) {
      case ChartType.LINE:
        // console.log('bC gDD chart type line');
        
        dataDisplay = d3
          .line()
          .x(d => xScale(d['date']))
          .y(d => yScale(d['close']));
          // .y(d => yScale(d['stochastic'].d));
          // .y(d => yScale(d.stochastic.d));

      
        break;

      case ChartType.BAR:
        console.log('bC gDD chart type bar');
        
        break;

      case ChartType.CANDLESTICK:
        // console.log('bC gDD chart type candlestick');

        // this.svg.append("g")
        this.g.append("g")
                .attr("class", "candlestick");
        
        dataDisplay = techan.plot
          .candlestick()
          .xScale(xScale)
          .yScale(yScale);

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

  private appendXAxis(xAxis) {
    // this.svg
    this.g
      .append('g')
      .attr('id', 'xAxis')
      // .attr('transform', `translate(0, ${this.dimsBS.value.height - this.margin.bottom - this.margin.top})`)
      // .attr('transform', `translate(${this.margin.left}, ${this.containerDimsBS.value.height - this.margin.bottom - this.margin.top})`)
      .attr('transform', `translate(${this.chartPanelDimsBS.value.xAxisAnchor.right}, ${this.chartPanelDimsBS.value.xAxisAnchor.down})`)
      .call(d3.axisBottom(xAxis));

  }

  private appendYAxis(yAxis) {
    // this.svg
    this.g
    .append('g')
    .attr('id', 'yAxis')
    // .attr('transform', `translate(${this.containerDimsBS.value.width - this.margin.right}, 0)`)
    .attr('transform', `translate(${this.chartPanelDimsBS.value.yAxisAnchor.right}, ${this.chartPanelDimsBS.value.yAxisAnchor.down})`)
    .call(d3.axisRight(yAxis));

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

    if (this.chartType === ChartType.CANDLESTICK) {
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
    const x = this.generateFinanceTimeXScale();
    const y = d3.scaleLinear().range([this.containerDimsBS.value.height, 0]);
    x.domain(data.map(dataDisplay.accessor().d));
    y.domain(techan.scale.plot.ohlc(data, dataDisplay.accessor()).domain());
    
    // this.svg.selectAll("g.candlestick")
    this.g.selectAll("g.candlestick")
    .datum(data)
    .attr('transform', `translate(${this.margin.left}, 0)`)
    .call(dataDisplay);
  }



}
