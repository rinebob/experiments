import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ChartMoveEvent } from '../common/interfaces_chart'
import { OHLCData } from 'src/app/common/interfaces';

import {MSFTData} from '../../assets/data/MSFT_21-1112';
import {MSFTData_sample} from '../../assets/data/MSFT_21-1112_sample';

const DATA_SOURCE = MSFTData;


@Component({
  selector: 'exp-simple-chart',
  templateUrl: './simple-chart.component.html',
  styleUrls: ['./simple-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SimpleChartComponent implements OnInit {

  chartDataBS = new BehaviorSubject<OHLCData[]>([]);
  chartData$: Observable<OHLCData[]> = this.chartDataBS;

  numDataPoints = 0;
  
  constructor() { }

  ngOnInit(): void {
    this.chartDataBS.next(DATA_SOURCE);
    this.numDataPoints = this.chartDataBS.value.length;
    // console.log('sC ngOI chartData[0] / len: ', this.chartDataBS.value[0], this.chartDataBS.value.length);
    // console.log('sC ngOI chartData: ', this.chartDataBS.value);

  }

  handleMoveChart(move: ChartMoveEvent) {
    // console.log('sC hMC move: ', move);
    const data = this.getDataRangeSelection(move.startIndex, move.endIndex);
    this.chartDataBS.next(data);

  }

  getDataRangeSelection(startInd: number, endInd: number): OHLCData[] {
    // console.log('sC gDRS st/end: ', startInd, endInd);
    const selection = DATA_SOURCE.slice(startInd, endInd);
    // console.log('sC gDRS selection: ', selection);

    return selection;

  }

}
