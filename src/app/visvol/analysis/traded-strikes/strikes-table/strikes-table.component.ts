import { Component, ChangeDetectionStrategy, ElementRef, Input, OnInit, ViewChild  } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


import { TradedStrikesDatum, TradedStrikesTableDataObject } from '../../../../common/interfaces';

@Component({
  selector: 'exp-strikes-table',
  templateUrl: './strikes-table.component.html',
  styleUrls: ['./strikes-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StrikesTableComponent {

  @ViewChild('strikesGridContainer', {read: ElementRef}) strikesGridContainer: ElementRef;

  @Input()
  set inputData(data: TradedStrikesTableDataObject) {
    if (data && data.allExpirations && data.tradedStrikesData) {
      this.inputDataBS.next(data);
      this.tableDataBS.next(this.sortData(data.tradedStrikesData));
      this.allExpirationsBS.next(data.allExpirations);
    }


  }
  get inputData() {
    return this.inputDataBS.value;

  }
  inputDataBS = new BehaviorSubject<TradedStrikesTableDataObject>({});

  tableDataBS = new BehaviorSubject<TradedStrikesDatum[]>([]);
  tableData$: Observable<TradedStrikesDatum[]> = this.tableDataBS;
  
  allExpirationsBS = new BehaviorSubject<string[]>([]);
  allExpirations$: Observable<string[]> = this.allExpirationsBS;
  allExpirations: string[] = [];

  scrollItemSize = 0;

  constructor() { 
    this.tableData$.pipe().subscribe(
      data => {
        // console.log('sT ctor table data sub value: ', data);
      }

    );

    this.allExpirations$.pipe().subscribe(
      expirations => {
        this.allExpirations = Object.values(expirations);
        // console.log('sT ctor expirations sub value/allExps: ', expirations, this.allExpirations);
      }
    );
  }

  sortData(data: TradedStrikesDatum[]): TradedStrikesDatum[] {
    const sortedData = data.sort((a, b) => {return a.strike - b.strike});
    return sortedData;
  }
}
