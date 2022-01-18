import { AfterViewInit, Component, ElementRef, OnInit, ChangeDetectionStrategy, Input, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OptionProjectionDataSet } from 'src/app/common/option_interfaces';
import {ChartPanelConfig, DomRectCoordinates } from '../../../../../common/interfaces_chart';
import { DEFAULT_MARGIN_CONFIG, DOM_RECT_COORDS_INITIALIZER } from '../../../../../common/constants';
import * as d3 from 'd3';
import { ChartGeneratorService } from 'src/app/services/chart-gen/chart-generator.service';

@Component({
  selector: 'exp-calc-charts',
  templateUrl: './calc-charts.component.html',
  styleUrls: ['./calc-charts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalcChartsComponent implements AfterViewInit, OnInit {
  @ViewChild('panelRoot', {read: ElementRef}) panelRoot: ElementRef;

  @Input()
  set dataSet(set: OptionProjectionDataSet) {
    console.log('cC @i dataSet: ', set);
    this.dataSetBS.next(set);

  }
  get dataSet() {
    return this.dataSetBS.value;
  }
  dataSetBS = new BehaviorSubject<OptionProjectionDataSet>([]);

  @Input()
  set renderConfig(config: ChartPanelConfig) {
    console.log('cC @i config: ', config);
    this.renderConfigBS.next(config);

  }
  get renderConfig() {
    return this.renderConfigBS.value;
  }
  renderConfigBS = new BehaviorSubject<ChartPanelConfig>({})

  containerDimsBS = new BehaviorSubject<DomRectCoordinates>(DOM_RECT_COORDS_INITIALIZER);

  constructor(private readonly chartGenSvc: ChartGeneratorService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.containerDimsBS.next(this.generateDomRectCoordinates());
    this.refreshChart();
  }

  // Get DOM rect coords
  generateDomRectCoordinates() {
    const domRect:DomRectCoordinates = this.panelRoot.nativeElement.getBoundingClientRect();
    
    console.log('cC gDRC panelContainer domRect:');
    console.table(domRect);
    
    const coords: DomRectCoordinates = {
      x: domRect.x,
      y: domRect.y,
      height: Math.floor(domRect.height),
      width: Math.floor(domRect.width),
      top: domRect.top,
      bottom: domRect.bottom,
      right: domRect.right,
      left: domRect.left,
      margin: DEFAULT_MARGIN_CONFIG,
    };
  
    console.log('cC gDRC final coords:');
    console.table(coords);
    return coords;

  }

  // // set container dimensions
  // setContainerDimensions(dimensions: DomRectCoordinates) {
  //   const height = Math.floor(dimensions['height']);
  //   const width = Math.floor(dimensions['width']);

  //   return {...dimensions, width, height, margin: DEFAULT_MARGIN_CONFIG};
  // }

  // refresh chart
  refreshChart() {
    // for now just use the first series in the data set
    const dataSeries = this.dataSet[0];
    const strike = dataSeries.strike;
    const data = dataSeries.series;

    const dims = this.containerDimsBS.value;


    console.log('cC rC strike/dims/data: ', strike, dims);
    console.table(data);


    // if all the dimensions are present (chartPanelConfig.containerDims.h & w)
    // and if the data is present
    // make a call to chart gen svc generate renderable panel, passing the data and
    // chart panel config objects
    // this should return a svg group object that you can append to the below base svg

    // DOH! wrong data type dude!  it's not OHLCData dooooohhhhhh.....
    // need to adapt Dynamic Chart code to new use case here for linear data
    // const renderablePanel = this.chartGenSvc.generateRenderablePanel(data, this.renderConfig);

    const rect = d3.create('svg:rect')
      .attr('height', '50px')
      .attr('width', '50px')
      .attr('stroke', 'blue')
      .attr('stroke-width', '1.0')
      // .attr('transform', `translate(100px, 100px)`)
      ;

    const root = d3.create('svg')
      .attr('width', this.containerDimsBS.value.width)

      // height is coming as zero value...

      .attr('height', this.containerDimsBS.value.height)
      .attr('id', 'root-panel')
      .append(() => rect.node())
      ;
    
    d3.select('svg').remove();
    d3.select('#panelRoot')
      .attr('top', this.containerDimsBS.value.margin.top)
      .attr('left', this.containerDimsBS.value.margin.left)
      .attr('width', this.containerDimsBS.value.width)
      // .attr('height', this.containerDimsBS.value.height)
      .attr('height', 500)
      .append(() => root.node())
      // .append(() => renderablePanel.renderPanel.node())
      ;


    // BOOM!



  }

}
