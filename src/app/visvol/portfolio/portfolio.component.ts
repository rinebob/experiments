import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { OptionPosition, OptionSpreadConfigBase } from '../../common/option_interfaces';
import { PositionBuilderService } from '../../services/position-builder.service';
import {EQUITY_DATA_MAP} from '../../common/constants';
// import { nflxData } from 'src/assets/data/nflx_21-0917';
// import { tslaData } from 'src/assets/data/tsla_21-0917';

import * as configs from '../../common/option_configs';
import { Option } from 'black-scholes-js';

@Component({
  selector: 'exp-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioComponent implements OnInit {

  SYMBOLS = ['NFLX', 'TSLA'];

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

  constructor(private readonly posnBuilderService: PositionBuilderService) { }

  ngOnInit(): void {
    this.generatePositions();

  }

  generatePositions() {
    let dates;
    const positionsList: OptionPosition[] = [];

    for (const symbol of this.SYMBOLS) {
      const data = EQUITY_DATA_MAP.get(symbol);
      // dates = this.generateTradingDates(data);
      dates = this.posnBuilderService.generateTradingDates(data);
      const positions = this.posnBuilderService.generateOptionPositions(symbol, dates, this.configsList)

      positionsList.push(...positions);

    }

    this.positionsBS.next(positionsList);
    console.log('p gP positions[0]: ', positionsList[0]);
  }


}
