import { AfterViewChecked, AfterViewInit, Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges, ViewChild, ElementRef} from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import * as d3 from 'd3';
import * as techan from 'techan';

import { GalleryChartMode, OHLCData, PickerTableData } from 'src/app/common/interfaces';
import { ChartDimensions, ChartType, DomRectCoordinates, ScaleType } from 'src/app/common/interfaces_chart';
import { DEFAULT_PICKER_TABLE_DATUM, DOM_RECT_COORDS_INITIALIZER } from 'src/app/common/constants';
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
    console.log('bC dims: ', dims);
    console.log('bC dimensions.height: ', dimensions.height);
    const height = Math.floor(dimensions['height'] - CONTROLS_HEIGHT);
    const width = Math.floor(dimensions['width'] * this.margin.factor);
    console.log('bC adjusted height/width: ', height, width);
    this.dimsBS.next({...dimensions, height, width});
    console.log('bC t.dimsBS.value: ', this.dimsBS.value);

  }
  get containerDimensions() {
    return this.dimsBS.value;
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

  readonly dimsBS = new BehaviorSubject<DomRectCoordinates>(DOM_RECT_COORDS_INITIALIZER);
  
  readonly chartDataBS = new BehaviorSubject<OHLCData[]>([]);
  readonly chartData$: Observable<OHLCData[]> = this.chartDataBS;

  readonly chartModeBS = new BehaviorSubject<GalleryChartMode>(GalleryChartMode.FULLSCREEN_MODE);
  readonly chartMode$: Observable<GalleryChartMode> = this.chartModeBS;

  private svg;
  private margin = { top: 50, right: 50, bottom: 50, left: 50, buffer: 10, factor: .9 };
  // private width = 1000 - this.margin.left - this.margin.right;
  // private height = 700 - this.margin.top - this.margin.bottom;

  private accessor;

  private dim = {
    // margin: { top: 50, right: 50, bottom: 50, left: 50 },
    // width: 2000,
    // height: 700,
    // extents: {xMin: 0, xMax: 0, yMin: 0, yMax: 0},
  }

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

  }

  ngOnInit(): void {
  }
  
  ngAfterViewInit() {
    // console.log('bC ngAVI chart data: ', this.chartDataBS.value);
    console.log('bC ngAVI baseChart div: ', this.baseChart);
    
    // const dimensions = this.getDimensions(this.baseChart);
    // console.log('bC ngAVI height / width: ', this.baseChart.offsetHeight, this.baseChart.offsetWidth);
    // const dimensions = this.baseChart.getBoundingClientRect();
    // console.log('bC ngAVI dimensions: ', dimensions);
    // this.dim.height = this.baseChart.offsetHeight;
    // this.dim.width =  this.baseChart.offsetWidth;
    // this.draw(this.chartDataBS.value);
    
  }

  ngAfterViewChecked() {

    // console.log('bC ngAVC baseChart div: ', this.baseChart);
    // console.log('bC ngAVC chartDatBS value: ', this.chartDataBS.value);
    // this.draw(this.chartDataBS.value);

  }

  // getDimensions(baseChart: HTMLElement) {
  //   console.log('bC gD baseChart: ', baseChart);
  //   if (baseChart) {
  //     const dimensions = baseChart.getBoundingClientRect();
  //     console.log('bC gD dimensions: ', dimensions);
  //     return dimensions;
      
  //   } else {
  //     console.log('bC gD dimensions.  doh! no base chart dude!');
  //     return;

  //   }
  //   this.dim.height = this.baseChart.offsetHeight;
  //   this.dim.width =  this.baseChart.offsetWidth;
  //   return dimensions;
  // }

  private createSvg() {
    d3.select("svg").remove();
    this.svg = d3.select('#svgDiv')
    .append('svg')
    .attr('width', this.dimsBS.value.width - this.margin.buffer)
    .attr('height', (this.dimsBS.value.height - CONTROLS_HEIGHT))
    .append('g');
    
  }

  private createSvg2() {
    d3.select('svg').remove();
    this.svg = d3.select('#svgDiv')
    .append('svg')
    .attr('preserveAspectRatio', 'xMinYMin meet')
    // .attr('viewBox', '0 0 ' + (this.dimsBS.value.width + this.margin.right) + ' ' + (this.dimsBS.value.height  + this.margin.bottom))
    // .attr('viewBox', '0 0 ' + (this.dimsBS.value.width - this.margin.buffer) + ' ' + (this.dimsBS.value.height - this.margin.buffer))
    .attr('viewBox', '0 0 ' + this.dimsBS.value.width + ' ' + this.dimsBS.value.height)
    .classed('svg-content', true)
    .append('g');
  }

  draw(data: OHLCData[]) {
    this.createSvg();
    // this.createSvg2();
    this.drawChart(this.chartDataBS.value);
  }

  private generateExtents(data: OHLCData[]) {
    const xMax = d3.max(data, d => d['date']);
    const xMin = d3.min(data, d => d['date']);
    const yMin = d3.min(data, d => d['close']);
    const yMax = d3.max(data, d => d['close']);
    const extents = {xMax, xMin, yMax, yMin}

    return {...extents};

  }

  private generateXAxis(xMin: number, xMax: number) {
    const x = d3
      .scaleTime()
      .domain([xMin, xMax])
      .range([0, this.dimsBS.value.width - this.margin.right]);

    return x;
  }
  
  private generateFinanceTimeXAxis() {
    const x = techan.scale
      .financetime()
      .range([0, this.dimsBS.value.width - this.margin.right]);
    
    return x;
  }

  private generateYAxis(yMin: number, yMax: number) {
    let yAxis;

    switch(this.scaleType) {
      case ScaleType.LINEAR:

        yAxis = d3
          .scaleLinear()
          .domain([yMin - 5, yMax])
          .range([this.dimsBS.value.height - this.margin.top - this.margin.bottom, 0]);
        break;

      case ScaleType.LOG:
        yAxis = d3
          .scaleLog()
          .domain([yMin - 5, yMax])
          .range([this.dimsBS.value.height - this.margin.top - this.margin.bottom, 0]);
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
      .attr('transform', `translate(0, ${this.dimsBS.value.height - this.margin.bottom - this.margin.top})`)
      .call(d3.axisBottom(xAxis));

  }

  private appendYAxis(yAxis) {
    this.svg
    .append('g')
    .attr('id', 'yAxis')
    .attr('transform', `translate(${this.dimsBS.value.width - this.margin.right}, 0)`)
    .call(d3.axisRight(yAxis));

  }

  private appendDataDisplay(dataDisplay) {
    this.svg
      .append('path')
      .data([this.chartDataBS.value])
      .style('fill', 'none')
      .attr('id', 'priceChart')
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

  drawCandlestick(data: OHLCData[], dataDisplay) {
    const x = this.generateFinanceTimeXAxis();
    const y = d3.scaleLinear().range([this.dimsBS.value.height, 0]);
    x.domain(data.map(dataDisplay.accessor().d));
    y.domain(techan.scale.plot.ohlc(data, dataDisplay.accessor()).domain());
    
    this.svg.selectAll("g.candlestick").datum(data).call(dataDisplay);
  }



}
