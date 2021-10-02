import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { DatesService } from '../../services/dates.service';
import { ExpirationDate, ExpirationSeries, HistoricalAnalysisDate } from '../../common/interfaces';
import {DEFAULT_HISTORICAL_ANALYSIS_DATE, MONTHS_MAP, DAYS_MAP} from '../../common/constants';
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

  expirationCalendarBS = new BehaviorSubject<ExpirationDate[]>([]);
  expirationCalendar$: Observable<ExpirationDate[]> = this.expirationCalendarBS;

  weeklyExpBS = new BehaviorSubject<ExpirationDate[]>([]);
  weeklyExp$: Observable<ExpirationDate[]> = this.weeklyExpBS;

  monthlyExpBS = new BehaviorSubject<ExpirationDate[]>([]);
  monthlyExp$: Observable<ExpirationDate[]> = this.monthlyExpBS;

  quarterlyExpBS = new BehaviorSubject<ExpirationDate[]>([]);
  quarterlyExp$: Observable<ExpirationDate[]> = this.quarterlyExpBS;

  todayDate = new Date();
  OPTION_SPREAD_CONFIGS = Object.values(configs);
  OPTION_SPREAD_LEGS = Object.values(legs);
  
  constructor(private readonly datesService: DatesService) { }

  
  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedDate']) {
      // console.log('pBS ngOC changes selectedDate: ', changes['selectedDate']);
      this.historicalDateBS.next(changes['selectedDate'].currentValue);
    }

  }

  ngOnInit(): void {
    // console.log('pBS ngOI pre-defined legs: ', this.OPTION_SPREAD_LEGS);
    // console.log('pBS ngOI pre-defined configs: ', this.OPTION_SPREAD_CONFIGS);

    this.expirationCalendarBS.next(this.generateExpirationCalendar(new Date));

    this.allocateExpirationsToSeries();
  
  }

  generateExpirationCalendar(date: Date) {
    // console.log('cB gEC gen exp cal input date: ', date);

    const expCalendar: ExpirationDate[] = this.datesService.generateExpirationCalendar(date);
    console.log('cB gEC result expiration calendar: ', expCalendar);


    return expCalendar;

  }

  allocateExpirationsToSeries() {
    this.expirationCalendar$.pipe(take(1)).subscribe(
      calendar => {
        // console.log('cB calendar sub: ', calendar);

        this.weeklyExpBS.next(
          calendar.filter(date => date.expSeries === ExpirationSeries.WEEKLY)
        );

        this.monthlyExpBS.next(
          calendar.filter(date => date.expSeries === ExpirationSeries.MONTHLY)
        );

        this.quarterlyExpBS.next(
          calendar.filter(date => date.expSeries === ExpirationSeries.QUARTERLY)
        );

      }
    );

    console.log('cB aETS weekly exps: ', this.weeklyExpBS.value);
    console.log('cB aETS monthly exps: ', this.monthlyExpBS.value);
    console.log('cB aETS quarterly exps: ', this.quarterlyExpBS.value);

  }

  selectConfig(config: any) {

    console.log('cB sC config dd selection: ', config);
  }

}
