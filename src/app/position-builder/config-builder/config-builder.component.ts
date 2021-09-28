import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { HistoricalAnalysisDate } from '../../common/interfaces';
import {DEFAULT_HISTORICAL_ANALYSIS_DATE} from '../../common/constants';
import * as legs from '../../common/option_legs';
import * as configs from '../../common/option_configs';
  

@Component({
  selector: 'exp-config-builder',
  templateUrl: './config-builder.component.html',
  styleUrls: ['./config-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigBuilderComponent implements OnChanges, OnInit {
  @Input() selectedDate: HistoricalAnalysisDate = DEFAULT_HISTORICAL_ANALYSIS_DATE;

  historicalDateBS = new BehaviorSubject<HistoricalAnalysisDate>(DEFAULT_HISTORICAL_ANALYSIS_DATE);
  historicalDate$: Observable<HistoricalAnalysisDate> = this.historicalDateBS;


  todayDate = new Date();
  OPTION_SPREAD_CONFIGS = Object.values(configs);
  OPTION_SPREAD_LEGS = Object.values(legs);
  
  constructor() { }

  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedDate']) {
      // console.log('pBS ngOC changes selectedDate: ', changes['selectedDate']);
      this.historicalDateBS.next(changes['selectedDate'].currentValue);
    }

  }

  ngOnInit(): void {
    // console.log('pBS ngOI pre-defined legs: ', this.OPTION_SPREAD_LEGS);
    // console.log('pBS ngOI pre-defined configs: ', this.OPTION_SPREAD_CONFIGS);
  
  }

  selectConfig(config: any) {

    console.log('cB sC config dd selection: ', config);
  }

}
