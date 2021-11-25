import { AfterViewChecked, AfterViewInit, Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges, ViewChild, ElementRef} from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import * as d3 from 'd3';
import * as techan from 'techan';

import { GalleryChartMode, OHLCData, PickerTableData } from 'src/app/common/interfaces';
import { ChartDimensions, ChartPanelDimensions, ChartType, DomRectCoordinates, ScaleType } from 'src/app/common/interfaces_chart';
import { CHART_MARGINS, CHART_PANEL_DIMENSIONS_INITIALIZER, DEFAULT_PICKER_TABLE_DATUM, DOM_RECT_COORDS_INITIALIZER } from 'src/app/common/constants';
import { DEFAULT_CHART_DIMENSIONS,  } from 'src/app/common/constants';
import {MSFTData_start_99_1101} from '../../../assets/data/MSFT_21-1112';

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

  @Input() chartType = ChartType.LINE;
  @Input() scaleType = ScaleType.LOG;
  @Input() verticalScaleFactor = 1;

  readonly containerDimsBS = new BehaviorSubject<DomRectCoordinates>(DOM_RECT_COORDS_INITIALIZER);
  readonly chartPanelDimsBS = new BehaviorSubject<ChartPanelDimensions>(CHART_PANEL_DIMENSIONS_INITIALIZER);
  
  readonly chartDataBS = new BehaviorSubject<OHLCData[]>([]);
  readonly chartData$: Observable<OHLCData[]> = this.chartDataBS;

  readonly chartModeBS = new BehaviorSubject<GalleryChartMode>(GalleryChartMode.FULLSCREEN_MODE);
  readonly chartMode$: Observable<GalleryChartMode> = this.chartModeBS;

  private svg;
  private margin = { top: 50, right: 50, bottom: 50, left: 50, buffer: 50, gutter: 20, factor: .9 };
 
  yAxis: d3.svg.Axis;

   // x = techan.scale.financetime()
  //           .range([0, width]);

  

  // timeAnnotation = techan.plot.axisannotation()
  //           .axis(this.xAxis)
  //           .orient('bottom')
  //           .format(d3.timeFormat('%Y-%m-%d'))
  //           .width(65)
  //           .translate([0, height]);

  // ohlcRightAnnotation = techan.plot.axisannotation()
  //           .axis(this.yAxis)
  //           .orient('right')
  //           .translate([width, 0]);            

  // crosshair = techan.plot.crosshair()
  //           .xScale(x)
  //           .yScale(y)
  //           .xAnnotation([this.timeAnnotation])
  //           .yAnnotation([this.ohlcRightAnnotation])
  //           .on("enter", this.enter)
  //           .on("out", this.out)
  //           .on("move", this.move);

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    // console.log('bC ngOC changes: ', changes);
    if (changes['containerDimensions'] && changes['containerDimensions'].currentValue) {
      
      console.log('bC ngOC changes-containerDimensions: ', changes['containerDimensions'].currentValue);
      this.draw(this.chartDataBS.value);
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

        this.draw(this.chartDataBS.value);
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
  }
  
  ngAfterViewInit() {
    // console.log('bC ngAVI chart data: ', this.chartDataBS.value);
    // console.log('bC ngAVI baseChart div: ', this.baseChart);
  }

  ngAfterViewChecked() {
  }

  // enter() {
  //   coordsText.style("display", "inline");
  // }

  // out() {
  //     coordsText.style("display", "none");
  //   }

  // move(coords) {
  //   coordsText.text(
  //       timeAnnotation.format()(coords.x) + ", " + ohlcAnnotation.format()(coords.y)
  //   );
  // }

 

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
    this.svg = d3.select('#svgDiv')
    .append('svg')
    .attr('top', this.margin.buffer)
    .attr('left', this.margin.buffer)
    .attr('width', this.chartPanelDimsBS.value.svgDim.width)
    .attr('height', this.chartPanelDimsBS.value.svgDim.height)
    .append('g');
    
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
    this.drawChart(this.chartDataBS.value);
  }

  private generateExtents(data: OHLCData[]) {
    console.log('bC gE vert scale factor: ', this.verticalScaleFactor);
    const xMin = Math.floor(d3.min(data, d => d['date']));
    const xMax = Math.ceil(d3.max(data, d => d['date']));
    let yMin = d3.min(data, d => d['close']);
    let yMax = d3.max(data, d => d['close']);
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

  private generateXAxis(xMin: number, xMax: number) {
    const x = d3
      .scaleTime()
      .domain([xMin, xMax])
      .range([0, this.containerDimsBS.value.width - this.margin.left - this.margin.right]);

    return x;
  }
  
  private generateFinanceTimeXAxis() {
    const x = techan.scale
      .financetime()
      .range([0, this.containerDimsBS.value.width - this.margin.right]);
    
    return x;
  }

  private generateYAxis(yMin: number, yMax: number) {
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
          .domain([Math.max(yMin, 0.1), yMax])
          .range([this.containerDimsBS.value.height - this.margin.top - this.margin.bottom, 0]);
        break;

      default: console.log('bC gYA default.  ummm... dude... no scale type... WTF???')
    }


    return yAxis;
  }

  private generateDataDisplay(xAxis, yAxis) {
    // console.log('bC gDD data display axes: ', xAxis, yAxis);
    let dataDisplay;

    switch(this.chartType) {
      case ChartType.LINE:
        // console.log('bC gDD chart type line');
        
        dataDisplay = d3
          .line()
          .x(d => xAxis(d['date']))
          .y(d => yAxis(d['close']));
      
        break;

      case ChartType.BAR:
        console.log('bC gDD chart type bar');
        
        break;

      case ChartType.CANDLESTICK:
        // console.log('bC gDD chart type candlestick');

        this.svg.append("g")
                .attr("class", "candlestick");
        
        dataDisplay = techan.plot
          .candlestick()
          .xScale(xAxis)
          .yScale(yAxis);

        break;

      default: console.log('bC gYA default.  ummm... dude... no y axis type... WTF???');
    }

    return dataDisplay;
  }

  private appendXAxis(xAxis) {
    this.svg
      .append('g')
      .attr('id', 'xAxis')
      // .attr('transform', `translate(0, ${this.dimsBS.value.height - this.margin.bottom - this.margin.top})`)
      // .attr('transform', `translate(${this.margin.left}, ${this.containerDimsBS.value.height - this.margin.bottom - this.margin.top})`)
      .attr('transform', `translate(${this.chartPanelDimsBS.value.xAxisAnchor.right}, ${this.chartPanelDimsBS.value.xAxisAnchor.down})`)
      .call(d3.axisBottom(xAxis));

  }

  private appendYAxis(yAxis) {
    this.svg
    .append('g')
    .attr('id', 'yAxis')
    // .attr('transform', `translate(${this.containerDimsBS.value.width - this.margin.right}, 0)`)
    .attr('transform', `translate(${this.chartPanelDimsBS.value.yAxisAnchor.right}, ${this.chartPanelDimsBS.value.yAxisAnchor.down})`)
    .call(d3.axisRight(yAxis));

  }

  private appendDataDisplay(dataDisplay) {
    this.svg
      .append('path')
      .data([this.chartDataBS.value])
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
    const xAxis = this.generateXAxis(xMin, xMax);
    // const xAxis = this.generateFinanceTimeXAxis(xMin, xMax);
    const yAxis = this.generateYAxis(yMin, yMax);

    // actual data rendering
    const dataDisplay = this.generateDataDisplay(xAxis, yAxis);

    this.appendXAxis(xAxis);

    this.appendYAxis(yAxis);

    if (this.chartType === ChartType.CANDLESTICK) {
      this.drawCandlestick(this.chartDataBS.value, dataDisplay);
    } else {
      this.appendDataDisplay(dataDisplay);

    }
  }

  // drawCandlestick(data: OHLCData[], dataDisplay) {
  //   const x = this.generateFinanceTimeXAxis();
  //   const y = d3.scaleLinear().range([this.dimsBS.value.height, 0]);
  //   x.domain(data.map(dataDisplay.accessor().d));
  //   y.domain(techan.scale.plot.ohlc(data, dataDisplay.accessor()).domain());
    
  //   this.svg.selectAll("g.candlestick").datum(data).call(dataDisplay);
  // }

  drawCandlestick(data: OHLCData[], dataDisplay) {
    const x = this.generateFinanceTimeXAxis();
    const y = d3.scaleLinear().range([this.containerDimsBS.value.height, 0]);
    x.domain(data.map(dataDisplay.accessor().d));
    y.domain(techan.scale.plot.ohlc(data, dataDisplay.accessor()).domain());
    
    this.svg.selectAll("g.candlestick")
    .datum(data)
    .attr('transform', `translate(${this.margin.left}, 0)`)
    .call(dataDisplay);
  }



}
