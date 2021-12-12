import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ChartMoveEvent, ChartType, DomRectCoordinates, PanDistance, ScaleType, SymbolTimeSetting, TimeFrame, VerticalAdjustment } from '../common/interfaces_chart'
import { OHLCData } from 'src/app/common/interfaces';
import * as actions from '../store/actions';
import * as selectors from '../store/selectors';
import { DEFAULT_AV_BASE_DATA_SETTING, DEFAULT_CHART_SETTING, DOM_RECT_COORDS_INITIALIZER, VERTICAL_ADJUSTMENT_FACTOR} from '../common/constants';

const SYMBOL = 'SPY';
const DATA_SETTING:SymbolTimeSetting = {
  symbol: SYMBOL,
  timeFrame: TimeFrame.DAILY,
  ...DEFAULT_AV_BASE_DATA_SETTING,
};

@Component({
  selector: 'exp-simple-chart',
  templateUrl: './simple-chart.component.html',
  styleUrls: ['./simple-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleChartComponent implements AfterViewInit, OnDestroy, OnInit {
  readonly destroy = new Subject();
  // @ViewChild('baseChart', {read: ElementRef}) baseChart: HTMLElement;
  @ViewChild('baseChart', {read: ElementRef}) baseChart: ElementRef;
  @ViewChild('simpleChartContainer', {read: ElementRef}) simpleChartContainer: ElementRef;
  @ViewChild('baseChartContainer', {read: ElementRef}) baseChartContainer: ElementRef;

  equityData$: Observable<OHLCData[]> = this.store.select(selectors.selectEquityData);

  allDataBS = new BehaviorSubject<OHLCData[]>([])
  chartDataBS = new BehaviorSubject<OHLCData[]>([]);
  chartData$: Observable<OHLCData[]> = this.chartDataBS;

  chartTypeBS = new BehaviorSubject<ChartType>(DEFAULT_CHART_SETTING.chartType);
  chartType$: Observable<ChartType> = this.chartTypeBS;

  scaleTypeBS = new BehaviorSubject<ScaleType>(DEFAULT_CHART_SETTING.scaleType);
  scaleType$: Observable<ScaleType> = this.scaleTypeBS;

  chartContainerDimensionsBS = new BehaviorSubject<DomRectCoordinates>(DOM_RECT_COORDS_INITIALIZER);
  chartContainerDimensions$: Observable<DomRectCoordinates> = this.chartContainerDimensionsBS;

  verticalScaleFactorBS = new BehaviorSubject<number>(DEFAULT_CHART_SETTING.verticalScaleFactor);
  verticalScaleFactor$: Observable<number> = this.verticalScaleFactorBS

  numDataPoints = 0;
  
  constructor(private readonly store: Store) {
    this.equityData$.pipe(takeUntil(this.destroy))
    .subscribe(
      data => {
        this.chartDataBS.next(data);
        this.allDataBS.next(data);
        this.numDataPoints = this.allDataBS.value.length;
        // console.log('sC ctor num data pts / t.aDBS[0]: ', this.numDataPoints, data[0]);
      }
    );
   }

  ngOnInit(): void {
    this.store.dispatch(actions.sCgDfetchEquityData({dataSetting: DATA_SETTING}));
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  ngAfterViewInit() {
    // console.log('sC ngAVI base chart: ', this.simpleChartContainer);
    // const {x, y, height, width} = this.simpleChartContainer.nativeElement.getBoundingClientRect();
    // const domRect:DomRectCoordinates = this.simpleChartContainer.nativeElement.getBoundingClientRect();
    // console.log('sC ngAVI simpleChartContainer x/y/width/height: ', x, y, width, height);
    // console.log('sC ngAVI simpleChartContainer domRect: ', domRect);

    const {x, y, height, width} = this.baseChartContainer.nativeElement.getBoundingClientRect();
    const domRect:DomRectCoordinates = this.baseChartContainer.nativeElement.getBoundingClientRect();
    
    console.log('sC ngAVI baseChartContainer x/y/width/height: ', x, y, width, height);
    console.log('sC ngAVI baseChartContainer domRect: ', domRect);
    
    const coords: DomRectCoordinates = {
      x: domRect.x,
      y: domRect.y,
      height: domRect.height,
      width: domRect.width,
      top: domRect.top,
      bottom: domRect.bottom,
      right: domRect.right,
      left: domRect.left,
     };
    // console.log('sC ngAVI coords: ', coords);
    this.chartContainerDimensionsBS.next(coords);
  }

  handleVerticalAdjustment(adjustment: VerticalAdjustment) {
    console.log('sC hVA vert adjustment: ', adjustment);
    const currentVertFactor = this.verticalScaleFactorBS.value;
    const adj = adjustment === VerticalAdjustment.VERT_CONTRACT ? VERTICAL_ADJUSTMENT_FACTOR : -VERTICAL_ADJUSTMENT_FACTOR;
    
    const newVertFactor = currentVertFactor + adj;
    // console.log('sC hVA existing/new vert adjustment: ', currentVertFactor, newVertFactor);
    this.verticalScaleFactorBS.next(newVertFactor);
    console.log('sC hVA t.vSFBS.value: ', this.verticalScaleFactorBS.value);

  }

  handleMoveChart(move: ChartMoveEvent) {
    // console.log('sC hMC move: ', move);
    const data = this.getDataRangeSelection(move.startIndex, move.endIndex);
    this.chartDataBS.next(data);
    // console.log('sC hMC t.cDBS.v[0]: ', this.chartDataBS.value[0]);
  }

  handleUpdateChartType(chartType: ChartType) {
    // console.log('sC hUCT chart type: ', chartType);
    this.chartTypeBS.next(chartType);
    console.log('sC hUCT t.baseChart: ', this.baseChart);

  }

  handleUpdateScaleType(scaleType: ScaleType) {
    console.log('sC hUST scale type: ', scaleType);
    this.scaleTypeBS.next(scaleType);
  }

  getDataRangeSelection(startInd: number, endInd: number): OHLCData[] {
    // console.log('sC gDRS st/end: ', startInd, endInd);
    const selection = this.allDataBS.value.slice(startInd, endInd);
    // console.log('sC gDRS selection: ', selection);

    return selection;

  }

  getData() {
    // console.log('sC rD get data called.  dataSetting: ', DATA_SETTING);
    this.store.dispatch(actions.sCgDfetchEquityData({dataSetting: DATA_SETTING}));
  }

}
