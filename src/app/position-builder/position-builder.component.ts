import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { PositionBuilderService } from '../services/position-builder.service';
import { nflxData } from 'src/assets/data/nflx_21-0917';
import { tslaData } from 'src/assets/data/tsla_21-0917';
import { OptionPosition, OptionSpreadConfigBase } from '../common/option_interfaces';
import * as configs from '../common/option_configs';

@Component({
  selector: 'exp-position-builder',
  templateUrl: './position-builder.component.html',
  styleUrls: ['./position-builder.component.scss']
})
export class PositionBuilderComponent implements OnInit {
  
  private readonly configsList: OptionSpreadConfigBase[] = [
    configs.ATM_LONG_STRADDLE,
    configs.IRON_CONDOR,
    configs.VERTICAL_CALL_DEBIT_SPREAD,
    configs.VERTICAL_CALL_CREDIT_SPREAD,
    configs.TWENTY_DELTA_SHORT_STRANGLE,
    configs.VERTICAL_PUT_DEBIT_SPREAD,
    configs.VERTICAL_PUT_CREDIT_SPREAD,
  ];

  positionsBS = new BehaviorSubject<OptionPosition[]>([]);
  positions$: Observable<OptionPosition[]> = this.positionsBS;

  symbolsBS = new BehaviorSubject<string[]>([]);
  symbols$: Observable<string[]> = this.symbolsBS;

  constructor(
    private readonly posnBuilderService: PositionBuilderService) { }

  ngOnInit(): void {
  }

  generateTradingDates(data: any[]) {
    const dates = this.posnBuilderService.generateTradingDates(data);

    return dates;
  }

  showConfig(symbol: string) {
    let dates;

    if (symbol === 'NFLX') {
      dates = this.generateTradingDates(nflxData);

      const {positions, symbols, oratsStrikeDataObjects} = this.posnBuilderService.generatePositionsAndSymbols('NFLX', dates, this.configsList);
      // console.log('pB sC nflx.  positions: ', positions);
      console.log('pB sC nflx.  symbols: ', symbols);

      this.positionsBS.next(positions);
      this.symbolsBS.next(symbols);

  } else {
      dates = this.generateTradingDates(tslaData);

      const {positions, symbols, oratsStrikeDataObjects} = this.posnBuilderService.generatePositionsAndSymbols('TSLA', dates, this.configsList);
      // console.log('pB sC tsla.  positions: ', positions);
      console.log('pB sC tsla.  symbols: ', symbols);

      this.positionsBS.next(positions);
      this.symbolsBS.next(symbols);

    }
  }

  getAllOptionSymbols(positions: OptionPosition[]) {
    const symbols = this.posnBuilderService.extractSymbols(positions);
    console.log('pB gAOS option symbols: ', symbols);

    return symbols;
  }



}
