import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import * as d3 from 'd3';

import { ChartGeneratorService } from 'src/app/services/chart-gen/chart-generator.service';
import { OHLCData } from 'src/app/common/interfaces';
import { ChartPanelConfig, DataRenderIndices, DomRectCoordinates, Indicator } from 'src/app/common/interfaces_chart';
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
    // console.log('dC chartData input data[100]: ', data[100]);
    this.chartDataBS.next(data);
    this.allChartDataBS.next(data);
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

  // later this will possible come from content projection of ChartControls comp in DC template
  @Input()
  set dataRenderIndices(indices: DataRenderIndices) {
    this.dataRenderIndicesBS.next(indices);
    // console.log('dC set dRI input indices: ', indices);

    this.refreshChart();

  }
  get dataRenderIndices() {
    return this.dataRenderIndicesBS.value;
    
  }
  
  readonly chartDataBS = new BehaviorSubject<OHLCData[]>([]);
  
  readonly allChartDataBS = new BehaviorSubject<OHLCData[]>([]);

  readonly containerDimsBS = new BehaviorSubject<DomRectCoordinates>(DOM_RECT_COORDS_INITIALIZER);

  readonly chartPanelConfigBS = new BehaviorSubject<ChartPanelConfig>(LAYER_PANEL_CONFIG);
  
  readonly dataRenderIndicesBS = new BehaviorSubject<DataRenderIndices>({start: 0, end: 0});

  constructor(private readonly chartGenSvc: ChartGeneratorService) { }

  // Do we even need ngOnChanges?  Will we ever be updating any BS here?  If we always get updates
  // from Inputs then we can remove ngOC
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['containerDimensions'] && changes['containerDimensions'].currentValue) {

      this.chartPanelConfig.containerDims = this.containerDimsBS.value;

      if (this.containerDimsBS.value.height > 0 && this.containerDimsBS.value.width > 0) {

        // existing
        this.refreshChart();
        // only need to re-render the panel here.  Don't need to  recalculate data
      }
    }

    if (changes['chartData'] && changes['chartData'].currentValue) {
      const data: OHLCData[] = (changes['chartData']).currentValue;
      this.chartDataBS.next(data);
      this.refreshChart();
    }

    if (changes['chartData'] && changes['chartData'].currentValue) {

    }

    // later
    // add changes for chart type, scale type, vert scale factor and chart mode
      
  }
  
  ngOnInit(): void {
    // console.log('dC ngOI chart panel config value: ', this.chartPanelConfigBS.value);
    // console.log('dC ngOI chart data: ');
    // console.table(this.chartData.slice(100, 101));
    this.generatePanelData(this.chartPanelConfig);
    this.refreshChart();
  }

  setContainerDimensions(dimensions: DomRectCoordinates) {
    const height = Math.floor(dimensions['height']);
    const width = Math.floor(dimensions['width']);

    return {...dimensions, height, width, margin: DEFAULT_MARGIN_CONFIG};
  }

  generatePanelData(panelConfig: ChartPanelConfig) {
    const indicatorValues = Array.from(Object.values(Indicator));
    // console.log('dC gPD initial allChartDataBS value:');
    // console.table(this.allChartDataBS.value.slice(100, 101));
    // loop through config panes layers series
    for (const pane of panelConfig.panes) {
      // console.log('dC gPD ------- pane:', pane.paneNumber);
      for (const layer of pane.layerConfigs) {
        // console.log('dC gPD ------- layer:', layer.layerNumber);
        for (const series of layer.series) {
          // console.log('dC gPD ------- series:', series.seriesLabel);
          // make a call to chartGeneratorSvc generateSeriesData for each series
          // this will return a new data object with the data column inserted
          // push this new data object to the local var so the next call in the loop gets it as the arg
          // const data = this.chartGenSvc.generateSeriesData(series, newData);

          const seriesName = series.seriesName as unknown as Indicator;

          // generate series data only if series is an indicator (ie not ohlcv data)
          if (indicatorValues.includes(seriesName)) {
            const data = this.chartGenSvc.generateSeriesData(series, this.allChartDataBS.value);
            this.allChartDataBS.next(data);
            // console.log('dC gPD output data:');
            // console.table(data.slice(300, 301));
            // console.log('dC gPD this.allChartDataBS.value:');
            // console.table(this.allChartDataBS.value.slice(300, 301));
          }
        }
      }
    }

    // console.log('dC gPD final data: ');
    // console.table(this.allChartDataBS.value.slice(300, 310));
    // when complete the chartDataBS will now have all the necessary data and render can occur

    

  }

  refreshChart() {
    const ok = this.chartPanelConfig.containerDims?.height && this.chartPanelConfig.containerDims?.height;

    if (ok && this.allChartDataBS.value && this.chartPanelConfig.containerDims) {
      const data = this.getDataRangeSelection();
      const renderablePanel = this.chartGenSvc.generateRenderablePanel(data, this.chartPanelConfig);
          
      d3.select('svg').remove();
      d3.select('#dynamicChart')
        .attr('top', this.containerDimsBS.value.margin.top)
        .attr('left', this.containerDimsBS.value.margin.left)
        .attr('width', this.containerDimsBS.value.width)
        .attr('height', this.containerDimsBS.value.height)
        .append(() => renderablePanel.renderPanel.node())
        ;

    }
    
    

  }

  getDataRangeSelection(): OHLCData[] {
    const startInd = this.dataRenderIndices.start;
    const endInd = this.dataRenderIndices.end
    // console.log('dP gDRS st/end: ', startInd, endInd);
    const selection = this.allChartDataBS.value.slice(startInd, endInd);
    // console.log('dP gDRS selection: ', selection);

    return selection;

  }

}
