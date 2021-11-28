import { Injectable } from "@angular/core";
import {Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from "rxjs";
import { catchError, map, mergeMap, switchMap, shareReplay, tap } from 'rxjs/operators';

import { ChartDataService } from "../services/chart-data.service";
import * as actions from '../store/actions';
import {MSFTData_start_99_1101} from '../../assets/data/MSFT_21-1112';

@Injectable()
export class AppEffects {

    // onFetchEquityData$ = createEffect(() => 
    //     this.actions$.pipe(
    //         ofType(actions.fetchEquityData),
    //         switchMap((action) => {
    //             // console.log('e oFED$ sent setting: ', action.dataSetting);
    //             return this.chartDataService.getAlphavantageOHLCData(action.dataSetting).pipe(
    //                 map(response => {
    //                     console.log('e oFED$ response: ', response)
    //                     // return response;
    //                     return actions.setEquityData({equityData: response});
    //                 }),
    //                 catchError((error) => {
    //                     console.log('e oFED$ error: ', error);
    //                     return of(EMPTY)
    //                 } )
    //                 // tap(response => console.log('e oFED$ response: ', response)),
                    
    //             )

    //         })
    //     ),
    //     {dispatch: false}
    // );

    onFetchEquityData$ = createEffect(() => 
        this.actions$.pipe(
            // ofType(actions.bCVctorfetchEquityData || actions.sCgDfetchEquityData),
            ofType(actions.sCgDfetchEquityData),
            switchMap((action) => {
                // console.log('e oFED$ sent setting: ', action.dataSetting);
                return this.chartDataService.getAlphavantageOHLCData(action.dataSetting)
                // return of([...MSFTData])
                .pipe(
                    // tap(resp => console.log('e oFED$ response: ', resp)),
                    map(response => (actions.setEquityData({equityData: [...response]}))),
                    catchError(() => EMPTY),
                    shareReplay(1),
                   
                    
                )

            })
        ),
        
    );

    constructor(
        private actions$: Actions, 
        private chartDataService: ChartDataService
        ) {}

}