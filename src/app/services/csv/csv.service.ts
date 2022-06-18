import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { DeltaStrikesGridData, OratsFileFormat, OratsUiDatum, StrikesByExpiration} from '../../common/interfaces_orats';
import { RibbonInfo, TradedStrikesTableDataObject} from '../../common/interfaces';
import { DELTA_STRIKES_TARGET_DELTA_NUM_RECORDS, RIBBON_INFO_INITIALIZER } from 'src/app/common/constants';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  // holds one .csv file at a time
  csvDataBS = new BehaviorSubject<Object>({});

  // array of all rows in the .csv file as one OratsUiDatum object per row
  allRecordsBS = new BehaviorSubject<OratsUiDatum[]>([]);
  
  constructor() { }

  ////////////////////// CSV DATA FROM FILE READER  ACTIONS //////////////////

  setCsvData(data: Object) {
    // pushes the .csv file to a file BS
    this.csvDataBS.next(data);

    // pushes array of OratsUiDatum objects to all records BS
    // use as internal data source so this only happens once per upload
    this.allRecordsBS.next(this.generateRecordsArrayFromCsvFile(this.csvDataBS.value));

  }

  // run this first when a new file arrives from download manager
  private generateRecordsArrayFromCsvFile(file): OratsUiDatum[] {
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

  // this is the entry point for configuring the OratsUiDatum object instances
  private getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
    let csvArr = [];  
    let numRecords = csvRecordsArray.length;
  
    for (let i = 1; i < numRecords; i++) {  
      let currentRecord = (<string>csvRecordsArray[i]).split(',');  
      if (currentRecord.length == headerLength) {  
        let csvRecord: OratsUiDatum = {
          symbol: currentRecord[0].trim(),
          trade_date: currentRecord[36].trim(),
          stkPx: currentRecord[1].trim(),
          expirDate: currentRecord[2].trim(),
          yte: currentRecord[3].trim(),
          strike: currentRecord[4].trim(),
          cValue: currentRecord[10].trim(),
          pValue: currentRecord[13].trim(),
          delta: currentRecord[25].trim(),
          cMidIv: currentRecord[16].trim(),
          pMidIv: currentRecord[20].trim(),

        };  

        const contractSymbols = this.generateContractSymbols(csvRecord);

        csvRecord.ctxSymbol = contractSymbols.ctxS;
        csvRecord.callSymbol = contractSymbols.cS;
        csvRecord.putSymbol = contractSymbols.pS;
  
        csvArr.push(csvRecord);  
      }  
    }  

    // console.log('cS gDRAFCF symbols/expirations: ', this.symbols, this.expirations, this.strikes);
    return csvArr;  
  } 

  //************* add contract symbol columns **************
  
  // Generates a text string representing the symbol for the option contract
  // format: underlyingSymbol twoDigitYear TwoDigitDate TwoDigitMonth C/P eightDigitPrice(5.3)
  // all one word no spaces or underscores etc.
  // ex: TSLA June 16, 2022 517.5 call
  // TSLA220618C00517500
  private generateContractSymbols(record: OratsUiDatum) {
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

  // these will possibly be used later
  private addSymbolAndHashColumns(data: Object) {
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

  private generateHash(contractSymbol: string): string {
    console.log('cS gCS input ctxSymbol: ', contractSymbol);
    const hash = '';

    return hash;
  }

  private appendSymbolsAndHashToRecord(contractSymbols: string, hash: string, record: OratsUiDatum): OratsUiDatum {
    console.log('cS gCS input ctxSymbol/hash/record: ', contractSymbols, hash, record);


    return record;
  }

  //************* end add contract symbol columns **************

  ///////////////// END CSV DATA FROM FILE READER ACTIONS //////////////////

  //////////////////// HELPER FUNCTIONS //////////////////////////////


  // takes a .csv file and an array of strings as symbols
  // returns an array of OratsUiDatum objects
  // this is the raw data from the .csv for all the selected symbols
  public generateRecordsArrayForSelectedSymbols(symbols: string[]): OratsUiDatum[] {
    // console.log('cS gRAFSS symbols: ', symbols);
    const records: OratsUiDatum[] = [];

    for (const symbol of symbols) {
      let index = this.allRecordsBS.value.findIndex(datum => datum.symbol === symbol);
      let datum = this.allRecordsBS.value[index]
      // console.log('cS pCFFS symbol/ind/datum: ', symbol, index, datum);

      while(datum.symbol === symbol) {
        records.push(datum);
        // console.log('cS pCFFS while index/foundsymbol: ', index, datum);
        index++;
        datum = this.allRecordsBS.value[index];
      }
    }
    // console.log('cS gRAFSS records: ', records);

    return records;
  }

//////////////////// END HELPER FUNCTIONS //////////////////////////////
  

//////////// GENERATE RIBBON INFO FOR TRADED STRIKES VIEW ////////////

  public getRibbonInfo(symbol: string): RibbonInfo {
    // console.log('cS gRI input ribbon info symbol: ', symbol);
    const index = this.allRecordsBS.value.findIndex(item => item.symbol === symbol);
    const source = this.allRecordsBS.value[index];

    const ribbonInfo: RibbonInfo = {
      date: source.trade_date,
      symbol: source.symbol,
      price: source.stkPx,
      iv: 'not impl.',
    }
    
    // console.log('cS gRI final ribbon info: ', ribbonInfo);

    return ribbonInfo;
  }

//////////// END RIBBON INFO FOR TRADED STRIKES VIEW //////////

/////////////// DELTA STRIKES GRID DATA OBJECT //////////////////

  public generateDeltaStrikesGridData(data: OratsUiDatum[]): DeltaStrikesGridData  {
    const deltas = [...DELTA_STRIKES_TARGET_DELTA_NUM_RECORDS.keys()];
    let currentDelta = deltas[0];
    console.log('cS gDSGD deltas: ', deltas, currentDelta);

    let currentExpiration = 'initExp';
    let currentDistance = 999;
    let recordsForExpiration = [];
    let index = 0;
    let goToNextExpiration = false;
    
    // output object shape
    // key as expiration and value as object with array of records for each target delta
    // {
    //   '6/1/2020': [...targetDeltaRecordsForExpiration],
    //   '6/8/2020': [...targetDeltaRecordsForExpiration],
    //   '6/22/2020': [...targetDeltaRecordsForExpiration],
    // }
    const deltaStrikesGridData: DeltaStrikesGridData = {}

    for (const datum of data) {
      
      if (goToNextExpiration === false || (goToNextExpiration === true && (datum.expirDate !== currentExpiration))) {

        if (datum.expirDate !== currentExpiration) {
          console.log('========== New expiration ==============================');
          console.log('cS gDSGD datum index: ', index);
          console.log('cS gDSGD cur/new exp: ', currentExpiration, datum.expirDate);
          console.log('cS gDSGD recordsForExp.len: ', recordsForExpiration.length);

          

          // only write to delta strikes object if there are records for exp
          if (recordsForExpiration.length) {
            deltaStrikesGridData[currentExpiration] = [...recordsForExpiration];
            // console.log('cS gDSGD writing deltaStrikesGridData: ', deltaStrikesGridData);
            
            // reset for new expiration
            recordsForExpiration.length = 0;
            goToNextExpiration = false;
            currentDistance = 999;
            currentDelta = deltas[0];
            console.log('cS gDSGD finished reset. new gTNE/cE/cDi/cDe: ', goToNextExpiration, currentExpiration, currentDistance, currentDelta);
            console.log('-------------------------------');
          }
          currentExpiration = datum.expirDate;
        }

        
        // use absolute value since we only need the magnitude
        const distance = Math.abs(Number(datum.delta) - currentDelta);
        console.log('-------------------------------');
        console.log('cS gDSGD index/curDel/dat.del/distance/cur dist: ', index, currentDelta, datum.delta, distance, currentDistance);
        console.log('cS gDSGD datum.strike/delta: ', datum.strike, datum.delta);
        console.log('cS gDSGD data[index]strike/delta: ', data[index].strike, data[index].delta);

        // the first new record will always fail because initial currentDistance is 999
        if (distance > currentDistance && Number(datum.delta) < currentDelta) {

          // we found our target 
          console.log('--------------- cS gDSGD target found for delta ',currentDelta,' ----------------');

          // get the number of records to return
          // create an array by slicing data at the current index and as many on either side to create the proper size array

          const offset = Math.floor(DELTA_STRIKES_TARGET_DELTA_NUM_RECORDS.get(currentDelta) / 2);

          // since we're now on the record after the one we're interested on, specify the index
          // of the target record as index - 1, and use that to grab the records we want
          const targetIndex = index - 1;
          // const targetIndex = index;
          console.log('cS gDSGD found at index: ', targetIndex);

          const records = data.slice(targetIndex - offset, targetIndex + offset + 1);
          console.log('cS gDSGD strike/offset/delta: ', data[targetIndex].strike, offset,  data[targetIndex].delta);
          console.log('cS gDSGD writing to records for exp array');
          console.table(records)

          // push these records to the records for expiration array
          recordsForExpiration.push(...records);
          index ++;

          // now we need to search for the next target delta
          // this continues the search from the current record
          const curIndex = [...deltas].findIndex(delta => delta === currentDelta);
          currentDelta = deltas[curIndex + 1];
          currentDistance = 999;
          console.log('cS gDSGD new current delta/dist: ', currentDelta, currentDistance);

          if (!currentDelta) {
            // since we don't want to search any more records in this expiration, we set go to next exp to true
            goToNextExpiration = true;
            console.log('setting go to next expiration true. index: ', index);
            console.log('-------------------------------');
          }
        } else {
          console.log('cS gDSGD dist < cur dist: ', distance, currentDistance);
          currentDistance = distance;
          // go to next record - this will happen until we find the target delta
          index ++;
          console.log('cS gDSGD new index/cur dist: ', index, currentDistance);
        }
      } else {
        index ++;
        console.log('cS gDSGD go to next exp = true. new index: ', index);
      }
    }

    console.log('cS gDSGD final deltaStrikesGridData: ', deltaStrikesGridData);
    
    return deltaStrikesGridData;
  }





/////////////// END DELTA STRIKES GRID DATA OBJECT //////////////////
  
  //////////// TRADED STRIKES TABLE DATA OBJECT ////////////////////////

  // takes an array of symbols 
  // returns an array of (strikes with all expirations) objects
  // and the master list of expiration dates
  public getTradedStrikesData(symbols: string[]) {

    if (!this.csvDataBS.value || !this.csvDataBS.value[0] ) {
      console.log('cS gTSD no csv data dude!!  You gotta choose a file!');
      
      return
    } else {

    // generate raw records array from file filtered by symbols
    const records = this.generateRecordsArrayForSelectedSymbols(symbols);

    // generate a strikes with expirations data object
    // const strikesWithExpirations = this.generateExpirationsByTradedStrike(records);
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
  
  // 2) generateExpirationsByTradedStrike
  // takes an array of OFF objects
  // returns a single object with keys as string strike and values
  // array of strings as expirations for the key strike
  // this is all the traded contracts for a particular symbol
  // arranged by strike with all expirations for that strike
  private generateExpirationsByTradedStrike(records: OratsUiDatum[]) {
    // console.log('cS gEBTSM records[0]: ', records[0]);
    const strikesWithExpirations = {};
    for (const record of records) {
      let expirations: string[] = strikesWithExpirations[record.strike] ? 
        [...strikesWithExpirations[record.strike]] 
        : [];
      expirations.push(record.expirDate);
      strikesWithExpirations[record.strike] = expirations;
    }
    // console.log('cS gEBTS strikesWithExpirations: ', strikesWithExpirations);

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
    // console.log('cS gTSDO final tradedStrikesData: ', tradedStrikesData);

    return tradedStrikesData;
  }

  // ====== OTHER METHODS FROM DOWNLOAD MANAGER BUT NOT USED NOW ==========

  // allSymbols = [];
  // tradedStrikes = new Map<string, StrikesByExpiration[]>();

  // private generateTradedStrikesByExpirationMap(records: OratsUiDatum[]) {
  //   // console.log(records.slice(100, 110));
  //   console.log('cS gTSM records[0]: ', records[0]);

  //   let currentRecord, prevRecord: OratsUiDatum = {};
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

  // private generateSymbolsDataMap(data: OratsUiDatum[]) {
  //   // const symbolsForData = SYMBOLS;
  //   // const symbolsForData = [SYMBOLS[1]];
  //   const symbolsForData = [...SYMBOLS.slice(10, 120)];
  //   const symbolsDataMap = new Map<string, OratsUiDatum>();

  //   for (const symbol of symbolsForData) {
  //     console.log('-----------------------------');
  //     console.log('cS gSDM symbol for data: ', symbol);

  //     const symbolData = this.getDataForSymbol(data, symbol);

  //     let expiration, strike = '';
  //   }
  // }

  // private getDataForSymbol(data: OratsUiDatum[], symbol: string) {
  //   let index = data.findIndex(datum => datum.symbol === symbol);
  //   if (index && data[index]) {
  //     let rowSymbol = data[index].symbol ?? '';
  //     // console.log('cS gSDM init index/foundSymbol: ', index, rowSymbol);
  //     const symbolData: OratsUiDatum[] = [];
    
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

  // private generateDataMap(data: OratsUiDatum[], field: string) {
  // }

  private thatsAllFolks() {}

// ====== END OTHER METHODS ==========

  ///////////////// END TRADED STRIKES SERVICE /////////////////////////


}
