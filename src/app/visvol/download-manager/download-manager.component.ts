import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { OratsFileFormat, StrikesByExpiration, StrikesWithExpirations } from 'src/app/common/interfaces_orats';
import { DAYS_MAP, SYMBOLS } from 'src/app/common/constants';

@Component({
  selector: 'exp-download-manager',
  templateUrl: './download-manager.component.html',
  styleUrls: ['./download-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DownloadManagerComponent implements OnInit  {
  title = 'Angular7-readCSV';  
  
  public records: any[] = [];  
  @ViewChild('csvReader') csvReader: any;  

  dataBS = new BehaviorSubject<OratsFileFormat[]>([]);
  data$: Observable<OratsFileFormat[]> = this.dataBS;

  symbols = new Set<string>();
  expirations = new Set<string>();
  strikes = new Set<string>();
  tradedStrikes = new Map<string, StrikesByExpiration[]>();

  symbol = new FormControl('');
  ticker = new FormControl('');

  allTickers = [];

  fileName = 'test.csv';
  
  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    
  }

  uploadListener($event: any): void {  
    // console.log('dM uL upload listener called. event: ', $event);
    
    let text = [];  
    let files = $event.srcElement.files;  
    // console.log('dM uL files: ', $event.srcElement.files);
    
    // console.log('dM uL calling is valid file');
    
    
    if (this.isValidCSVFile(files[0])) {  
      // console.log('dM uL in valid file block. files[0]: ', files[0]);
  
      let input = $event.target;  
      let reader = new FileReader();  
      reader.readAsText(input.files[0]);  
  
      reader.onload = () => {  
        let csvData = reader.result;
        this.processCsvFile(csvData);  
      };  
  
      reader.onerror = function () {  
        console.log('error is occured while reading file!');  
      };  
  
    } else {  
      alert("Please import valid .csv file.");  
      this.fileReset();  
    }  
  }  

  processCsvFile(file) {

    const records = this.processCsvFileForSymbols(file, ['TSLA']);

    // const records = this.generateRecordsFromCsvFile(file);
    
    // const records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);

    // this.generateTradedStrikesMap(records.slice(10000, 11000));
    // this.generateTradedStrikesByExpirationMap(records);

    const strikesWithExpirations = this.generateExpirationsByTradedStrike(records);

    // console.log('dM pCF strikes with expirations: ', strikesWithExpirations);

    const allExpirationsSet = this.getExpirationsFromStrikeExpirationsObject(strikesWithExpirations);

    console.log('dM pCF allExpirationsSet: ', allExpirationsSet);

    // const symbolsDataMap = this.generateSymbolsDataMap(records);
  }

  generateExpirationsByTradedStrike(records: OratsFileFormat[]) {
    console.log('dM gEBTSM records[0]: ', records[0]);

    const strikesWithExpirations = {};

    for (const record of records) {
      let expirations: string[] = strikesWithExpirations[record.strike] ? [...strikesWithExpirations[record.strike]] : [];
      expirations.push(record.expirDate);
      strikesWithExpirations[record.strike] = expirations;
    
      // if (strikesWithExpirations[record.strike]) {
      //   expirations = [...strikesWithExpirations[record.strike]];
      //   strikesWithExpirations[record.strike].push(record.expirDate)

      // } else {
      //   strikesWithExpirations[record.strike] = [record.expirDate];

      // }
    }

    console.log('dM gEBTS strikesWithExpirations: ', strikesWithExpirations);

    return strikesWithExpirations;
  }

  getExpirationsFromStrikeExpirationsObject(expirationsByStrike) {
    const expirationsSet = new Set<string>();

    for (const [key, value] of Object.entries(expirationsByStrike)) {

      console.log('dM gEFSEO strike/e?xps: ', key, value);

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
    
    console.log('dM gEFSEO expirations dates: ', expirationsDates);

    const expirationsDateTextStrings = [];

    for (const millis of expirationsDates) {
      const date = new Date(millis);
      const dateText = `${DAYS_MAP.get(date.getDay())} ${new Intl.DateTimeFormat().format(date)}`;
      expirationsDateTextStrings.push(dateText);
    }

    console.log('dM gEFSEO expirations dates strings: ', expirationsDateTextStrings);



    // for (const record of Object.values(expirationsByStrike)) {

    //   // console.log('dM gEFSEO strike record: ', record, typeof record);

    //   const expirations: string[] = [...Object.values(record)].sort();
      
    //   console.log('dM gEFSEO expirations: ', expirations, typeof expirations);
    //   for (const exp of Object.values(expirations)){
    //     expirationsSet.add(exp);
    //   }
    // }

    
    return expirationsSet;
  }

  generateTradedStrikesByExpirationMap(records: OratsFileFormat[]) {
    // console.log(records.slice(100, 110));
    console.log('dM gTSM records[0]: ', records[0]);

    let currentRecord, prevRecord: OratsFileFormat = {};
    let currentTicker, prevTicker = '';
    let currentYte, prevYte = '';

    let strikesArray = [];
    let strikesByExpiration = [];

    for (const record of records) {
      prevRecord =  {...currentRecord};
      currentRecord = {...record};
      currentTicker = record.ticker;
      currentYte = record.yte;

      // before we process the record, we have to check whether the current row is a new expiration or ticker
      // if new expiration, write the data for prev exp and push to the array
      // if new ticker, write the data for prev ticker and set the map
      // then process the record no matter what

      if (currentYte !== prevYte) {

        if (strikesArray.length) {
          // create the strikesByExpiration object and push to the array
          const strikesForExpiration: StrikesByExpiration = {
            yte: prevRecord.yte,
            date: prevRecord.expirDate,
            strikes: strikesArray,
          };
          console.log('dM gTSM setting stByExp for exp/len: ', prevRecord.expirDate, strikesArray.length, prevTicker);
          strikesByExpiration.push(strikesForExpiration);
          console.log('strikes array: ', strikesArray);
          strikesArray = [];
        };

        // check for new ticker
        if (currentTicker !== prevTicker) {

          if (strikesByExpiration.length) {
            // create the strikesForTicker object and set the tradedStrikes map
            console.log('dM gTSM setting Map. ticker/strikes by exp len: ', prevTicker, strikesByExpiration.length);
            this.tradedStrikes.set(prevTicker, strikesByExpiration);
            console.log('map entry: ', this.tradedStrikes.get(prevTicker));
            strikesByExpiration = [];
          }

            // begin the new ticker
            console.log('=====================================');
            console.log('dM gTSM new current ticker/prevTicker/stkPx: ', currentTicker, prevTicker ?? 'no prev ticker', record.stkPx);
            this.allTickers.push(currentTicker);
        
            // set prevTicker = currentTicker
            prevTicker = currentTicker;
        }
        
        // begin the new expiration
        console.log('------------------------------');
        console.log('dM gTSM current expiration/prevExp: ', currentYte, record.expirDate, prevYte ?? 'no prev exp');
        // set prevExp = currentExp
        prevYte = currentYte;
      } 

      // process the row
      strikesArray.push(record.strike);
    }
  }

  getStrikesForSymbol() {
    const symbol = this.symbol.value;


  }

  generateRecordsFromCsvFile(file): OratsFileFormat[] {
    let csvRecordsArray = (<string>file).split(/\r\n|\n/);  
        // console.log('dM uL csvRecordsArray[100000]: ', csvRecordsArray[100000]);
        // console.log('dM uL tpeof file: ', typeof file);
        
    let headersRow = this.getHeaderArray(csvRecordsArray);  
    // console.log('dM uL headersRow: ', headersRow);
    
    const records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);

    return records;
  }

  processCsvFileForSymbols(file, symbols: string[]): OratsFileFormat[] {

    const rawData = this.generateRecordsFromCsvFile(file);
    const records: OratsFileFormat[] = [];
    console.log('dM pCFFS symbols/rawData[3]: ', symbols, rawData[3]);

    for (const symbol of symbols) {
      let index = rawData.findIndex(datum => datum.ticker === symbol);
      let datum = rawData[index]
      // console.log('dM pCFFS symbol/ind/datum: ', symbol, index, datum);

      while(datum.ticker === symbol) {
        records.push(datum);
        // console.log('dM pCFFS while index/foundTicker: ', index, datum);
        index++;
        datum = rawData[index];
      }

    }

    console.log('dM gCFFS records: ', records);


    return records;


  }

  showDataFor() {
    const ticker = this.ticker.value;
    console.log('dM gTSM ticker/all tickers: ', ticker, this.allTickers);
    console.log('dM gTSM expirations and strikes for ticker: ', this.tradedStrikes.get(ticker));
  }

  generateSymbolsDataMap(data: OratsFileFormat[]) {
    // const symbolsForData = SYMBOLS;
    // const symbolsForData = [SYMBOLS[1]];
    const symbolsForData = [...SYMBOLS.slice(10, 120)];
    const symbolsDataMap = new Map<string, OratsFileFormat>();

    for (const symbol of symbolsForData) {
      console.log('-----------------------------');
      console.log('dM gSDM symbol for data: ', symbol);

      const symbolData = this.getDataForSymbol(data, symbol);

      let expiration, strike = '';
    }
  }

  getDataForSymbol(data: OratsFileFormat[], symbol: string) {
    let index = data.findIndex(datum => datum.ticker === symbol);
    if (index && data[index]) {
      let rowTicker = data[index].ticker ?? '';
      // console.log('dM gSDM init index/foundTicker: ', index, rowTicker);
      const symbolData: OratsFileFormat[] = [];
    
      while(rowTicker === symbol) {
        symbolData.push(data[index]);
        index++;
        rowTicker = data[index].ticker;
        // console.log('dM gSDM while index/foundTicker: ', index, rowTicker);
      }
      // console.log('dM gSDM final symbol data slice for: ', symbol);
      // console.table(symbolData.slice(950, 1000));
      // console.table(symbolData);
  
      this.dataBS.next(symbolData);
      // console.log('dM uL symbolData: ', this.dataBS.value);
  
      return symbolData;

    } else return;
  }

  generateDataMap(data: OratsFileFormat[], field: string) {
  }
  
  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
    let csvArr = [];  
    let numRecords = csvRecordsArray.length;
  
    for (let i = 1; i < numRecords; i++) {  
      let currentRecord = (<string>csvRecordsArray[i]).split(',');  
      if (currentRecord.length == headerLength) {  
        // if (currentRecord[0].trim() !== 'A' ) {break}
        let csvRecord: OratsFileFormat = {
          ticker: currentRecord[0].trim(),
          stkPx: currentRecord[1].trim(),
          expirDate: currentRecord[2].trim(),
          yte: currentRecord[3].trim(),
          strike: currentRecord[4].trim(),
          cValue: currentRecord[5].trim(),
          pValue: currentRecord[6].trim(),

        };  

        this.symbols.add(currentRecord[0].trim());
        this.expirations.add(currentRecord[2].trim());
        this.strikes.add(currentRecord[4].trim());
  
        csvArr.push(csvRecord);  
      }  
    }  

    // console.log('dM gDRAFCF symbols/expirations: ', this.symbols, this.expirations, this.strikes);
    return csvArr;  
  }  
  
  isValidCSVFile(file: any) {  
    console.log('dM iVCF is valid csv?: ', file.name.endsWith('.csv'));
    return file.name.endsWith(".csv");  
  }  
  
  getHeaderArray(csvRecordsArr: any) {  
    let headers = (<string>csvRecordsArr[0]).split(',');  
    let headerArray = [];  
    for (let j = 0; j < headers.length; j++) {  
      headerArray.push(headers[j]);  
    }  
    return headerArray;  
  }  
  
  fileReset() {  
    this.csvReader.nativeElement.value = "";  
    this.records = [];  
  }  
}  
