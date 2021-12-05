import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import {map} from 'rxjs/operators'

import * as av from '../services/av/alphavantage_utils'
import { DataSetting, OutputSize, Slice, Adjusted, DataType } from '../services/av/av_interfaces';
import { OHLCData } from '../common/interfaces';
import { TimeFrame } from '../common/interfaces_chart';
import { Alphavantage_API_KEY } from 'src/secrets/secrets';
import {tslaData} from '../../assets/data/tsla_21-0917';
import { MSFTData_start_99_1101} from '../../assets/data/MSFT_21-1112';
import { MSFTData_sample} from '../../assets/data/MSFT_21-1112_sample';

@Injectable({
  providedIn: 'root'
})
export class ChartDataService {

  constructor(private http: HttpClient) { }

  getAlphavantageData(settings: DataSetting) {
    // console.log('cDS gAID settings: ', settings);
    const reqString = av.generateRequestString(settings);
    const response = this.http.get(reqString);
    // console.log('cDS gAID data: ', data);

    // const data = alphaUtils.convertIntradayToGenericSeries(response);

    return response;
  }

  

//  const dataRequest: DataSetting =  {
//     symbol: "TSLA",
//     timeFrame: TimeFrame.DAILY,
//     outputSize: OutputSize.COMPACT,
//     slice: Slice.YEAR1MONTH1,
//     adjusted: Adjusted.ADJUSTED,
//     dataType: DataType.JSON,
// }

  getAlphavantageOHLCData(settings: DataSetting): Observable<OHLCData[]> {
    const reqString = av.generateRequestString(settings);
    // console.log('cDS gAOD input settings: ', settings);
    // console.log('cDS gAOD reqString: ', reqString);

    //=============================
    // working code - DO NOT DELETE
    // note: alpha vantage rate limits to 5 req/min and 500 req/day
    // use return of(data) as replacement to limit calls
    // return this.http.get<OHLCData[]>(reqString).pipe(
    //   map(resp => {
    //     console.log('cDS gAOD http response: ', resp);
    //     const data = av.convertAvToVz(resp);
    //     console.log('cDS gAOD http data: ', data);
    //     return data;
    //   })
    // );
    //=============================

    return of(MSFTData_start_99_1101).pipe(
    // return of(MSFTData_sample).pipe(
    // return of(tslaData).pipe(
      map(resp => {
        // console.log('cDS gAOD of fake data resp: ', resp);
        // const data = av.convertAvToVz(resp);
        const data = av.convertDates(resp);

        // console.log('cDS gAOD of tsla data: ', data);
        // return resp;
        return data;
      })
    );

  }

}
