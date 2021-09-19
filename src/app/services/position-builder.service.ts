import { Injectable } from '@angular/core';
import { moneynessMap, MoneynessUnit, OptionLeg, OptionPosition, OptionSpreadConfig, OptionSymbolMetadata, OptionType } from '../common/option_interfaces';
import { monthsMap } from '../common/constants';

import { DatesService } from './dates.service';

@Injectable({
  providedIn: 'root'
})
export class PositionBuilderService {

  private readonly strikeGap = 5;
  private readonly expirationDistance = 60;

  constructor(private readonly datesService: DatesService) { }

  // Generate an array of trading dates with closing price
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
  
  // Generate an array of OptionPosition object stubs
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

  // Generate an option symbol for each leg of each position
  generateSymbolsForPositions(positions: OptionPosition[]) {

    const updatedPositions: OptionPosition[] = [];
    for (const position of positions) {
      // console.log('pBS gSFP position object: ', position);
      const posn = {...position};
      const symbolDate = this.generateSymbolDate(posn.dateOpened, this.expirationDistance);
      const expirationDate = this.datesService.getExpirationDate(posn.dateOpened, this.expirationDistance);

      // console.log('pBS gSFP symbol date, exp date: ', symbolDate, expirationDate);
      
      for (const leg of posn.config?.legs) {
        // gets the strike and whether the leg is a put or call
        const symbolInfo = this.getSymbolInfo(leg, posn.underlyingPrice, this.strikeGap);
        // console.log('pBS gSFP leg symbolInfo: ', symbolInfo);

        // generates a string representing strike price for the option symbol
        const symbolPrice = this.generateSymbolPrice(symbolInfo.strike);
        // console.log('pBS gSFP leg symbolPrice: ', symbolPrice);
        
        // generates the actual option symbol for the leg
        const symbol = `${position.underlying}${symbolDate}${symbolInfo.putCall}${symbolPrice}`
        // console.log('pBS gSFP leg symbol: ', sym);
        
        // generates a human readable label for the leg
        const expMoLabel = monthsMap.get(expirationDate.getMonth());
        const expDateLabel = (expirationDate.getDate()).toString().padStart(2, '0');
        const expYrLabel = (expirationDate.getFullYear()).toString().slice(2);
        const putCallLabel = symbolInfo.putCall === 'C' ? 'CALL' : 'PUT';

        const label = `${position.underlying}_${expDateLabel}${expMoLabel}_${expYrLabel}_${symbolInfo.strike}_${putCallLabel}`;
        // console.log('pBS gSFP symbol label: ', label);

        // encapsulates symbol and label
        const symbolObject: OptionSymbolMetadata = { symbol, label };

        // populates the leg with the option symbol metadata
        leg.symbol = symbolObject;

        posn.symbols ? posn.symbols.push(symbolObject) : posn.symbols = [symbolObject];
        posn.expiration = expirationDate;
      }

      updatedPositions.push(posn);
    }

    return updatedPositions;
  }

  // Get strike price and put/call designator for each leg
  getSymbolInfo(leg: OptionLeg, price: number, strikeGap: number) {
    let info = '';
    let strike = 0;
    const nearest = Math.round(price);
    const putCall = leg.type === 'CALL' ? 'C' : 'P';
    strike = this.generateStrikePriceFromMoneyness(nearest, leg.type, moneynessMap.get(leg.moneyness), this.strikeGap);

    return {strike, putCall};
  }

  // Generate a strike price based on underlying price and moneyness
  generateStrikePriceFromMoneyness(price: number, type: string, moneyness: number, strikeGap: number) {
    // console.log('pBS gSPFM input price, type, moneyness, strikeGap: ', price, type, moneyness, strikeGap);
    
    let strike = Math.ceil(price / strikeGap) * strikeGap;
    if (type === 'CALL') {
      if (strike - price > strikeGap / 2) {
        strike = strike - strikeGap;
      }
      strike = Math.ceil((strike + strike * moneyness) / strikeGap) * strikeGap;
    } else {
      strike = Math.floor(price / strikeGap) * strikeGap;
      if (price - strike > strikeGap / 2) {
        strike = strike + strikeGap;
      }
      strike = Math.floor((strike - strike * moneyness) / strikeGap) * strikeGap;
    }
    // console.log('pBS gSPFM output strike price: ', strike);

    return strike;
  }

  // Generates a text string representing the leg's strike price for use in the option symbol
  generateSymbolPrice(price) {
    let dols = Math.trunc(price).toString();
    let cts = (price % 1).toString();

    dols = dols.padStart(5, '0');
    cts = cts.padEnd(3, '0');

    // console.log('pBS gSP price, dols, cts: ', price, dols, cts);

    const symbolPrice = `${dols}${cts}`

    return symbolPrice;

  }

  // Generates a text string representing the leg's expiration date for use in the option symbol
  generateSymbolDate(date: Date, expDistDays: number) {
    const tradeDateMillis = date.getTime();
    const millisInADay = 24 * 60 * 60 * 1000;
    const millisToExp = expDistDays * millisInADay;
    const expMillis = tradeDateMillis + millisToExp;
    
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
