import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { ChartType, ScaleType, PanDistance, Zoom } from 'src/app/common/interfaces_chart';

@Component({
  selector: 'exp-chart-controls',
  templateUrl: './chart-controls.component.html',
  styleUrls: ['./chart-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartControlsComponent implements OnInit {

  readonly CHART_TYPE = ChartType;
  readonly SCALE_TYPE = ScaleType;
  readonly PAN_DISTANCE = PanDistance;
  readonly ZOOM = Zoom;

  constructor() { }

  ngOnInit(): void {
  }

  handlePan(panDistance: PanDistance) {
    console.log('cC hP panDistance: ', panDistance);
  }

  handleZoom(zoom: Zoom) {
    console.log('cC hZ zoom: ', zoom);
  }
  
  setChartType(chartType: ChartType) {
    console.log('cC sCT chart type: ', chartType);
    
  }
  
  setScaleType(scaleType: ScaleType) {
    console.log('cC sST scale type: ', scaleType);

  }

}
