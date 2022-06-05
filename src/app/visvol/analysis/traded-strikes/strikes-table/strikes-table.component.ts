import { Component, ChangeDetectionStrategy, Input, OnInit,  } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import {TradedStrikesTableDataObject} from '../../../../common/interfaces';

@Component({
  selector: 'exp-strikes-table',
  templateUrl: './strikes-table.component.html',
  styleUrls: ['./strikes-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StrikesTableComponent implements OnInit {

  @Input()
  set inputData(data: TradedStrikesTableDataObject) {
    if (data && data.allExpirations && data.tradedStrikesData) {
      this.inputDataBS.next(data);
      this.tableDataBS.next(data.tradedStrikesData);
      this.allExpirationsBS.next(data.allExpirations);
    }


  }
  get inputData() {
    return this.inputDataBS.value;

  }
  inputDataBS = new BehaviorSubject<TradedStrikesTableDataObject>({});

  tableDataBS = new BehaviorSubject<Object[]>([]);
  tableData$: Observable<Object[]> = this.tableDataBS;

  allExpirationsBS = new BehaviorSubject<string[]>([]);
  allExpirations$: Observable<string[]> = this.allExpirationsBS;

  visibleColumns = () => this.allExpirationsBS.value;



  constructor() { }

  ngOnInit(): void {
  }

}
