import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import {OratsFileFormat, StrikesByExpiration} from '../../common/interfaces_orats';
import {TradedStrikesTableDataObject} from '../../common/interfaces';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  // holds one .csv file at a time
  csvDataBS = new BehaviorSubject<Object>({});

  // dataRecordsArrayBS = new BehaviorSubject<>();
  
  constructor() { }

  ////////////////////// CSV DATA FROM FILE READER //////////////////

  setCsvData(data: Object) {
    this.csvDataBS.next({});
    this.csvDataBS.next(data);
    // const newRecord = this.addSymbolAndHashColumns(data);
    // console.log('cS sCD record with contract symbol and hash: ', newRecord);
  }


  ///////////// ADD CONTRACT SYMBOL COLUMNS //////////

  addSymbolAndHashColumns(data: Object) {
    const records = this.generateRecordsArrayFromCsvFile(data);
    const recordsWithNewColumns = [];
    console.log('cS aSAHC records[0]: ', records[0]);

    const someRecords = [records[0]];

    for (const record of someRecords) {
      const contractSymbols = this.generateContractSymbols(record);

      record.ctxSymbol = contractSymbols.ctxS;
      record.callSymbol = contractSymbols.cS;
      record.putSymbol = contractSymbols.pS;

      // const hash = this.generateHash(contractSymbols.ctxS);
      // const recordWithSymbolAndHash = this.appendSymbolsAndHashToRecord(contractSymbols.ctxS, hash, record);
      
      
      recordsWithNewColumns.push(record);
    }

    console.log('cS aSAHC recordsWithNewColumns: ', recordsWithNewColumns);

    return recordsWithNewColumns;
  }

  // Generates a text string representing the symbol for the option contract
  // format: underlyingSymbol_twoDigitYearTwoDigitDateTwoDigitMonth_C/P_eightDigitPrice(5.3)
  // ex: TSLA June 16, 2022 517.5 call
  // TSLA220618C00517500
  generateContractSymbols(record: OratsFileFormat) {
    // console.log('cS gCS input record: ', record);
    let contractSymbol = '';
    let callSymbol = '';
    let putSymbol = '';
    const undSymbol = record.symbol;
    
    const expiration = record.expirDate;
    const expDate = new Date(expiration);
    const yrStr = expDate.getFullYear().toString().slice(-2);
    const mo = expDate.getMonth().toString();
    const moStr = mo.toString().padStart(2, '0');
    const day = expDate.getDate().toString();
    const dayStr = day.padStart(2, '0');
    
    const strike = record.strike;
    const strikeTextParts = strike.split('.');
    // console.log('cS gCS strikeTextParts: ', strikeTextParts);
    let strikeText = '';

    strikeText += strikeTextParts[0].padStart(5, '0');
    strikeText += strikeTextParts[1] ? strikeTextParts[1].padEnd(3, '0') : '000';
    
    // console.log('cS gCS expDate/yr/mo/day/: ', expDate, yrStr, moStr, dayStr, strikeText);
    
    contractSymbol = `${undSymbol}${yrStr}${moStr}${dayStr}${strikeText}`;
    callSymbol = `${undSymbol}${yrStr}${moStr}${dayStr}C${strikeText}`;
    putSymbol = `${undSymbol}${yrStr}${moStr}${dayStr}P${strikeText}`;
    
    // console.log('cS gCS ctx/c/p symbols: ', contractSymbol, callSymbol, putSymbol);

    return {ctxS: contractSymbol, cS: callSymbol, pS: putSymbol};
  }

  generateHash(contractSymbol: string): string {
    console.log('cS gCS input ctxSymbol: ', contractSymbol);
    const hash = '';

    return hash;
  }

  appendSymbolsAndHashToRecord(contractSymbols: string, hash: string, record: OratsFileFormat): OratsFileFormat {
    console.log('cS gCS input ctxSymbol/hash/record: ', contractSymbols, hash, record);


    return record;
  }


  ///////////// END ADD CONTRACT SYMBOL COLUMNS //////////
  
  ///////////////// TRADED STRIKES SERVICE ////////////////////////////

  // symbols = new Set<string>();
  // expirations = new Set<string>();
  // strikes = new Set<string>();
  
  // only public method
  // takes an array of symbols 
  // returns an array of (strikes with all expirations) objects
  // and the master list of expiration dates
  getTradedStrikesData(symbols: string[]) {

    if (!this.csvDataBS.value || !this.csvDataBS.value[0] ) {
      console.log('cS gTSD no csv data dude!!  You gotta choose a file!');
      
      return
    } else {

    // generate raw records array from file filtered by symbols
    const records = this.generateRecordsArrayForSelectedSymbols(this.csvDataBS.value, symbols);

    // generate a strikes with expirations data object
    const strikesWithExpirations = this.generateExpirationsByTradedStrike(records);

    // generate a distinct master list of expirations 
    const allExpirations = this.getExpirationsFromStrikeExpirationsObject(strikesWithExpirations);

    // generate the final array of strikes with exipirations objects
    // this is used as table data in the strikes-table component
    const tradedStrikesData = this.generateTradedStrikesData(strikesWithExpirations, allExpirations);

    const data: TradedStrikesTableDataObject = {
      allExpirations, 
      tradedStrikesData,
    };
    
    return data;
  }

  }

  // 1) generateRecordsArrayForSelectedSymbols
  // takes a .csv file and an array of strings as symbols
  // returns an array of OratsFileFormat objects
  // this is the raw data from the .csv for all the selected symbols
  private generateRecordsArrayForSelectedSymbols(file, symbols: string[]): OratsFileFormat[] {
    const rawData = this.generateRecordsArrayFromCsvFile(file);
    const records: OratsFileFormat[] = [];
    console.log('cS pCFFS symbols/rawData[3]: ', symbols, rawData[3]);

    for (const symbol of symbols) {
      let index = rawData.findIndex(datum => datum.symbol === symbol);
      let datum = rawData[index]
      // console.log('cS pCFFS symbol/ind/datum: ', symbol, index, datum);

      while(datum.symbol === symbol) {
        records.push(datum);
        // console.log('cS pCFFS while index/foundsymbol: ', index, datum);
        index++;
        datum = rawData[index];
      }
    }
    console.log('cS gCFFS records: ', records);

    return records;
  }

  private generateRecordsArrayFromCsvFile(file): OratsFileFormat[] {
    let csvRecordsArray = (<string>file).split(/\r\n|\n/);  
    let headersRow = this.getHeaderArray(csvRecordsArray);  
    // console.log('cS uL headersRow: ', headersRow);
    const records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);

    return records;
  }

  private getHeaderArray(csvRecordsArr: any) {  
    let headers = (<string>csvRecordsArr[0]).split(',');  
    let headerArray = [];  
    for (let j = 0; j < headers.length; j++) {  
      headerArray.push(headers[j]);  
    }  
    return headerArray;  
  }

  private getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
    let csvArr = [];  
    let numRecords = csvRecordsArray.length;
  
    for (let i = 1; i < numRecords; i++) {  
      let currentRecord = (<string>csvRecordsArray[i]).split(',');  
      if (currentRecord.length == headerLength) {  
        // if (currentRecord[0].trim() !== 'A' ) {break}
        let csvRecord: OratsFileFormat = {
          symbol: currentRecord[0].trim(),
          stkPx: currentRecord[1].trim(),
          expirDate: currentRecord[2].trim(),
          yte: currentRecord[3].trim(),
          strike: currentRecord[4].trim(),
          cValue: currentRecord[10].trim(),
          pValue: currentRecord[13].trim(),

        };  

        const contractSymbols = this.generateContractSymbols(csvRecord);

        csvRecord.ctxSymbol = contractSymbols.ctxS;
        csvRecord.callSymbol = contractSymbols.cS;
        csvRecord.putSymbol = contractSymbols.pS;

        // this.symbols.add(currentRecord[0].trim());
        // this.expirations.add(currentRecord[2].trim());
        // this.strikes.add(currentRecord[4].trim());
  
        csvArr.push(csvRecord);  
      }  
    }  

    // console.log('cS gDRAFCF symbols/expirations: ', this.symbols, this.expirations, this.strikes);
    return csvArr;  
  }  
  
  // 2) generateExpirationsByTradedStrike
  // takes an array of OFF objects
  // returns a single object with keys as string strike and values
  // array of strings as expirations for the key strike
  // this is all the traded contracts for a particular symbol
  // arranged by strike with all expirations for that strike
  private generateExpirationsByTradedStrike(records: OratsFileFormat[]) {
    console.log('cS gEBTSM records[0]: ', records[0]);
    const strikesWithExpirations = {};
    for (const record of records) {
      let expirations: string[] = strikesWithExpirations[record.strike] ? 
        [...strikesWithExpirations[record.strike]] 
        : [];
      expirations.push(record.expirDate);
      strikesWithExpirations[record.strike] = expirations;
    }
    console.log('cS gEBTS strikesWithExpirations: ', strikesWithExpirations);

    return strikesWithExpirations;
  }


  // 3) getExpirationsFromStrikeExpirationsObject
  // takes a strikes with all expirations object from prev method
  // returns a single array of strings representing the unique list
  // of expiration dates that exist that day for the symbol
  // used as master list of expirations and 
  // as keys for final TradedStrikesData objects
  // as column headers in strikes table
  private getExpirationsFromStrikeExpirationsObject(expirationsByStrike) {
    const expirationsSet = new Set<string>();
    for (const [key, value] of Object.entries(expirationsByStrike)) {
      // console.log('cS gEFSEO strike/e?xps: ', key, value);
      const expirations: string[] = [...Object.values(value)];
      for (const exp of Object.values(expirations)){
        expirationsSet.add((new Date(exp)).toISOString());
      }
    }
    const expirationsDates = []
    for (const exp of expirationsSet) {
      expirationsDates.push(new Date(exp).getTime());
    }
    expirationsDates.sort();
    // console.log('cS gEFSEO expirations dates: ', expirationsDates);
    const expirationsDateTextStrings = [];
    for (const millis of expirationsDates) {
      const date = new Date(millis);
      // const dateText = `${DAYS_MAP.get(date.getDay())} ${new Intl.DateTimeFormat().format(date)}`;
      const dateText = new Intl.DateTimeFormat().format(date);
      expirationsDateTextStrings.push(dateText);
    }
    // console.log('cS gEFSEO expirations dates strings: ', expirationsDateTextStrings);
    return expirationsDateTextStrings;
  }


  // 4) generateTradedStrikesData
  // takes a strikes with all expirations object and the master list of 
  // expirations
  // returns an array of objects with one key of strike and additional keys 
  // as strings one for each of the expirations for the symbol
  // For each key a boolean is set true if that expiration is traded 
  // or false if not
  // This is the final data set for the UI strikes table feature
  private generateTradedStrikesData(strikesWithExpirations, allExpirations: string[]) {
    const tradedStrikesData = [];
    for (const strike of Object.entries(strikesWithExpirations)) {
      // console.log('cS gTSDO strike object: ', strike);
      const expirations: string[] = Object.values(strike[1]);
      // console.log('cS gTSDO expirations: ', expirations);
      const row = {
        strike: Number(strike[0]),
      }
      for (const exp of Object.values(allExpirations)) {
        row[exp] = expirations.includes(exp) ? true : false;
      }
      // console.log('cS gTSDO final row: ', row);
      tradedStrikesData.push(row);
    }
    console.log('cS gTSDO final tradedStrikesData: ', tradedStrikesData);

    return tradedStrikesData;
  }

  // ====== OTHER METHODS FROM DOWNLOAD MANAGER BUT NOT USED NOW ==========

  // allSymbols = [];
  // tradedStrikes = new Map<string, StrikesByExpiration[]>();

  // private generateTradedStrikesByExpirationMap(records: OratsFileFormat[]) {
  //   // console.log(records.slice(100, 110));
  //   console.log('cS gTSM records[0]: ', records[0]);

  //   let currentRecord, prevRecord: OratsFileFormat = {};
  //   let currentSymbol, prevSymbol = '';
  //   let currentYte, prevYte = '';

  //   let strikesArray = [];
  //   let strikesByExpiration = [];

  //   for (const record of records) {
  //     prevRecord =  {...currentRecord};
  //     currentRecord = {...record};
  //     currentSymbol = record.symbol;
  //     currentYte = record.yte;

  //     // before we process the record, we have to check whether the current row is a new expiration or symbol
  //     // if new expiration, write the data for prev exp and push to the array
  //     // if new symbol, write the data for prev symbol and set the map
  //     // then process the record no matter what

  //     if (currentYte !== prevYte) {

  //       if (strikesArray.length) {
  //         // create the strikesByExpiration object and push to the array
  //         const strikesForExpiration: StrikesByExpiration = {
  //           yte: prevRecord.yte,
  //           date: prevRecord.expirDate,
  //           strikes: strikesArray,
  //         };
  //         console.log('cS gTSM setting stByExp for exp/len: ', prevRecord.expirDate, strikesArray.length, prevSymbol);
  //         strikesByExpiration.push(strikesForExpiration);
  //         console.log('strikes array: ', strikesArray);
  //         strikesArray = [];
  //       };

  //       // check for new symbol
  //       if (currentSymbol !== prevSymbol) {

  //         if (strikesByExpiration.length) {
  //           // create the strikesForSymbol object and set the tradedStrikes map
  //           console.log('cS gTSM setting Map. symbol/strikes by exp len: ', prevSymbol, strikesByExpiration.length);
  //           this.tradedStrikes.set(prevSymbol, strikesByExpiration);
  //           console.log('map entry: ', this.tradedStrikes.get(prevSymbol));
  //           strikesByExpiration = [];
  //         }

  //           // begin the new symbol
  //           console.log('=====================================');
  //           console.log('cS gTSM new current symbol/prevSymbol/stkPx: ', currentSymbol, prevSymbol ?? 'no prev symbol', record.stkPx);
  //           this.allSymbols.push(currentSymbol);
        
  //           // set prevSymbol = currentSymbol
  //           prevSymbol = currentSymbol;
  //       }
        
  //       // begin the new expiration
  //       console.log('------------------------------');
  //       console.log('cS gTSM current expiration/prevExp: ', currentYte, record.expirDate, prevYte ?? 'no prev exp');
  //       // set prevExp = currentExp
  //       prevYte = currentYte;
  //     } 

  //     // process the row
  //     strikesArray.push(record.strike);
  //   }
  // }

  // private generateSymbolsDataMap(data: OratsFileFormat[]) {
  //   // const symbolsForData = SYMBOLS;
  //   // const symbolsForData = [SYMBOLS[1]];
  //   const symbolsForData = [...SYMBOLS.slice(10, 120)];
  //   const symbolsDataMap = new Map<string, OratsFileFormat>();

  //   for (const symbol of symbolsForData) {
  //     console.log('-----------------------------');
  //     console.log('cS gSDM symbol for data: ', symbol);

  //     const symbolData = this.getDataForSymbol(data, symbol);

  //     let expiration, strike = '';
  //   }
  // }

  // private getDataForSymbol(data: OratsFileFormat[], symbol: string) {
  //   let index = data.findIndex(datum => datum.symbol === symbol);
  //   if (index && data[index]) {
  //     let rowSymbol = data[index].symbol ?? '';
  //     // console.log('cS gSDM init index/foundSymbol: ', index, rowSymbol);
  //     const symbolData: OratsFileFormat[] = [];
    
  //     while(rowSymbol === symbol) {
  //       symbolData.push(data[index]);
  //       index++;
  //       rowSymbol = data[index].symbol;
  //       // console.log('cS gSDM while index/foundSymbol: ', index, rowSymbol);
  //     }
  //     // console.log('cS gSDM final symbol data slice for: ', symbol);
  //     // console.table(symbolData.slice(950, 1000));
  //     // console.table(symbolData);
  
  //     this.dataBS.next(symbolData);
  //     // console.log('cS uL symbolData: ', this.dataBS.value);
  
  //     return symbolData;

  //   } else return;
  // }

  // private generateDataMap(data: OratsFileFormat[], field: string) {
  // }

  private thatsAllFolks() {}

// ====== END OTHER METHODS ==========

  ///////////////// END TRADED STRIKES SERVICE /////////////////////////


}
