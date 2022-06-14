import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { OratsFileFormat, StrikesByExpiration, StrikesWithExpirations } from 'src/app/common/interfaces_orats';
import { DAYS_MAP, SYMBOLS } from 'src/app/common/constants';
import { CsvService } from 'src/app/services/csv/csv.service';

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

  symbol = new FormControl('');
  ticker = new FormControl('');

  allTickers = [];

  fileName = 'test.csv';
  
  constructor(private csvService: CsvService) {}

  ngOnInit() {}

  uploadListener($event: any): void {  
    // console.log('dM uL upload listener called. event: ', $event);
    
    let text = [];  
    let files = $event.srcElement.files;  
    // console.log('dM uL files: ', $event.srcElement.files);
    
    if (this.isValidCSVFile(files[0])) {  
      // console.log('dM uL in valid file block. files[0]: ', files[0]);
  
      let input = $event.target;  
      let reader = new FileReader();  
      reader.readAsText(input.files[0]);  
  
      reader.onload = () => {  
        let csvData = reader.result;
    
        this.csvService.setCsvData(csvData);

        console.log('dM uL csvData sent to service');  
      };  
  
      reader.onerror = function () {  
        console.log('error is occured while reading file!');  
      };  
  
    } else {  
      alert("Please import valid .csv file.");  
      this.fileReset();  
    }  
  }  

  showDataFor() {
    const ticker = this.ticker.value;
    // console.log('dM gTSM ticker/all tickers: ', ticker, this.allTickers);
    // console.log('dM gTSM expirations and strikes for ticker: ', this.tradedStrikes.get(ticker));
  }
  
  isValidCSVFile(file: any) {  
    console.log('dM iVCF is valid csv?: ', file.name.endsWith('.csv'));
    return file.name.endsWith(".csv");  
  }  
  
  fileReset() {  
    this.csvReader.nativeElement.value = "";  
    this.records = [];  
  }  
}  
