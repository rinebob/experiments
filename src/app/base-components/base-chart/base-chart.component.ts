import { AfterViewInit, Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges} from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import * as d3 from 'd3';

import { GalleryChartMode, OHLCData, PickerTableData } from 'src/app/common/interfaces';
import { ChartDimensions, ChartType, ScaleType } from 'src/app/common/interfaces_chart';
import { DEFAULT_PICKER_TABLE_DATUM } from 'src/app/common/constants';
import { DEFAULT_CHART_DIMENSIONS,  } from 'src/app/common/constants';
import {MSFTData} from '../../../assets/data/MSFT_21-1112';

@Component({
  selector: 'exp-base-chart',
  templateUrl: './base-chart.component.html',
  styleUrls: ['./base-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseChartComponent implements AfterViewInit, OnChanges, OnInit {
  
  // @Input() chartData: PickerTableData = DEFAULT_PICKER_TABLE_DATUM;
  // @Input() chartMode: GalleryChartMode = GalleryChartMode.FULLSCREEN_MODE;
  // @Input() chartDimensions: ChartDimensions = DEFAULT_CHART_DIMENSIONS;
  
  @Input()
  set chartData(data: OHLCData[]) {
    // console.log('bC chartData input data[0]: ', data[0]);
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

  readonly chartDataBS = new BehaviorSubject<OHLCData[]>([]);
  readonly chartData$: Observable<OHLCData[]> = this.chartDataBS;

  readonly chartModeBS = new BehaviorSubject<GalleryChartMode>(GalleryChartMode.FULLSCREEN_MODE);
  readonly chartMode$: Observable<GalleryChartMode> = this.chartModeBS;

  private svg;
  private margin = { top: 50, right: 50, bottom: 50, left: 50 };
  private width = 1000 - this.margin.left - this.margin.right;
  private height = 700 - this.margin.top - this.margin.bottom;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    console.log('bC ngOC changes: ', changes);
    if (changes['chartData'] && changes['chartData'].currentValue) {
      // console.log('bC ngOC changes-chartData: ', changes['chartData'].currentValue);
      const data: OHLCData[] = (changes['chartData']).currentValue;
      this.chartDataBS.next(data);
      if (data) {
        console.log('bC ngOC calling create svg and draw chart');
        this.createSvg();
        this.drawChart(this.chartDataBS.value);
      }
    }

    if (changes['chartMode']) {
      // console.log('bC ngOC changes-chartMode: ', changes['chartMode']);
      const data: GalleryChartMode = (changes['chartMode']).currentValue;
      this.chartModeBS.next(data);
    }

    if (changes['scaleType'] || changes['chartType']) {
      
        console.log('bC ngOC scale or chart type change. calling create svg and draw chart');
        this.createSvg();
        this.drawChart(this.chartDataBS.value);
      
    }

  }

  ngOnInit(): void {
    // console.log('bC ngOI chart data: ', this.chartDataBS.value);
    // console.log('bC ngOI set chartData if BS.v.length = 0');
    if (this.chartDataBS.value.length == 0) {
      // console.log('bC ngOI BS.v.length = 0 setting chart data');
      this.chartDataBS.next(MSFTData);

    }
  }
  
  ngAfterViewInit() {
    // console.log('bC ngAVI chart data: ', this.chartDataBS.value);
    
  }

  private createSvg() {
    d3.select("svg").remove();
    this.svg = d3.select('#chartHost')
    .append('svg')
    .attr('width', this.width + this.margin.left + this.margin.right)
    .attr('height', this.height + this.margin.top + this.margin.bottom)
    .append('g')
    .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

  }

  private generateExtents(data: OHLCData[]) {
    const xMax = d3.max(data, d => d['date']);
    const xMin = d3.min(data, d => d['date']);
    const yMin = d3.min(data, d => d['close']);
    const yMax = d3.max(data, d => d['close']);

    return {xMax, xMin, yMax, yMin};

  }

  private generateXAxis(min: number, max: number) {
    const xAxis = d3
    .scaleTime()
    .domain([min, max])
    .range([0, this.width]);

    return xAxis;
  }

  private generateYAxis(min: number, max: number) {
    let yAxis;

    switch(this.scaleType) {
      case ScaleType.LINEAR:

        yAxis = d3
          .scaleLinear()
          .domain([min - 5, max])
          .range([this.height, 0]);
        break;

      case ScaleType.LOG:
        yAxis = d3
          .scaleLog()
          .domain([min - 5, max])
          .range([this.height, 0]);
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
        
        dataDisplay = d3
          .line()
          .x(d => xAxis(d['date']))
          .y(d => yAxis(d['close']));
      
        break;

      case ChartType.BAR:
        
        break;

      case ChartType.CANDLESTICK:

        break;

      default: console.log('bC gYA default.  ummm... dude... no y axis type... WTF???');
    }

    return dataDisplay;
  }

  private appendXAxis(xAxis) {
    this.svg
      .append('g')
      .attr('id', 'xAxis')
      .attr('transform', `translate(0, ${this.height})`)
      .call(d3.axisBottom(xAxis));

  }

  private appendYAxis(yAxis) {
    this.svg
    .append('g')
    .attr('id', 'yAxis')
    .attr('transform', `translate(${this.width}, 0)`)
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
    console.log('bC dC data[0]: ', data[0]);
    // find data range
    const {xMax, xMin, yMax, yMin} = this.generateExtents(data);

    // chart scales
    const xAxis = this.generateXAxis(xMin, xMax);
    const yAxis = this.generateYAxis(yMin, yMax);

    // actual data rendering
    const dataDisplay = this.generateDataDisplay(xAxis, yAxis);

    this.appendXAxis(xAxis);

    this.appendYAxis(yAxis);

    this.appendDataDisplay(dataDisplay);
  }
}
