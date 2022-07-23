import { Component, ChangeDetectionStrategy, ElementRef, Input, OnInit, ViewChild  } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { TradedStrikesBoolDatum, TradedStrikesBoolTableDataObject } from '../../../../common/interfaces';
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
  set expirations(expirations: string[]) {
    console.log('sT @i exps: ', expirations);
    if (expirations) {
      this.expirationsBS.next(expirations);
    }
  }
  get expirations() {
    return this.expirationsBS.value;

  }
  expirationsBS = new BehaviorSubject<string[]>([]);
  expirations$: Observable<string[]> = this.expirationsBS;

  @Input()
  set inputTradedStrikesBool(bool: TradedStrikesBoolDatum[]) {
    if (bool) {
      this.inputTradedStrikesBoolBS.next(bool);
    }
  }
  get inputTradedStrikesBool() {
    return this.inputTradedStrikesBoolBS.value;

  }
  inputTradedStrikesBoolBS = new BehaviorSubject<TradedStrikesBoolDatum[]>([]);
  tradedStrikesBool$: Observable<TradedStrikesBoolDatum[]> = this.inputTradedStrikesBoolBS;

  @Input()
  set inputTradedStrikesData(data: AllContractsDataForStrike[]) {
    console.log('sT @i tSD: ', data);
    if (data) {
      this.inputTradedStrikesDataBS.next(data);
    }
  }
  get inputTradedStrikesData() {
    return this.inputTradedStrikesDataBS.value;

  }
  inputTradedStrikesDataBS = new BehaviorSubject<AllContractsDataForStrike[]>([]);
  tradedStrikesData$: Observable<AllContractsDataForStrike[]> = this.inputTradedStrikesDataBS;

  // tradedStrikesBoolTableDataBS = new BehaviorSubject<TradedStrikesBoolDatum[]>([]);
  // tradedStrikesBoolTableData$: Observable<TradedStrikesBoolDatum[]> = this.tradedStrikesBoolTableDataBS;


  // @Input()
  // set inputAllContractsData(data: AllContractsDataForStrike[]) {
  //   if (data) {
  //     console.log('sT @i inputAllCtxData: ', data)
  //     this.inputAllContractsDataBS.next(data);
  //     this.allContractsTableDataBS.next(data);
  //   }
  // }
  // get inputAllContractsData() {
  //   return this.inputAllContractsDataBS.value;

  // }
  // inputAllContractsDataBS = new BehaviorSubject<AllContractsDataForStrike[]>([]);
  
  // allContractsTableDataBS = new BehaviorSubject<AllContractsDataForStrike[]>([]);
  // allcontractsTableData$: Observable<AllContractsDataForStrike[]> = this.allContractsTableDataBS;
  
  // allExpirationsBS = new BehaviorSubject<string[]>([]);
  
  // allExpirations: string[] = [];

  scrollItemSize = 12;

  constructor() { 
    // this.tradedStrikesData$.pipe().subscribe(
    //   data => {
    //     // console.log('sT ctor table data sub value: ', data);
    //   }

    // );

    // this.allExpirations$.pipe().subscribe(
    //   expirations => {
    //     this.allExpirations = Object.values(expirations);
    //     // console.log('sT ctor expirations sub value/allExps: ', expirations, this.allExpirations);
    //   }
    // );
  }

  sortData(data) {
    const sortedData = data.sort((a, b) => {return a.strike - b.strike});
    return sortedData;
  }

  
}
