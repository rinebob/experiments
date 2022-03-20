import { Injectable } from '@angular/core';
import { moneynessMap, MoneynessUnit, OptionLegBase, OptionPosition, OptionPositionsAndSymbols, OptionSpreadConfigBase, OptionSymbolMetadata, OptionType } from '../common/option_interfaces';
import {OratsDatum, OratsStrikeData, StrikeMetadata, } from '../common/interfaces_orats';
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

  // NEW METHOD TO RETURN OPTION POSITION OBJECTS AND A LIST OF SYMBOLS
  // interface has OptionPositionObject array and symbols array
  // just call generateOptionPositions and return an array of objects
  // pass that array to a symbol extractor method
  // put the positions array and the symbol array in an object and return it

  generatePositionsAndSymbols(symbol: string, dates: any[], configsList: OptionSpreadConfigBase[]) {
    const positions = this.generateOptionPositions(symbol, dates, configsList);


    const positionsAndSymbols: OptionPositionsAndSymbols = {
      positions,
      symbols: this.extractSymbols(positions),
      oratsStrikeDataObjects: this.generateOratsStrikeDataObjects(positions),
    }

    return positionsAndSymbols;

  }


  // CURRENT TOP LEVEL METHOD FOR THE SERVICE.  CALL THIS TO MAKE EVERYTHING HAPPEN...
  generateOptionPositions(symbol: string, dates: any[], configsList: OptionSpreadConfigBase[]) {
    let positions: OptionPosition[] = [];
    // const dates = this.posnBuilderService.generateTradingDates(data);
    
    for (const config of configsList) {
      // console.log('pB gOP input config: ', {...config});
      positions = [...positions, ...this.generateOptionPositionObjects(dates, symbol, config)];
    }
    positions = this.generateSymbolsForPositions(positions);
    positions.sort((a,b) => (a.dateOpened.getTime() - b.dateOpened.getTime()));

    return positions;
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
      // TSLA WED JUN 19 21 Long Straddle
      position.expDateText = this.getDateText(position.expDate);
      position.title = this.generatePositionTitle(position);

      // console.log('pBS gOPO posn expDateText: ', position.expDateText);

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
        // console.log('spBS gSFP symbolObject: ', symbolObject);
        posn.symbols ? posn.symbols.push(symbolObject) : posn.symbols = [symbolObject];

        // Generate an OratsStrikeData object for each leg here
        // 

      }

      // console.log('pBS gSFP position object end: ', posn);
      updatedPositions.push(posn);
    }

    return updatedPositions;
  }

  // NEW METHOD TO EXTRACT SYMBOLS FROM AN ARRAY OF POSITIONS
  extractSymbols(positions: OptionPosition[]) {
    const symbols: string[] = [];
    for (const position of positions) {
      for (const symbol of position.symbols) {
        symbols.push(symbol.symbol);
      }
    }

    return symbols;
  }
//   export interface StrikeMetadata {
//     underlyingSymbol: string;
//     strikeSymbol?: string;
//     callSymbol?: string;
//     putSymbol?: string;
//     expirationDate: string;
//     strike: string;
// }

// export interface OratsDatum {
//     date: string;
//     oratsDataPoint: OratsFileFormat;
// }

// export interface OratsStrikeData {
//     metadata: StrikeMetadata;
//     dataSeries: OratsDatum[];
// }

  generateOratsStrikeDataObjects(positions: OptionPosition[]) {

    const oratsStrikeDataObjects: OratsStrikeData[] = [];

    for (const position of positions) {
      // console.log('--------------------------------------');
      // console.log('pBS gOSDO input position: ', position);
      
      for (const symbol of position.symbols) {
        // console.log('pBS gOSDO input symbol: ', symbol);

        const {strike, strikeSymbol, contractSymbol, type} = this.generateOratsSymbols(symbol.symbol);

        const strikeMetadata: StrikeMetadata = {
          underlyingSymbol: position.underlying,
          strikeSymbol,
          contractSymbol,
          expirationDate: position.expDateText,
          strike,
          type,
        }
  
        const strikeData: OratsStrikeData = {
          metadata: strikeMetadata,
          dataSeries: [],
        }

        oratsStrikeDataObjects.push(strikeData);
      }
    }

    // console.log('pBS gOSDO final strike data objects: ', oratsStrikeDataObjects);

    return oratsStrikeDataObjects;

  }

  generateOratsSymbols(symbol: string) {
    // console.log('pBS gOS input symbol: ', symbol);

    const strike = symbol.slice(-8);
    // console.log('pBS gOS strike: ', strike);
    
    let symbExp = symbol.slice(0, -8);
    
    const pC = symbExp.slice(symbExp.length - 1);
    // console.log('pBS gOS pC: ', pC);

    const type = (pC === 'C' ? 'CALL' : 'PUT') as OptionType;
    
    symbExp = symbExp.slice(0, symbExp.length - 1);
    // console.log('pBS gOS symbExp: ', symbExp);
    
    
    const strikeSymbol = symbExp + strike;
    const contractSymbol = symbol;
    // console.log('pBS gOS stk/stkSymb/cs: ', strike, strikeSymbol, contractSymbol);

    return {strike, strikeSymbol, contractSymbol, type};


  }


  getDateText(date: Date) {
    let dateText = '';
    const day = DAYS_MAP.get(date.getDay());
    const mo = MONTHS_MAP.get(date.getMonth());
    const dateNum = (date.getDate()).toString().padStart(2, '0');
    const yr = (date.getFullYear()).toString().slice(2);

    dateText = `${day} ${mo} ${dateNum} ${yr}`;
    // console.log('pBS gDT date text: ', dateText);

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

    const symbObj:OptionSymbolMetadata = {symbol: symb, label};

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
