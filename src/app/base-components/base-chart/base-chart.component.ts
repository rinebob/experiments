import { AfterViewInit, Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges} from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import * as d3 from 'd3';

import { GalleryChartMode, OHLCData, PickerTableData } from 'src/app/common/interfaces';
import { ChartDimensions } from 'src/app/common/interfaces_chart';
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
    // console.log('bC ngOC changes: ', changes);
    if (changes['chartData']) {
      // console.log('bC ngOC changes-chartData: ', changes['chartData'].currentValue);
      
      
      const data: OHLCData[] = (changes['chartData']).currentValue;
      this.chartDataBS.next(data);
      if (data) {
        
        // console.log('bC ngOC calling create svg and draw chart');
        this.createSvg();
        this.drawChart(this.chartDataBS.value);
      }
    }

    if (changes['chartMode']) {
      // console.log('bC ngOC changes-chartMode: ', changes['chartMode']);
      

      const data: GalleryChartMode = (changes['chartMode']).currentValue;
      this.chartModeBS.next(data);
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

  createSvg() {
    d3.select("svg").remove();
    this.svg = d3.select('#chartHost')
    .append('svg')
    .attr('width', this.width + this.margin.left + this.margin.right)
    .attr('height', this.height + this.margin.top + this.margin.bottom)
    .append('g')
    .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

  }

  drawChart(data: any[]) {
    console.log('bC dC data[0]: ', data[0]);
    // find data range
    const xMax = d3.max(data, d => {return d['date']});
    const xMin = d3.min(data, d => {return d['date']});
    const yMin = d3.min(data, d => {return d['close']});
    const yMax = d3.max(data, d => {return d['close']});

    // chart scales
    const xScale = d3
    .scaleTime()
    .domain([xMin, xMax])
    .range([0, this.width]);

    const yScale = d3
    .scaleLinear()
    .domain([yMin - 5, yMax])
    .range([this.height, 0]);

    const line = d3
    .line()
    .x(d => {
      return xScale(d['date']);
    })
    .y(d => {
      return yScale(d['close']);
    });

    this.svg
    .append('g')
    .attr('id', 'xAxis')
    .attr('transform', `translate(0, ${this.height})`)
    .call(d3.axisBottom(xScale));

    this.svg
    .append('g')
    .attr('id', 'yAxis')
    .attr('transform', `translate(${this.width}, 0)`)
    .call(d3.axisRight(yScale));

    this.svg
    .append('path')
    .data([this.chartDataBS.value])
    .style('fill', 'none')
    .attr('id', 'priceChart')
    .attr('stroke', 'steelblue')
    .attr('stroke-width', '1.5')
    .attr('d', line);


    
  }



}
