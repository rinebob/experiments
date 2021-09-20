import { Component, OnInit } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { DatesService } from '../services/dates.service';
import { PositionBuilderService } from '../services/position-builder.service';
import { nflxData } from 'src/assets/data/nflx_21-0917';
import { tslaData } from 'src/assets/data/tsla_21-0917';
import { OptionPosition, OptionSpreadConfig } from '../common/option_interfaces';
import * as legs from '../common/option_legs';
import * as configs from '../common/option_configs';

@Component({
  selector: 'app-position-builder',
  templateUrl: './position-builder.component.html',
  styleUrls: ['./position-builder.component.scss']
})
export class PositionBuilderComponent implements OnInit {

  private readonly configsList: OptionSpreadConfig[] = [
    configs.ATM_LONG_STRADDLE,
    configs.IRON_CONDOR,
    configs.VERTICAL_CALL_DEBIT_SPREAD,
    configs.VERTICAL_CALL_CREDIT_SPREAD,
    configs.TWENTY_DELTA_SHORT_STRANGLE,
    configs.VERTICAL_PUT_DEBIT_SPREAD,
    configs.VERTICAL_PUT_CREDIT_SPREAD,
  ];

  nflxOptionPositions: OptionPosition[] = []
  tslaOptionPositions: OptionPosition[] = []

  positionsBS = new BehaviorSubject<OptionPosition[]>([]);
  positions$: Observable<OptionPosition[]> = this.positionsBS;

  constructor(private readonly datesService: DatesService,
    private readonly posnBuilderService: PositionBuilderService) { }

  ngOnInit(): void {
    // this.nflxOptionPositions = this.generateOptionPositions('NFLX', nflxData);
    // this.tslaOptionPositions = this.generateOptionPositions('TSLA', tslaData);

    // console.log('pBC ngOI nflxOptionPositions: ', this.nflxOptionPositions);
    // console.log('pBC ngOI tslaOptionPositions: ', this.tslaOptionPositions);
  }

  generateOptionPositions(symbol: string, data: any[]) {
    let positions: OptionPosition[] = [];
    const dates = this.posnBuilderService.generateTradingDates(data);
    
    for (const config of this.configsList) {
      positions = [...positions, ...this.posnBuilderService.generateOptionPositionObjects(dates, symbol, config)];
    }
    positions = this.posnBuilderService.generateSymbolsForPositions(positions);

    return positions
  }

  showConfigs(symbol: string) {

    if (symbol === 'NFLX') {
      this.positionsBS.next(this.generateOptionPositions('NFLX', nflxData));

    } else {
      this.positionsBS.next(this.generateOptionPositions('TSLA', tslaData));

    }
  }
}
