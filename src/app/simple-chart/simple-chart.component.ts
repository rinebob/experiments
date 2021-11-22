import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { ChartMoveEvent, ChartType, ScaleType, SymbolTimeSetting, TimeFrame } from '../common/interfaces_chart'
import { OHLCData } from 'src/app/common/interfaces';
import * as actions from '../store/actions';
import * as selectors from '../store/selectors';
import { DEFAULT_AV_BASE_DATA_SETTING} from '../common/constants';

// import {MSFTData} from '../../assets/data/MSFT_21-1112';
import {MSFTData_sample} from '../../assets/data/MSFT_21-1112_sample';

// const DATA_SOURCE = MSFTData;

const SYMBOL = 'AAPL';
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
export class SimpleChartComponent implements OnDestroy, OnInit {
  readonly destroy = new Subject();

  equityData$: Observable<OHLCData[]> = this.store.select(selectors.selectEquityData);


  allDataBS = new BehaviorSubject<OHLCData[]>([])
  chartDataBS = new BehaviorSubject<OHLCData[]>([]);
  chartData$: Observable<OHLCData[]> = this.chartDataBS;

  chartTypeBS = new BehaviorSubject<ChartType>(ChartType.LINE);
  chartType$: Observable<ChartType> = this.chartTypeBS;

  scaleTypeBS = new BehaviorSubject<ScaleType>(ScaleType.LOG);
  scaleType$: Observable<ScaleType> = this.scaleTypeBS;

  numDataPoints = 0;
  
  constructor(private readonly store: Store) {
    this.equityData$.pipe(takeUntil(this.destroy))
    .subscribe(
      data => {
        this.chartDataBS.next(data);
        // this.numDataPoints = this.chartDataBS.value.length;
        console.log('sC ctor num data pts / t.eD$[0]: ', this.numDataPoints, data[0]);
        this.allDataBS.next(data);
        this.numDataPoints = this.allDataBS.value.length;
        console.log('sC ctor num data pts / t.aDBS[0]: ', this.numDataPoints, data[0]);
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

  handleMoveChart(move: ChartMoveEvent) {
    console.log('sC hMC move: ', move);
    const data = this.getDataRangeSelection(move.startIndex, move.endIndex);
    this.chartDataBS.next(data);
    console.log('sC hMC t.cDBS.v[0]: ', this.chartDataBS.value[0]);

  }

  handleUpdateChartType(chartType: ChartType) {
    console.log('sC hUCT chart type: ', chartType);
    this.chartTypeBS.next(chartType);

  }

  handleUpdateScaleType(scaleType: ScaleType) {
    console.log('sC hUST scale type: ', scaleType);
    this.scaleTypeBS.next(scaleType);
  }

  getDataRangeSelection(startInd: number, endInd: number): OHLCData[] {
    console.log('sC gDRS st/end: ', startInd, endInd);
    const selection = this.allDataBS.value.slice(startInd, endInd);
    console.log('sC gDRS selection: ', selection);

    return selection;

  }

  getData() {
    console.log('sC rD get data called.  dataSetting: ', DATA_SETTING);
    this.store.dispatch(actions.sCgDfetchEquityData({dataSetting: DATA_SETTING}));
  }

}
