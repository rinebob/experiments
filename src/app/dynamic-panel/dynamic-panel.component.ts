import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ChartMoveEvent, ChartPanelConfig, DataRenderIndices, PlotType, DomRectCoordinates, PanDistance, ScaleType, SymbolTimeSetting, TimeFrame, VerticalAdjustment } from '../common/interfaces_chart'
import { OHLCData } from 'src/app/common/interfaces';
import * as actions from '../store/actions';
import * as selectors from '../store/selectors';
import { DEFAULT_AV_BASE_DATA_SETTING, DEFAULT_CHART_SETTING, DOM_RECT_COORDS_INITIALIZER, VERTICAL_ADJUSTMENT_FACTOR} from '../common/constants';
import { LAYER_PANEL_CONFIG, SINGLE_PANE_LAYER_PANEL_CONFIG} from 'src/app/common/chart_configs';

const SYMBOL = 'NFLX';
const DATA_SETTING:SymbolTimeSetting = {
  symbol: SYMBOL,
  timeFrame: TimeFrame.DAILY,
  ...DEFAULT_AV_BASE_DATA_SETTING,
};


@Component({
  selector: 'exp-dynamic-panel',
  templateUrl: './dynamic-panel.component.html',
  styleUrls: ['./dynamic-panel.component.scss']
})
export class DynamicPanelComponent  implements AfterViewInit, OnDestroy, OnInit {
  readonly destroy = new Subject();
  @ViewChild('baseChartContainer', {read: ElementRef}) baseChartContainer: ElementRef;

  equityData$: Observable<OHLCData[]> = this.store.select(selectors.selectEquityData);

  allDataBS = new BehaviorSubject<OHLCData[]>([]);

  chartDataBS = new BehaviorSubject<OHLCData[]>([]);
  chartData$: Observable<OHLCData[]> = this.chartDataBS;

  chartPanelConfigBS = new BehaviorSubject<ChartPanelConfig>(LAYER_PANEL_CONFIG);
  chartPanelConfig$: Observable<ChartPanelConfig> = this.chartPanelConfigBS;

  chartTypeBS = new BehaviorSubject<PlotType>(DEFAULT_CHART_SETTING.chartType);
  chartType$: Observable<PlotType> = this.chartTypeBS;

  scaleTypeBS = new BehaviorSubject<ScaleType>(DEFAULT_CHART_SETTING.scaleType);
  scaleType$: Observable<ScaleType> = this.scaleTypeBS;

  chartContainerDimensionsBS = new BehaviorSubject<DomRectCoordinates>(DOM_RECT_COORDS_INITIALIZER);
  chartContainerDimensions$: Observable<DomRectCoordinates> = this.chartContainerDimensionsBS;

  verticalScaleFactorBS = new BehaviorSubject<number>(DEFAULT_CHART_SETTING.verticalScaleFactor);
  verticalScaleFactor$: Observable<number> = this.verticalScaleFactorBS;

  dataRenderIndicesBS = new BehaviorSubject<DataRenderIndices>({start: 0, end: 0});
  dataRenderIndices$: Observable<DataRenderIndices> = this.dataRenderIndicesBS;

  numDataPoints = 0;
  

  constructor(private readonly store: Store) { 
    this.equityData$.pipe(takeUntil(this.destroy))
    .subscribe(
      data => {
        this.chartDataBS.next(data);
        this.allDataBS.next(data);
        this.numDataPoints = this.allDataBS.value.length;
        this.dataRenderIndicesBS.next({start: 0, end: this.numDataPoints - 1});
        // console.log('dP ctor num data pts / t.allDataBS[0]: ', this.numDataPoints, data[0]);
      }
    );
  }

  ngOnInit(): void {
    
    this.chartPanelConfigBS.next(LAYER_PANEL_CONFIG);
    // this.chartPanelConfigBS.next(SINGLE_PANE_LAYER_PANEL_CONFIG);

    // TODO: copy/rename this action for this caller and register with effect
    this.store.dispatch(actions.sCgDfetchEquityData({dataSetting: DATA_SETTING}));
  }

  ngAfterViewInit() {
    this.chartContainerDimensionsBS.next(this.generateDomRectCoordinates());
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  generateDomRectCoordinates() {
    const domRect:DomRectCoordinates = this.baseChartContainer.nativeElement.getBoundingClientRect();
    
    // console.log('dP ngAVI baseChartContainer domRect:');
    // console.table(domRect);
    
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
  
    // console.log('dP ngAVI final coords: ', coords);
    return coords;

  }

  
  handleVerticalAdjustment(adjustment: VerticalAdjustment) {
    console.log('dP hVA vert adjustment: ', adjustment);
    const currentVertFactor = this.verticalScaleFactorBS.value;
    const adj = adjustment === VerticalAdjustment.VERT_CONTRACT ? VERTICAL_ADJUSTMENT_FACTOR : -VERTICAL_ADJUSTMENT_FACTOR;
    
    const newVertFactor = currentVertFactor + adj;
    console.log('dP hVA existing/new vert adjustment: ', currentVertFactor, newVertFactor);
    this.verticalScaleFactorBS.next(newVertFactor);
    console.log('dP hVA t.vSFBS.value: ', this.verticalScaleFactorBS.value);

  }

  handleMoveChart(move: ChartMoveEvent) {
    // console.log('dP hMC move: ', move);
    // const data = this.getDataRangeSelection(move.startIndex, move.endIndex);
    // this.chartDataBS.next(data);
    // console.log('dP hMC t.cDBS.v[0]: ', this.chartDataBS.value[0]);

    // we don't want to update the actual raw data selection every time here
    // we only want to let the chart know that it should re-render the chart 
    // based on the updated the start/end indices of the data object

    // pass the start/end indices to a BS that can be async'd in the template
    this.dataRenderIndicesBS.next({start: move.startIndex, end: move.endIndex});


  }

  handleUpdateChartType(chartType: PlotType) {
    // console.log('dP hUCT chart type: ', chartType);
    this.chartTypeBS.next(chartType);
    // console.log('dP hUCT t.baseChart: ', this.baseChart);

  }

  handleUpdateScaleType(scaleType: ScaleType) {
    // console.log('dP hUST scale type: ', scaleType);
    this.scaleTypeBS.next(scaleType);
  }

  getDataRangeSelection(startInd: number, endInd: number): OHLCData[] {
    // console.log('dP gDRS st/end: ', startInd, endInd);
    const selection = this.allDataBS.value.slice(startInd, endInd);
    // console.log('dP gDRS selection: ', selection);

    return selection;

  }

  getData() {
    console.log('dP gD get data called.  dataSetting: ', DATA_SETTING);
    this.store.dispatch(actions.sCgDfetchEquityData({dataSetting: DATA_SETTING}));
  }

}
