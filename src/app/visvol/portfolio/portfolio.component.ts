import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { OpenClosedStatus, OptionPosition, OptionPositionPriceEventData, OptionSpreadConfigBase } from '../../common/option_interfaces';
import { PositionBuilderService } from '../../services/position-builder.service';
import {EQUITY_DATA_MAP} from '../../common/constants';
// import { nflxData } from 'src/assets/data/nflx_21-0917';
// import { tslaData } from 'src/assets/data/tsla_21-0917';

import * as configs from '../../common/option_configs';
// import { Option } from 'black-scholes-js';

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

  optionPositionsBS = new BehaviorSubject<OptionPosition[]>([]);
  optionPositions$: Observable<OptionPosition[]> = this.optionPositionsBS;

  constructor(private readonly posnBuilderService: PositionBuilderService) { }

  ngOnInit(): void {
    const positions = this.generatePositions();
    const positionsWithFakeData = this.generateFakePositionData(positions);

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

    // this.optionPositionsBS.next([positionsList[0]]);
    this.optionPositionsBS.next(positionsList);
    console.log('p gP positions[0]: ', positionsList[0]);
    return positionsList;
  }

  // export interface OptionPosition {
  //   title: string;
  //   underlying: string;   // todo - put underlying data in an object
  //   underlyingPrice: number;
  //   underlyingIv?: number;
  //   dateOpened?: Date;
  //   dateOpenedText?: string;
  //   openPrice?: number;
  //   expDate?: Date;
  //   expDateText?: string;
  //   openPriceEventData?: OptionPositionPriceEventData;
  //   lastPriceEventData?: OptionPositionPriceEventData;
  //   closePriceEventData?: OptionPositionPriceEventData;
  //   config?: OptionSpreadConfigBase;
  //   symbols?: OptionSymbolMetadata[];
  //   data?: PositionPricePoint[];    // TODO - normalize to separate table
  
  // }
  
  // export interface OptionPositionPriceEventData {
  //   date: Date;
  //   dateString: string;
  //   price: number;
  //   pricePctChgDay?: number;
  //   pricePctChgLife?: number;
  //   underlyingPrice: number;
  //   undPctChgDay?: number;
  //   undPctChgLife?: number;
  //   implVolty: number;
  //   ivPctChgDay?: number;
  //   ivPctChgLife?: number;
  
  // }

  generateFakePositionData(positions: OptionPosition[]) {

    for (const position of positions) {

      const openData: OptionPositionPriceEventData = {
        price: Number((position.underlyingPrice / 10).toFixed(2)),
        underlyingPrice: position.underlyingPrice,
        implVolty: 0.25,
        date: position.dateOpened,
        dateString: position.dateOpenedText,
      }

      position.openPriceEventData = openData;
      position.status = 'OPEN';

      const lastData: OptionPositionPriceEventData = {
        price: Number((position.underlyingPrice / 10).toFixed(2)),
        pricePctChgDay: 0.25,
        pricePctChgLife: 10,
        underlyingPrice: position.underlyingPrice,
        undPctChgDay: 0.25,
        undPctChgLife: 10,
        implVolty: 0.5,
        ivPctChgDay: 0.25,
        ivPctChgLife: 10,
        date: new Date(),
        dateString: new Date().toDateString(),
      }

      position.status = 'OPEN';
      position.lastPriceEventData = lastData;

      const closeData: OptionPositionPriceEventData = {
        price: Number((position.underlyingPrice / 10).toFixed(2)),
        pricePctChgDay: 0.25,
        pricePctChgLife: 10,
        underlyingPrice: position.underlyingPrice,
        undPctChgDay: 0.25,
        undPctChgLife: 10,
        implVolty: 0.5,
        ivPctChgDay: 0.25,
        ivPctChgLife: 10,
        date: new Date(),
        dateString: new Date().toDateString(),
      }

      position.status = 'CLOSED';
      position.closePriceEventData = closeData;
      
    }




  }


}
