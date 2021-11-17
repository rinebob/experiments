import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { ChartMoveEvent } from '../common/interfaces_chart'
import { OHLCData } from 'src/app/common/interfaces';

import {MSFTData} from '../../assets/data/MSFT_21-1112';
import {MSFTData_sample} from '../../assets/data/MSFT_21-1112_sample';

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
    this.chartDataBS.next(MSFTData);
    // this.chartDataBS.next(MSFTData_sample);
    this.numDataPoints = this.chartDataBS.value.length;
  }

  handleMoveChart(move: ChartMoveEvent) {
    console.log('sC hMC move: ', move);

  }

}
