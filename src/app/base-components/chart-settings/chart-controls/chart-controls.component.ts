import { Component, ChangeDetectionStrategy, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { ChartMoveEvent, ChartType, ScaleType, PanDistance, Zoom } from 'src/app/common/interfaces_chart';
import {DEFAULT_CHART_MOVE_EVENT, DEFAULT_ZOOM_LEVEL, ZOOM_LEVELS} from '../../../common/constants';

import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'exp-chart-controls',
  templateUrl: './chart-controls.component.html',
  styleUrls: ['./chart-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartControlsComponent implements OnInit {
  @Input() 
  set numDataPoints(numPoints: number) {
    console.log('cC @input num data points: ', numPoints);
    this.numDataPts = numPoints;
    this.initializeChartMoveConfig(numPoints);
  };

  @Output() moveChart = new EventEmitter<ChartMoveEvent>();
  @Output() updateChartType = new EventEmitter<ChartType>();
  @Output() updateScaleType = new EventEmitter<ScaleType>();

  chartMoveConfigBS = new BehaviorSubject<ChartMoveEvent>(DEFAULT_CHART_MOVE_EVENT);
  
  readonly CHART_TYPE = ChartType;
  readonly SCALE_TYPE = ScaleType;
  readonly PAN_DISTANCE = PanDistance;
  readonly ZOOM = Zoom;

  currentIndex = 0;
  previousIndex = 0;
  pageSize = 0;
  numDataPts = 0
  currentZoomLevel = DEFAULT_ZOOM_LEVEL;
  previousZoomLevel = DEFAULT_ZOOM_LEVEL;
  numZoomLevels = ZOOM_LEVELS.size;

  constructor() { }

  ngOnInit(): void {}

  initializeChartMoveConfig(numPoints: number) {
    console.log('cC iCMS num data points: ', numPoints);
    this.pageSize = Math.round(numPoints * ZOOM_LEVELS.get(this.currentZoomLevel));
    console.log('cC iCMS initialized pageSize: ', this.pageSize);
    this.previousIndex = Math.round(numPoints - numPoints * ZOOM_LEVELS.get(this.currentZoomLevel));
    this.currentIndex = this.previousIndex;

    const move = {...DEFAULT_CHART_MOVE_EVENT};
    move.numDataPoints = numPoints;
    move.startIndex = Math.round(numPoints - numPoints * ZOOM_LEVELS.get(this.currentZoomLevel));
    move.endIndex = numPoints;
    move.hasNextPage = false;
    move.hasPreviousPage = true;

    this.chartMoveConfigBS.next(move);
    this.sendChartConfig();
    
    console.log('cC iCMS initialized chart move object: ', move);
    console.log('cC iCMS chart moveBS val: ', this.chartMoveConfigBS.value);
    
  }

  handlePan(panDistance: PanDistance) {
    console.log('cC hP panDistance: ', panDistance);

    let index = 0;
    
    switch (panDistance) {
      case PanDistance.START: 
        // this.currentIndex = 0;
        index = 0;
        break;

      case PanDistance.LEFT: 
        index = Math.max(this.currentIndex - this.pageSize, 0);
        break;
    
      case PanDistance.RIGHT:
        index = Math.min(this.currentIndex + this.pageSize, this.numDataPts);
        break;
    
      case PanDistance.END: 
        index = this.numDataPts - this.pageSize;
        break;
     
      default: console.log('cC hP default.  Doh!  no pan distance dude!  WTF???');
    }

    this.updateChartMoveConfig(index);
    console.log('cC hP final zoom config: ', this.chartMoveConfigBS.value);
    this.sendChartConfig();
  }

  handleZoom(zoom: Zoom) {
    console.log('cC hZ zoom: ', zoom);
    console.log('cC hZ initial zoomLevel/multiplier: ', this.currentZoomLevel, ZOOM_LEVELS.get(this.currentZoomLevel));
    
    const center = this.currentIndex + this.pageSize / 2;
    let newIndex = 0;
    let newZoom = 0;
    let newPageSize = 0;
    
    switch (zoom) {
      case Zoom.IN:
        newZoom = Math.max(this.currentZoomLevel - 1, 1);
        console.log('cD hZ zoom in updated zoom level: ', newZoom);

        newPageSize = this.updatePageSize(newZoom);
        console.log('cD hZ updated pageSize: ', newPageSize);
        
        newIndex = center - newPageSize / 2;
        console.log('cD hZ zoom in newIndex: ', newIndex);
        
        break;
        
        case Zoom.OUT: 
        
        newZoom = Math.min(this.currentZoomLevel + 1, ZOOM_LEVELS.size);
        console.log('cD hZ updated zoom level: ', newZoom);
        
        newPageSize = this.updatePageSize(newZoom);
        console.log('cD hZ updated pageSize: ', newPageSize);
        
        const maybeStart = center - newPageSize / 2;
        const maybeEnd = center + newPageSize / 2;
        console.log('cD hZ zoom out maybeStart maybeEnd: ', maybeStart, maybeEnd);
        
        newIndex = maybeStart < 0 ? 0 : maybeStart;
        console.log('cD hZ zoom out start newIndex: ', newIndex);

        newIndex = maybeEnd > this.numDataPts ? this.numDataPts - newPageSize : newIndex;
        console.log('cD hZ zoom out end newIndex: ', newIndex);

        break;
     
      default: console.log('cC hZ default.  Doh!  no zoom dude!  WTF???');

    }

    this.updateChartMoveConfig(newIndex);
    this.updateZoomLevel(newZoom);
    console.log('cC hP final zoom config: ', this.chartMoveConfigBS.value);
    this.sendChartConfig();
  }

  hasNextPage(): boolean {
    return this.currentIndex + this.pageSize + 1 < this.numDataPts ? true : false;
  }

  hasPreviousPage(): boolean {
    return this.currentIndex  > 0 ? true : false;
  }

  updatePageSize(newZoom: number): number {
    console.log('cD uPS new zoom level/mult: ', newZoom, ZOOM_LEVELS.get(newZoom));
    const pageSize = Math.round(this.numDataPts * ZOOM_LEVELS.get(newZoom));
    console.log('cD uPS updated page size: ', pageSize);
    this.pageSize = pageSize;

    return pageSize;
  }

  updateChartMoveConfig(index: number) {
    const currentIndex = Math.round(index);
    this.currentIndex = currentIndex;
    const move = {...this.chartMoveConfigBS.value};
    move.startIndex = currentIndex;
    move.endIndex = currentIndex + this.pageSize;
    move.hasNextPage = this.hasNextPage();
    move.hasPreviousPage = this.hasPreviousPage();

    this.chartMoveConfigBS.next(move);
  }

  updateZoomLevel(zoomLevel: number) {
    this.currentZoomLevel = zoomLevel;
  }

  sendChartConfig() {
    this.moveChart.emit(this.chartMoveConfigBS.value);
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
