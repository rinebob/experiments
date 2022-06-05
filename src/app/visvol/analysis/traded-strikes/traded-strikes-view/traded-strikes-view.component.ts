import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { CsvService } from '../../../../services/csv/csv.service';
import {TradedStrikesTableDataObject} from '../../../../common/interfaces';

@Component({
  selector: 'exp-traded-strikes-view',
  templateUrl: './traded-strikes-view.component.html',
  styleUrls: ['./traded-strikes-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TradedStrikesViewComponent implements OnInit {

  tradedStrikesDataBS = new BehaviorSubject<Array<Object>>([]);
  tradedStrikesData$: Observable<Array<Object>> = this.tradedStrikesDataBS;

  allExpirationsBS = new BehaviorSubject<string[]>([]);
  allExpirations$: Observable<string[]> = this.allExpirationsBS;

  constructor(
    readonly csvService: CsvService
    ) { }

  ngOnInit(): void {
  }

  getTradedStrikesForSymbol(symbol: string) {
    console.log('tSV gTSFS get strikes for symbol: ', symbol);

    const data: TradedStrikesTableDataObject = 
      this.csvService.getTradedStrikesData([symbol]);

    this.tradedStrikesDataBS.next(data.tradedStrikesData);
    this.allExpirationsBS.next(data.allExpirations);

    console.log('tSV gTSFS expirations: ', this.allExpirationsBS.value);

  }

}
