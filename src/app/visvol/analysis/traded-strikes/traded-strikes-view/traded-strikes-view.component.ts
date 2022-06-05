import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
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

  // tradedStrikesDataBS = new BehaviorSubject<Array<Object>>([]);
  // tradedStrikesData$: Observable<Array<Object>> = this.tradedStrikesDataBS;

  // allExpirationsBS = new BehaviorSubject<string[]>([]);
  // allExpirations$: Observable<string[]> = this.allExpirationsBS;

  strikesTableDataBS = new BehaviorSubject<TradedStrikesTableDataObject>({});
  strikesTableData$: Observable<TradedStrikesTableDataObject> = this.strikesTableDataBS;

  constructor(
    readonly csvService: CsvService,
    ) { }

  ngOnInit(): void {
    // this.allExpirations$.pipe().subscribe(
    //   expirations => {console.log('tsV ngOI expirations sub: ', expirations)}
    // );
  }

  getTradedStrikesForSymbol(symbol: string) {
    console.log('tSV gTSFS get strikes for symbol: ', symbol);

    const data: TradedStrikesTableDataObject = 
      this.csvService.getTradedStrikesData([symbol]);

      this.strikesTableDataBS.next(data);

    if (data && data.allExpirations && data.tradedStrikesData) {
      // this.tradedStrikesDataBS.next(data.tradedStrikesData);
      // this.allExpirationsBS.next(data.allExpirations);
      // console.log('tSV gTSFS expirations: ', this.allExpirationsBS.value);
      // console.log('tSV gTSFS traded strikes data[0]: ', this.tradedStrikesDataBS.value[0]);

      
    } else {
      console.log('cS gTSD dude i told you theres no effin data!!');
    }

    

  }

}
