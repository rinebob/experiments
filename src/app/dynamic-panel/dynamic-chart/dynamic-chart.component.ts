import { AfterViewChecked, AfterViewInit, Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges, ViewChild, ElementRef} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ChartGeneratorService } from 'src/app/services/chart-gen/chart-generator.service';
import * as utils from 'src/app/services/chart-gen/chart_generator_utils';
import { GalleryChartMode, OHLCData, PickerTableData } from 'src/app/common/interfaces';
import { ChartDimensions, ChartPanelConfig, ChartPanelDimensions, PlotType, DomRectCoordinates, ScaleType } from 'src/app/common/interfaces_chart';
import { CHART_MARGINS, CHART_PANEL_DIMENSIONS_INITIALIZER, DEFAULT_CHART_SETTING, DEFAULT_PICKER_TABLE_DATUM, DOM_RECT_COORDS_INITIALIZER } from 'src/app/common/constants';
import { DEFAULT_CHART_DIMENSIONS, DEFAULT_MARGIN_CONFIG, PANE_HEIGHT_MATRIX} from 'src/app/common/constants';
import { LAYER_PANEL_CONFIG, SINGLE_PANE_LAYER_PANEL_CONFIG} from 'src/app/common/chart_configs';

@Component({
  selector: 'exp-dynamic-chart',
  templateUrl: './dynamic-chart.component.html',
  styleUrls: ['./dynamic-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicChartComponent implements AfterViewChecked, AfterViewInit, OnChanges, OnInit {

  @Input()
  set chartPanelConfig(config: ChartPanelConfig) {
    this.chartPanelConfigBS.next(config);

  }
  get chartPanelConfig() {
    return this.chartPanelConfigBS.value;
  }
  

  readonly chartPanelConfigBS = new BehaviorSubject<ChartPanelConfig>(LAYER_PANEL_CONFIG);

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
      
  }
  
  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
      
  }

  ngAfterViewChecked(): void {
      
  }

  ngOnDestroy(): void {
    
  }

}
