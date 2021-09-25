import { Component, OnInit } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { DatesService } from '../services/dates.service';
import { PositionBuilderService } from '../services/position-builder.service';
import { nflxData } from 'src/assets/data/nflx_21-0917';
import { tslaData } from 'src/assets/data/tsla_21-0917';
import { OptionPosition, OptionSpreadConfigBase } from '../common/option_interfaces';
import * as legs from '../common/option_legs';
import * as configs from '../common/option_configs';

@Component({
  selector: 'exp-position-builder',
  templateUrl: './position-builder.component.html',
  styleUrls: ['./position-builder.component.scss']
})
export class PositionBuilderComponent implements OnInit {

  private readonly configsList: OptionSpreadConfigBase[] = [
    // configs.ATM_LONG_STRADDLE,
    configs.IRON_CONDOR,
    // configs.VERTICAL_CALL_DEBIT_SPREAD,
    // configs.VERTICAL_CALL_CREDIT_SPREAD,
    configs.TWENTY_DELTA_SHORT_STRANGLE,
    // configs.VERTICAL_PUT_DEBIT_SPREAD,
    // configs.VERTICAL_PUT_CREDIT_SPREAD,
  ];

  nflxOptionPositions: OptionPosition[] = []
  tslaOptionPositions: OptionPosition[] = []

  positionsBS = new BehaviorSubject<OptionPosition[]>([]);
  positions$: Observable<OptionPosition[]> = this.positionsBS;

  constructor(private readonly datesService: DatesService,
    private readonly posnBuilderService: PositionBuilderService) { }

  ngOnInit(): void {
    this.positionsBS.next(this.generateOptionPositions('TSLA', tslaData));

    // console.log('pB ngOI input configs list: ', [...this.configsList]);

    // dev only for logging
    // this.nflxOptionPositions = this.generateOptionPositions('NFLX', nflxData);
    // this.tslaOptionPositions = this.generateOptionPositions('TSLA', tslaData);
    // console.log('pBC ngOI nflxOptionPositions: ', this.nflxOptionPositions);
    // console.log('pBC ngOI tslaOptionPositions: ', this.tslaOptionPositions);

  }

  generateOptionPositions(symbol: string, data: any[]) {
    let positions: OptionPosition[] = [];
    const dates = this.posnBuilderService.generateTradingDates(data);
    
    for (const config of this.configsList) {
      // console.log('pB gOP input config: ', {...config});
      positions = [...positions, ...this.posnBuilderService.generateOptionPositionObjects(dates, symbol, config)];
    }
    positions = this.posnBuilderService.generateSymbolsForPositions(positions);

    positions.sort((a,b) => (a.dateOpened.getTime() - b.dateOpened.getTime()));

    return positions;

  }

  showConfig(symbol: string) {
    console.log('pBS sC symbol: ', symbol);

    if (symbol === 'NFLX') {
      this.positionsBS.next(this.generateOptionPositions('NFLX', nflxData));

    } else {
      this.positionsBS.next(this.generateOptionPositions('TSLA', tslaData));

    }
  }


}
