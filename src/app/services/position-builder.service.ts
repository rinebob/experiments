import { Injectable } from '@angular/core';
import { moneynessMap, MoneynessUnit, OptionLegBase, OptionPosition, OptionSpreadConfigBase, OptionSymbolMetadata, OptionType } from '../common/option_interfaces';
import { DAYS_MAP, MONTHS_MAP } from '../common/constants';

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
  generateOptionPositionObjects(data: any[], symbol: string, config: OptionSpreadConfigBase) {
    const optionPositionObjects: OptionPosition[] = [];

    // console.log('pBS gOPO input config: ', {...config});

    for (const datum of data) {
      const position: OptionPosition = {
        title: '',
        underlying: symbol,
        underlyingPrice: datum.close,
        dateOpened: datum.date,
        dateOpenedText: this.getDateText(datum.date),
        expDate: this.datesService.getExpirationDate(datum.date, this.expirationDistance),
        config: config,

      }
      // create a title / label for the position
      // TSLA JUN 19 21 Long Straddle
      position.title = this.generatePositionTitle(position);
      position.expDateText = this.getDateText(position.expDate);

      optionPositionObjects.push(position);
    }

    // console.log('pBS gOPO position objects: ', optionPositionObjects);
    return optionPositionObjects;
  }

  // Generate an option symbol object for each leg of each position
  generateSymbolsForPositions(positions: OptionPosition[]) {
    const updatedPositions: OptionPosition[] = [];
    for (const position of positions) {
      const posn = {...position};
      // console.log('------------------');
      // console.log('pBS gSFP position object start: ', posn);
      
      const symbolDate = this.generateSymbolDate(posn.dateOpened, this.expirationDistance);
            
      for (const leg of posn.config?.legs) {
        const symbolObject = this.generateSymbolForLeg(leg, position.underlying, position.underlyingPrice, symbolDate, position.expDateText);
        // console.log('pBS gSFP symbolObject: ', symbolObject);
        posn.symbols ? posn.symbols.push(symbolObject) : posn.symbols = [symbolObject];
      }

      // console.log('pBS gSFP position object end: ', posn);
      updatedPositions.push(posn);
    }

    return updatedPositions;
  }

  getDateText(date: Date) {
    let dateText = '';
    const day = DAYS_MAP.get(date.getDay());
    const mo = MONTHS_MAP.get(date.getMonth());
    const dateNum = (date.getDate()).toString().padStart(2, '0');
    const yr = (date.getFullYear()).toString().slice(2);

    dateText = `${day} ${mo} ${dateNum} ${yr}`;

    return dateText;
  }

  generatePositionTitle(posn: OptionPosition) {
    return `${posn.underlying} ${posn.expDateText} ${posn.config.name}`;
  }

  // generates an option symbol object for each leg of the position
  // optionSymbolObject {symbol: actual option symbol, label: human readable label for the symbol}
  generateSymbolForLeg(leg: OptionLegBase, symbol: string, price: number, date: string, expDate: string) {
    // gets strike price and put call designator
    const symbolInfo = this.getSymbolInfo(leg, price, this.strikeGap);
    // console.log('pBS gSFP leg symbolInfo: ', symbolInfo);

    // generates a string representing strike price for the option symbol
    const symbolPrice = this.generateSymbolPrice(symbolInfo.strike);
    // console.log('pBS gSFP leg symbolPrice: ', symbolPrice);
    
    // generates the actual option symbol for the leg
    const symb = `${symbol}${date}${symbolInfo.putCall}${symbolPrice}`
    // console.log('pBS gSFP leg symbol: ', sym);
    
    // generates a human readable label for the leg
    const putCallLabel = symbolInfo.putCall === 'C' ? 'CALL' : 'PUT';

    const label = `${symbol}_${expDate}_${symbolInfo.strike}_${putCallLabel}`;
    // console.log('pBS gSFP symbol label: ', label);

    const symbObj:OptionSymbolMetadata = {symbol, label};

    return symbObj;

  }

  // Get strike price and put/call designator for each leg
  getSymbolInfo(leg: OptionLegBase, price: number, strikeGap: number) {
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
    const expDate = this.datesService.getExpirationDate(date, expDistDays, 'MONTHLY');
    const yr = expDate.getFullYear().toString().slice(2);
    const mo = expDate.getMonth().toString().padStart(2, '0');
    const da = expDate.getDate().toString().padStart(2, '0');

    const symbolDate = `${yr}${mo}${da}`;
    // console.log('pBS gSD symbolDate: ', symbolDate);

    return symbolDate;
  }


}
