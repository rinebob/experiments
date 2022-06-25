import { Component, ChangeDetectionStrategy, ElementRef, Input, OnInit, ViewChild  } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { AllContractsByStrikeAndExpiration, TradedStrikesDatum, TradedStrikesTableDataObject } from '../../../../common/interfaces';
import {AllContractsDataForStrike} from '../../../../common/interfaces_orats';

@Component({
  selector: 'exp-strikes-table',
  templateUrl: './strikes-table.component.html',
  styleUrls: ['./strikes-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StrikesTableComponent {

  @ViewChild('strikesGridContainer', {read: ElementRef}) strikesGridContainer: ElementRef;

  @Input()
  set inputTradedStrikesData(data: TradedStrikesTableDataObject) {
    if (data && data.allExpirations && data.tradedStrikesData) {
      this.inputTradedStrikesDataBS.next(data);
      this.tradedStrikesTableDataBS.next(this.sortData(data.tradedStrikesData));
      this.allExpirationsBS.next(data.allExpirations);
    }
  }
  get inputTradedStrikesData() {
    return this.inputTradedStrikesDataBS.value;

  }
  inputTradedStrikesDataBS = new BehaviorSubject<TradedStrikesTableDataObject>({});

  tradedStrikesTableDataBS = new BehaviorSubject<TradedStrikesDatum[]>([]);
  tradedStrikesTableData$: Observable<TradedStrikesDatum[]> = this.tradedStrikesTableDataBS;


  @Input()
  set inputAllContractsData(data: AllContractsDataForStrike[]) {
    if (data) {
      console.log('sT @i inputAllCtxData: ', data)
      this.inputAllContractsDataBS.next(data);
      this.allContractsTableDataBS.next(data);
    }
  }
  get inputAllContractsData() {
    return this.inputAllContractsDataBS.value;

  }
  inputAllContractsDataBS = new BehaviorSubject<AllContractsDataForStrike[]>([]);
  
  allContractsTableDataBS = new BehaviorSubject<AllContractsDataForStrike[]>([]);
  allcontractsTableData$: Observable<AllContractsDataForStrike[]> = this.allContractsTableDataBS;
  
  allExpirationsBS = new BehaviorSubject<string[]>([]);
  allExpirations$: Observable<string[]> = this.allExpirationsBS;
  allExpirations: string[] = [];

  scrollItemSize = 12;

  constructor() { 
    this.tradedStrikesTableData$.pipe().subscribe(
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
