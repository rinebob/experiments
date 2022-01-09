import { Component, ChangeDetectionStrategy, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { ChartMoveEvent, PlotType, ScaleType, PanDistance, Zoom, VerticalAdjustment } from 'src/app/common/interfaces_chart';
import {DEFAULT_CHART_MOVE_EVENT, DEFAULT_ZOOM_LEVEL, ZOOM_LEVELS} from '../../../common/constants';

import { BehaviorSubject, Observable } from 'rxjs';
import { MatSliderChange } from '@angular/material/slider';

@Component({
  selector: 'exp-chart-controls',
  templateUrl: './chart-controls.component.html',
  styleUrls: ['./chart-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartControlsComponent implements OnInit {
  @Input() 
  set numDataPoints(numPoints: number) {
    // console.log('cC @input num data points: ', numPoints);
    this._numDataPoints = numPoints;
    this.initializeChartMoveConfig(numPoints);
    this.sendChartConfig();
  };
  get numDataPoints() {
    return this._numDataPoints;
  }
  private _numDataPoints = 0;

  @Output() moveChart = new EventEmitter<ChartMoveEvent>();
  @Output() verticalAdjustment = new EventEmitter<VerticalAdjustment>()
  @Output() updateChartType = new EventEmitter<PlotType>();
  @Output() updateScaleType = new EventEmitter<ScaleType>();
  @Output() getData = new EventEmitter<void>();
  @Output() toggleCrosshairs = new EventEmitter<boolean>();

  chartMoveConfigBS = new BehaviorSubject<ChartMoveEvent>(DEFAULT_CHART_MOVE_EVENT);
  chartMoveConfig$:Observable<ChartMoveEvent> = this.chartMoveConfigBS;
  
  readonly CHART_TYPE = PlotType;
  readonly SCALE_TYPE = ScaleType;
  readonly PAN_DISTANCE = PanDistance;
  readonly ZOOM = Zoom;
  readonly VERTICAL_ADJUSTMENT = VerticalAdjustment;

  currentIndex = 0;
  previousIndex = 0;
  pageSize = 0;
  // numDataPoints = 0
  currentZoomLevel = DEFAULT_ZOOM_LEVEL;
  previousZoomLevel = DEFAULT_ZOOM_LEVEL;
  numZoomLevels = ZOOM_LEVELS.size;
  zoomLock = false;
  showCrosshairs = false;

  // slider params
  max = 0;
  min = 0;
  step = 0;
  thumbLabel = false;
  tickInterval = 0;
  startSliderValue = 0;
  endSliderValue = 0;

  constructor() { }

  ngOnInit(): void {
    
  }

  openSettings() {
    console.log('cC oS open settings clicked');
  }

  openIndDialog() {
    console.log('cC oID open indicator dialog clicked');
  }


  initializeChartMoveConfig(numPoints: number) {
    // console.log('======================================');
    // console.log('cC iCMS num data points: ', numPoints);
    const currentIndex = Math.round(numPoints - numPoints * ZOOM_LEVELS.get(this.currentZoomLevel));
    const pageSize = Math.round(numPoints * ZOOM_LEVELS.get(this.currentZoomLevel));
    // console.log('cC iCMS initialized pageSize: ', this.pageSize);
    this.currentIndex = currentIndex;
    this.previousIndex = currentIndex;

    const move = {...DEFAULT_CHART_MOVE_EVENT};
    move.numDataPoints = numPoints;
    move.startIndex = Math.round(numPoints - numPoints * ZOOM_LEVELS.get(this.currentZoomLevel));
    move.endIndex = numPoints;
    move.hasNextPage = false;
    move.hasPreviousPage = true;

    this.chartMoveConfigBS.next(move);

    this.pageSize = pageSize;
    
    this.initializeSlider(numPoints, currentIndex, pageSize)
    
    // console.log('cC iCMS initialized chart move object: ', move);
    // console.log('cC iCMS chart moveBS val: ', this.chartMoveConfigBS.value);
    
  }

  initializeSlider(numPts: number, currentIndex: number, pageSize: number, stepFactor = 100, tickFactor = 100) {
    this.max = numPts;
    this.step = Math.round(numPts / stepFactor);
    this.tickInterval = Math.round(numPts / tickFactor);
    this.startSliderValue = currentIndex;
    this.endSliderValue = currentIndex + pageSize;
    // console.log('cC iS slider params max/step/tickInt: ', this.max, this.step, this.tickInterval);
    // console.log('cC iS slider params start/end: ', currentIndex, currentIndex + pageSize);
  }

  toggleZoomLock() {
    this.zoomLock = !this.zoomLock;
  }

  toggleXHairs() {
    console.log('cC tXH toggle crosshairs called');
    this.showCrosshairs = !this.showCrosshairs;
    this.toggleCrosshairs.emit(this.showCrosshairs);
  }

  handleVerticalAdjustment(change: VerticalAdjustment) {
    console.log('cC hV handle vertical.  change: ', change);
    this.verticalAdjustment.emit(change);
  }

  handleSliderChange(change: MatSliderChange) {
    const source = change.source._elementRef.nativeElement.id;
    let startIndex: number, endIndex:number = 0;
    const currentStart = this.chartMoveConfigBS.value.startIndex;
    const currentEnd = this.chartMoveConfigBS.value.endIndex;
    // console.log('---------------------------------');
    // console.log('cC hSC current start/end: ', currentStart, currentEnd);
        
    if (this.zoomLock === false) {
      if (source === 'start') {
        this.startSliderValue = change.value;
        // console.log('cC hSC source = start.  slider value: ', change.value);
        
        startIndex = change.value;
        endIndex = currentEnd
        // console.log('cC hSC initial updated start/end: ', startIndex, endIndex);
        
        if (startIndex > currentEnd) {
          // console.log('cC hSC startInd > curEnd');
          endIndex = startIndex + this.step;
          // console.log('cC hSC revised end: ', endIndex);
          
        }
        this.endSliderValue = endIndex;
        // console.log('cC hSC start control final start/end: ', startIndex, endIndex);
      
      } else {
        this.endSliderValue = change.value;
        // console.log('cC hSC source = end.  slider value: ', change.value);
      
        endIndex = change.value;
        startIndex = currentStart;
        // console.log('cC hSC initial updated start/end: ', startIndex, endIndex);
        if (endIndex < currentStart) {
          // console.log('cC hSC endIndex < curStart');
          startIndex = endIndex - this.step;
          // console.log('cC hSC revised end: ', endIndex);
          
        }
        this.startSliderValue = startIndex;
        // console.log('cC hSC end control final start/end: ', startIndex, endIndex);
      }
    } else {
      // console.log('cC hSC zoom lock on');
      // console.log('cC hSC change value: ', change.value);
      if (source === 'start') {
        // console.log('cC hZ source = start');
        startIndex = change.value;
        endIndex = change.value + this.pageSize;
        if (endIndex > this.numDataPoints) {
          startIndex = this.numDataPoints - this.pageSize;
          endIndex = this.numDataPoints;
        }
      } else {
        // console.log('cC hZ source = end');
        startIndex = change.value - this.pageSize;
        endIndex = change.value;
        if (startIndex < 0) {
          startIndex = 0;
          endIndex = this.pageSize;
        }
      }
      this.updateSliderControls(startIndex, endIndex);
    }
    this.pageSize = endIndex - startIndex;
    this.currentZoomLevel = this.determineZoomLevel(startIndex, endIndex);
    // console.log('cC hSC slider change.  value/source: ', change.value, change.source._elementRef.nativeElement.id);
    // console.log('cC hSC slider change.  prev start/end | new start/end: ', currentStart, currentEnd, ' | ', startIndex, endIndex);
    this.updateChartMoveConfig(startIndex, endIndex);
    this.sendChartConfig();
  }

  formatSliderLabel(value: number) {
    if (value >= 100) {
      return Math.round(value / 100);
    }

    return value;
  }
  
  handlePan(panDistance: PanDistance) {
    // console.log('---------------------------------');
    // console.log('cC hP panDistance: ', panDistance);

    let startIndex: number, endIndex: number = 0;
    
    switch (panDistance) {
      case PanDistance.START: 
        startIndex = 0;
        endIndex = this.pageSize;
        break;

      case PanDistance.LEFT: 
        startIndex = Math.max(this.currentIndex - this.pageSize, 0);
        endIndex = startIndex + this.pageSize;
        break;
    
      case PanDistance.RIGHT:
        endIndex = Math.min(this.currentIndex + this.pageSize * 2, this.numDataPoints);
        startIndex = endIndex - this.pageSize;
        break;
    
      case PanDistance.END: 
        startIndex = this.numDataPoints - this.pageSize;
        endIndex = this.numDataPoints;
        break;
     
      default: console.log('cC hP default.  Doh!  no pan distance dude!  WTF???');
    }

    this.updateChartMoveConfig(startIndex, endIndex);
    this.updateSliderControls(startIndex, endIndex);
    // console.log('cC hP final pan config: ', this.chartMoveConfigBS.value);
    this.sendChartConfig();
  }

  handleZoom(zoom: Zoom) {
    // console.log('---------------------------------');
    // console.log('cC hZ zoom: ', zoom);
    // console.log('cC hZ initial zoomLevel/multiplier: ', this.currentZoomLevel, ZOOM_LEVELS.get(this.currentZoomLevel));
    
    const center = this.currentIndex + this.pageSize / 2;
    const anchor = this.currentIndex + this.pageSize;
    let startZoom, newIndex, newZoom, newPageSize = 0;
    
    
    switch (zoom) {
      case Zoom.IN:
        // startZoom = Math.floor(this.currentZoomLevel);
        startZoom = Math.floor(this.currentZoomLevel - .01);
        // console.log('cC hZ in start zoom: ', startZoom);
        
        // newZoom = Math.max(startZoom - 1, 1);
        newZoom = Math.max(startZoom, 1);
        // console.log('cC hZ zoom in updated zoom level: ', newZoom);
        
        newPageSize = this.updatePageSize(newZoom);
        // console.log('cC hZ updated pageSize: ', newPageSize);
        
        // newIndex = center - newPageSize / 2;
        newIndex = anchor - newPageSize;
        // console.log('cC hZ zoom in newIndex: ', newIndex);
        
        break;
        
        case Zoom.OUT: 
        // startZoom = Math.ceil(this.currentZoomLevel);
        startZoom = Math.ceil(this.currentZoomLevel + .01);
        // console.log('cC hZ out start zoom: ', startZoom);
        
        // newZoom = Math.min(startZoom + 1, ZOOM_LEVELS.size);
        newZoom = Math.min(startZoom, ZOOM_LEVELS.size);
        // console.log('cC hZ updated zoom level: ', newZoom);
        
        newPageSize = this.updatePageSize(newZoom);
        // console.log('cC hZ updated pageSize: ', newPageSize);
        
        // const maybeStart = center - newPageSize / 2;
        const maybeStart = anchor - newPageSize;
        
        const maybeEnd = center + newPageSize / 2;
        // console.log('cC hZ zoom out maybeStart maybeEnd: ', maybeStart, maybeEnd);
        
        newIndex = maybeStart < 0 ? 0 : maybeStart;
        // console.log('cC hZ zoom out start newIndex: ', newIndex);

        newIndex = maybeEnd > this.numDataPoints ? this.numDataPoints - newPageSize : newIndex;
        // console.log('cC hZ zoom out end newIndex: ', newIndex);

        break;
     
      default: console.log('cC hZ default.  Doh!  no zoom dude!  WTF???');

    }

    this.updateChartMoveConfig(newIndex);
    this.updateZoomLevel(newZoom);
    this.updateSliderControls(newIndex, newIndex + newPageSize);
    // console.log('cC hP final zoom config: ', this.chartMoveConfigBS.value);
    this.sendChartConfig();
  }

  hasNextPage(): boolean {
    return this.currentIndex + this.pageSize + 1 < this.numDataPoints ? true : false;
  }

  hasPreviousPage(): boolean {
    return this.currentIndex  > 0 ? true : false;
  }

  updatePageSize(newZoom: number): number {
    // console.log('cC uPS new zoom level/mult: ', newZoom, ZOOM_LEVELS.get(newZoom));
    const pageSize = Math.round(this.numDataPoints * ZOOM_LEVELS.get(newZoom));
    // console.log('cC uPS updated page size: ', pageSize);
    this.pageSize = pageSize;

    return pageSize;
  }

  updateChartMoveConfig(start: number, end?:number) {
    // console.log('cC uCMC start/end: ', start, end);
    const currentIndex = Math.round(start);
    this.currentIndex = currentIndex;
    const moveEnd = end ? end : Math.min(currentIndex + this.pageSize, this.numDataPoints);
    const move = {...this.chartMoveConfigBS.value};
    move.startIndex = currentIndex;
    move.endIndex = Math.round(moveEnd);
    move.hasNextPage = this.hasNextPage();
    move.hasPreviousPage = this.hasPreviousPage();

    this.chartMoveConfigBS.next(move);
    // console.log('cC hP final config: ', this.chartMoveConfigBS.value);
  }
  
  updateSliderControls(start: number, end: number) {
    // console.log('cC uSC start / end: ', start, end);
    this.startSliderValue = start;
    this.endSliderValue = end;
  }

  updateZoomLevel(zoomLevel: number) {
    this.currentZoomLevel = zoomLevel;
  }

  determineZoomLevel(start: number, end: number): number {
    // max zoom level
    let newZoom = 8;

    const numPts = end - start;
    // zoom level is ratio of (end - start) / num data points
    const ratio = (end - start) / this.numDataPoints;
    // this is the value in the ZoomLevels key-value pair
    // find where this is in the zoom levels map
    let first = 0;

    for (const [key, value] of ZOOM_LEVELS.entries()) {
      // start at the lowest zoom level see how many points this is
      // if less than numPts go to next zoom level 
      if (value * this.numDataPoints < numPts) {
        first = key;
        
      } else {
        break;
      }

    }


    newZoom = first + ratio;


    // return the next lowest zoom level (key) with the ratio appended
    // ex: start 100 end 200 num pts 500 ratio is .20 ((200-100)/500)
    // .2 is between ZoomLevels 3 & 4  [3, 0.01], [4, 0.025],
    // return 3.2

    // just return a number
    // next button click will floor/celing based on zoom direction
    console.log('cC dZL start/end/newslider zoom level: ',start, end, newZoom);
    return newZoom;
  }

  sendChartConfig() {
    this.moveChart.emit(this.chartMoveConfigBS.value);
    // console.log('cC sCC emitted chartMoveConfig: ', this.chartMoveConfigBS.value);
  }
  
  setChartType(chartType: PlotType) {
    // console.log('cC sCT chart type: ', chartType);
    this.updateChartType.emit(chartType);
    
  }
  
  setScaleType(scaleType: ScaleType) {
    // console.log('cC sST scale type: ', scaleType);
    this.updateScaleType.emit(scaleType);
    
  }
  
  requestData() {
    // console.log('cC rD request data called');
    this.getData.emit();
  }

}
