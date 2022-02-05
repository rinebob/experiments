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
    // configs.ATM_LONG_STRADDLE,
    // configs.IRON_CONDOR,
    // configs.VERTICAL_CALL_DEBIT_SPREAD,
    // configs.VERTICAL_CALL_CREDIT_SPREAD,
    configs.TWENTY_DELTA_SHORT_STRANGLE,
    configs.VERTICAL_PUT_DEBIT_SPREAD,
    // configs.VERTICAL_PUT_CREDIT_SPREAD,
  ];

  positionsBS = new BehaviorSubject<OptionPosition[]>([]);
  positions$: Observable<OptionPosition[]> = this.positionsBS;

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
      this.positionsBS.next(this.posnBuilderService.generateOptionPositions('NFLX', dates, this.configsList));
  } else {
      dates = this.generateTradingDates(tslaData);
      this.positionsBS.next(this.posnBuilderService.generateOptionPositions('TSLA', dates, this.configsList));
    }
  }



}
