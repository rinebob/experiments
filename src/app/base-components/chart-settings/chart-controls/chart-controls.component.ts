import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';

import { ChartType, ScaleType, PanDistance, Zoom } from 'src/app/common/interfaces_chart';

@Component({
  selector: 'exp-chart-controls',
  templateUrl: './chart-controls.component.html',
  styleUrls: ['./chart-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartControlsComponent implements OnInit {

  @Output() pan = new EventEmitter<PanDistance>();
  @Output() zoom = new EventEmitter<Zoom>();
  @Output() updateChartType = new EventEmitter<ChartType>();
  @Output() updateScaleType = new EventEmitter<ScaleType>();
  

  readonly CHART_TYPE = ChartType;
  readonly SCALE_TYPE = ScaleType;
  readonly PAN_DISTANCE = PanDistance;
  readonly ZOOM = Zoom;

  constructor() { }

  ngOnInit(): void {
  }

  handlePan(panDistance: PanDistance) {
    console.log('cC hP panDistance: ', panDistance);
    this.pan.emit(panDistance);
  }

  handleZoom(zoom: Zoom) {
    console.log('cC hZ zoom: ', zoom);
    this.zoom.emit(zoom);
  }
  
  setChartType(chartType: ChartType) {
    console.log('cC sCT chart type: ', chartType);
    this.updateChartType.emit(chartType);
    
  }
  
  setScaleType(scaleType: ScaleType) {
    console.log('cC sST scale type: ', scaleType);
    this.updateScaleType.emit(scaleType);

  }

}
