import { Injectable } from '@angular/core';
import { OptionLeg, OptionPosition, OptionSpreadConfig } from '../common/option_interfaces';

import { DatesService } from './dates.service';

@Injectable({
  providedIn: 'root'
})
export class PositionBuilderService {

  private readonly strikeGap = 5;
  private readonly expirationDistance = 60;

  constructor(private readonly datesService: DatesService) { }

  // take a time series and create an array of trading dates with closing price

  generateTradingDates(data:any[]) {
    const tradingDates = [];
    for (const datum of data) {
      const parsedDate = datum.stringDate.split('-').join();
      const date = new Date(parsedDate);
      // console.log('------------');
      // console.log('pBS gTD datum: ', datum);
      // console.log('pBS gTD parsedDate: ', parsedDate);
      // console.log('pBS gTD day dow: ', date.getDay());
      if (date.getDay() === 3) {
        tradingDates.push({date, close: datum.close});
      }
    }
    
    // console.log('pBS gTD tradingDates: ', tradingDates);
    return tradingDates;

  }
  

  generateOptionPositionObjects(data: any[], symbol: string, config: OptionSpreadConfig) {
    const optionPositionObjects: OptionPosition[] = [];

    for (const datum of data) {
      const position: OptionPosition = {
        underlying: symbol,
        underlyingPrice: datum.close,
        dateOpened: datum.date,
        config: config,

      }

      optionPositionObjects.push(position);
    }


    // console.log('pBS gOPO position objects: ', optionPositionObjects);

    return optionPositionObjects;
  }

  generateSymbolsForPositions(positions: OptionPosition[]) {

    const updatedPositions: OptionPosition[] = [];
    for (const position of positions) {
      // console.log('pBS gSFP position object: ', position);
      const posn = {...position};
      const symbolDate = this.generateSymbolDate(posn.dateOpened, this.expirationDistance);
      const expirationDate = this.datesService.getExpirationDate(posn.dateOpened, this.expirationDistance);
      
      for (const leg of posn.config?.legs) {
        const symbolInfo = this.getSymbolInfo(leg, posn.underlyingPrice, this.strikeGap);
        // console.log('pBS gSFP leg symbolInfo: ', symbolInfo);
        const symbolPrice = this.generateSymbolPrice(symbolInfo.strike);
        // console.log('pBS gSFP leg symbolPrice: ', symbolPrice);
        const sym = `${position.underlying}${symbolDate}${symbolInfo.putCall}${symbolPrice}`
        // console.log('pBS gSFP leg symbol: ', sym);

        posn.symbols ? posn.symbols.push(sym) : posn.symbols = [sym];
        posn.expiration = expirationDate;
      }

      updatedPositions.push(posn);
    }

    return updatedPositions;
  }

  getSymbolInfo(leg: OptionLeg, price: number, strikeGap: number) {
    let info = '';
    let putCall = '';
    const nearest = Math.round(price);
    let strike = Math.ceil(price / strikeGap) * strikeGap;

    // console.log('pBS gS leg, price: ', leg, price);
    // console.log('pBS gS nearest: ', nearest);

    if (leg.type === 'CALL') {
      putCall = 'C';
      if (strike - price > strikeGap / 2) {
        strike = strike - strikeGap;
      }

    } else {
      putCall = 'P';
      strike = Math.floor(price / strikeGap) * strikeGap;
      if (price - strike > strikeGap / 2) {
        strike = strike + strikeGap;
      }

    }

    return {strike, putCall};
  }

  generateSymbolPrice(price) {
    let dols = Math.trunc(price).toString();
    let cts = (price % 1).toString();

    dols = dols.padStart(5, '0');
    cts = cts.padEnd(3, '0');

    // console.log('pBS gSP price, dols, cts: ', price, dols, cts);

    const symbolPrice = `${dols}${cts}`

    return symbolPrice;

  }

  generateSymbolDate(date: Date, expDistDays: number) {
    const tradeDateMillis = date.getTime();
    const millisInADay = 24 * 60 * 60 * 1000;
    const millisToExp = expDistDays * millisInADay;
    const expMillis = tradeDateMillis + millisToExp;
    // const expDate = new Date(todayMillis + expDistDays * millisInADay);

    // getExpirationDate(tradingDate: Date, minExpDistance: number, optionSeries: string)
    
    // console.log('--------------------');
    
    // console.log('pBS gSD input trading date: ', date);
    // console.log('pBS gSD tradeDateMillis: ', tradeDateMillis);
    // console.log('pBS gSD millisToExp: ', millisToExp);
    // console.log('pBS gSD expmillis: ', expMillis);
    // console.log('pBS gSD expMillis date: ', new Date(expMillis));
    
    const expDate = this.datesService.getExpirationDate(date, expDistDays, 'MONTHLY');

    const yr = expDate.getFullYear().toString().slice(2);
    const mo = expDate.getMonth().toString().padStart(2, '0');
    const da = expDate.getDate().toString().padStart(2, '0');

    const symbolDate = `${yr}${mo}${da}`;
    // console.log('pBS gSD symbolDate: ', symbolDate);

    return symbolDate;
  }


}
