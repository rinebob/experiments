import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';  
import { BehaviorSubject, Observable } from 'rxjs';
import { OratsFileFormat } from 'src/app/common/interfaces_orats';
import { SYMBOLS } from 'src/app/common/constants';
  
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

  ngOnInit() {
    
  }

  uploadListener($event: any): void {  
    console.log('dM uL upload listener called. event: ', $event);
    
    let text = [];  
    let files = $event.srcElement.files;  
    console.log('dM uL files: ', $event.srcElement.files);
    
    console.log('dM uL calling is valid file');
    
    
    if (this.isValidCSVFile(files[0])) {  
      console.log('dM uL in valid file block. files[0]: ', files[0]);
  
      let input = $event.target;  
      let reader = new FileReader();  
      reader.readAsText(input.files[0]);  
  
      reader.onload = () => {  
        let csvData = reader.result;  
        // console.log('dM uL csv data: ', csvData);
        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);  
        // console.log('dM uL csvRecordsArray[1000]: ', csvRecordsArray[1000]);
        
        let headersRow = this.getHeaderArray(csvRecordsArray);  
        // console.log('dM uL headersRow: ', headersRow);
        
        // this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);  
        const records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, headersRow.length);  
        // this.dataBS.next(records.slice(0, 10));
        // console.log('dM uL records: ', this.dataBS.value);

        const symbolsMap = this.generateSymbolsDataMap(records);

      };  
  
      reader.onerror = function () {  
        console.log('error is occured while reading file!');  
      };  
  
    } else {  
      alert("Please import valid .csv file.");  
      this.fileReset();  
    }  
  }  

  // symbolsDataMap 
  // key: symbol value: expirationsData: ExpirationsMap

  // expirationsMap
  // key: expiration: string, value: strikesData: StrikesMap

  // strikesMap
  // key: strike: string, value: data: OratsStrikeData

  // OratsStrikeData
  // metadata, data

//   export interface StrikeMetadata {
//     underlyingSymbol: string;
//     optionSymbol: string;
//     expirationDate: string;
//     strike: string;
// }

// export interface OratsDatum {
//     date: string;
//     data: OratsFileFormat;
// }

// export interface OratsStrikeData {
//     metadata: StrikeMetadata;
//     data: OratsDatum[];
// }

  generateSymbolsDataMap(data: OratsFileFormat[]) {

    // const symbolsForData = SYMBOLS;
    // const symbolsForData = [SYMBOLS[1]];
    const symbolsForData = [...SYMBOLS.slice(10, 12)];
    const symbolsDataMap = new Map<string, OratsFileFormat>();

    

    for (const symbol of symbolsForData) {
      console.log('-----------------------------');
      console.log('dM gSDM symbol for data: ', symbol);

      const symbolData = this.getDataForSymbol(data, symbol);

      let expiration, strike = '';

      
      // ALTERNATIVE 1 - CREATE JS MAPS FOR SYMBOLS/EXPIRATIONS/STRIKES/DATA

      // loop through data row by row
      // create a StrikeMetaDataObject including option symbol
      // create an object with date and orats data.  this is an OratsDatum object
      // each row of each spreadsheet is one OratsDatum object
      // the very first time we run this, none of the symbol/expiration/strike maps will exist
      // so we'll have to create them


      // if symbol in symbolsMap
      // yes
          
          // if expiration in symbolMap keys
          // yes
              // if strike in expirationMap keys
              // yes
                  // get the data series object
                  // append the OratsDatum object

              // no strike
                  // create an OratsStrikeData object with the Metadata and an empty data series
                  // push the oratsDatum object into the data series
                  // set strikesMap entry for strike and orats strike data object


          // no expiration
              // run no strike tasks
              // set expirationsMap with new entry expiration and strikesMap object


      // no symbol
          // run no strikes tasks
          // run no expiration tasks
          // set symbols map with new entry symbol and expirationsMap

      // *** this alternative results in a large js Map object that is deeply nested ***
          
    // ALTERNATIVE 2 - CREATE FLAT DIRECTORY OF ALL OPTION SYMBOL DATA - NO NESTING

    // for each spreadsheet:
      // only capture data for target symbols
      // for each row, create an option symbol string
      // create a data series object for that symbol (OratsStrikeData)
      // send an insert/update request to backend to append the object
      // backend must figure out how to handle the request
          // create new metadata object and data series
          // append new data to existing data series
      

      // each row in a spreadsheet will be a different symbol
      // a time series is created by adding one data point from each spreadsheet to the symbol data array
      // after the first data ingestion to backend, most symbols will exist, but new ones will be added 
      // as new expirations are released and new stocks are added/subtracted from the focus list

      // *** this alternative results in a large flat collection of option symbol data documents ***
      // key = option symbol
      // value = OratsStrikeData object
      
      


      // we only have one day of fake data (the orats demo spsht)
      // to create any kind of data series we need > 1 spsht
      // need to clone existing demo into new dates
      // data can be the same just need the files to access



    }


  }

  getDataForSymbol(data: OratsFileFormat[], symbol: string) {
    let index = data.findIndex(datum => datum.ticker === symbol);
    let rowTicker = data[index].ticker;

    // console.log('dM gSDM init index/foundTicker: ', index, rowTicker);

    const symbolData: OratsFileFormat[] = [];

    while(rowTicker === symbol) {
      symbolData.push(data[index]);
      index++;
      rowTicker = data[index].ticker;
      // console.log('dM gSDM while index/foundTicker: ', index, rowTicker);
      
    }
    
    // console.log('dM gSDM final symbol data slice for: ', symbol);
    // console.table(symbolData.slice(100, 1000));
    // console.table(symbolData);

    this.dataBS.next(symbolData);
    // console.log('dM uL symbolData: ', this.dataBS.value);

    return symbolData;


  }

  generateDataMap(data: OratsFileFormat[], field: string) {

  }
  
  getDataRecordsArrayFromCSVFile(csvRecordsArray: any, headerLength: any) {  
    let csvArr = [];  
    let numRecords = csvRecordsArray.length;
    // numRecords = 20;
  
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