import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import { CsvService } from '../../../../services/csv/csv.service';
import { RibbonInfo, TradedStrikesBoolDatum} from '../../../../common/interfaces';
import { AllContractsDataForStrike, DeltaStrikesGridData } from 'src/app/common/interfaces_orats';

@Component({
  selector: 'exp-traded-strikes-view',
  templateUrl: './traded-strikes-view.component.html',
  styleUrls: ['./traded-strikes-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TradedStrikesViewComponent implements OnDestroy, OnInit {
  readonly destroy = new Subject();

  ribbonInfo$: Observable<RibbonInfo> = this.csvService.ribbonInfo$;

  allExpirationsForSymbol$: Observable<string[]> = this.csvService.allExpirationsForSymbol$;

  // array of objects with properties strike and key = expiration and value = true/false whether that strike/expiration is traded
  tradedStrikesBool$: Observable<TradedStrikesBoolDatum[]> = this.csvService.tradedStrikesBool$;

  // array of objects with properties strike and key = expiration and value = data for the contract
  tradedStrikesData$: Observable<AllContractsDataForStrike[]> = this.csvService.tradedStrikesData$;

  deltaStrikesData$: Observable<DeltaStrikesGridData> = this.csvService.deltaStrikesData$;

  symbolSelected = false;
  symbol = '';
  fileChosen = false;
  dataExistsForSymbol = false;

  constructor(
    readonly csvService: CsvService,
    ) { }

  ngOnInit(): void {

    this.tradedStrikesData$.pipe(takeUntil(this.destroy))
      .subscribe(data => {
          if (data) {
            this.dataExistsForSymbol = true;
          }});

    // combineLatest([
    //   this.allExpirationsForSymbol$, this.tradedStrikesBool$,
    //   this.tradedStrikesData$, this.deltaStrikesData$,
    // ])
    // .pipe()
    // .subscribe(
    //   ([expirations, bool, data, deltaData]) => {
    //     console.log('tSV ngOI expirations: ', expirations);
    //     console.log('tSV ngOI bool: ', bool);
    //     console.log('tSV ngOI data: ', data);
    //     console.log('tSV ngOI deltaData: ', deltaData);
    //   })

  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  handleFileSelection() {
    this.fileChosen = true;
  }

  handleSymbolSelection(symbol: string) {
    console.log('tSV hSS selected symbol: ', symbol);
    this.symbol = symbol;
    this.symbolSelected = true;

    this.csvService.handleSymbolSelection(symbol);
  }



}


