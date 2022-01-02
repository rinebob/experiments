import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as d3 from 'd3';

import { ChartGeneratorService } from 'src/app/services/chart-gen/chart-generator.service';
import { OHLCData } from 'src/app/common/interfaces';
import { ChartPanelConfig, DomRectCoordinates } from 'src/app/common/interfaces_chart';
import { DOM_RECT_COORDS_INITIALIZER } from 'src/app/common/constants';
import { DEFAULT_MARGIN_CONFIG} from 'src/app/common/constants';
import { LAYER_PANEL_CONFIG, SINGLE_PANE_LAYER_PANEL_CONFIG} from 'src/app/common/chart_configs';

@Component({
  selector: 'exp-dynamic-chart',
  templateUrl: './dynamic-chart.component.html',
  styleUrls: ['./dynamic-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicChartComponent implements OnChanges, OnInit {

  @Input()
  set chartData(data: OHLCData[]) {
    console.log('dC chartData input data[100]: ', data[100]);
    this.chartDataBS.next(data);
  }
  get chartData() {
    return this.chartDataBS.value;
  }

  @Input()
  set containerDimensions(dimensions: DomRectCoordinates) {
    this.containerDimsBS.next(this.setContainerDimensions(dimensions));
  }
  get containerDimensions() {
    return this.containerDimsBS.value;
  }

  @Input()
  set chartPanelConfig(config: ChartPanelConfig) {
    this.chartPanelConfigBS.next(config);

  }
  get chartPanelConfig() {
    return this.chartPanelConfigBS.value;
  }
  
  readonly chartDataBS = new BehaviorSubject<OHLCData[]>([]);
  readonly chartData$: Observable<OHLCData[]> = this.chartDataBS;

  readonly containerDimsBS = new BehaviorSubject<DomRectCoordinates>(DOM_RECT_COORDS_INITIALIZER);

  readonly chartPanelConfigBS = new BehaviorSubject<ChartPanelConfig>(LAYER_PANEL_CONFIG);

  constructor(private readonly chartGenSvc: ChartGeneratorService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['containerDimensions'] && changes['containerDimensions'].currentValue) {

      this.chartPanelConfig.containerDims = this.containerDimsBS.value;

      if (this.containerDimsBS.value.height > 0 && this.containerDimsBS.value.width > 0) {
        this.refreshChart();
      }

    }

    if (changes['chartData'] && changes['chartData'].currentValue) {
      const data: OHLCData[] = (changes['chartData']).currentValue;
      this.chartDataBS.next(data);
      this.refreshChart();
    }

    // later
    // add changes for chart type, scale type, vert scale factor and chart mode
      
  }
  
  ngOnInit(): void {
    console.log('dC ngOI chart panel config value: ', this.chartPanelConfigBS.value);
  }

  setContainerDimensions(dimensions: DomRectCoordinates) {
    const height = Math.floor(dimensions['height']);
    const width = Math.floor(dimensions['width']);

    return {...dimensions, height, width, margin: DEFAULT_MARGIN_CONFIG};
  }

  refreshChart() {

    const renderablePanel = this.chartGenSvc.generateRenderablePanel(this.chartData, this.chartPanelConfig);
        
    // console.log('bC ngOC returned renderablePanel: ', renderablePanel);

    d3.select('svg').remove();
    d3.select('#dynamicChart')
      .attr('top', this.containerDimsBS.value.margin.top)
      .attr('left', this.containerDimsBS.value.margin.left)
      .attr('width', this.containerDimsBS.value.width)
      .attr('height', this.containerDimsBS.value.height)
      .append(() => renderablePanel.renderPanel.node());

  }

}
