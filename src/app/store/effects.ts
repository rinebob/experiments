import { Injectable } from "@angular/core";
import {Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from "rxjs";
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

import { ChartDataService } from "../services/chart-data.service";
import * as actions from '../store/actions';

@Injectable()
export class AppEffects {

    onFetchEquityData$ = createEffect(() => 
        this.actions$.pipe(
            ofType(actions.fetchEquityData),
            switchMap((action) => {
                console.log('e oFED$ sent setting: ', action.dataSetting);
                return this.chartDataService.getAlphavantageOHLCData(action.dataSetting).pipe(
                    map(response => response),
                    tap(response => console.log('e oFED$ response: ', response)),
                    
                )

            })
        ),
        {dispatch: false}
    );

    constructor(
        private actions$: Actions, 
        private chartDataService: ChartDataService
        ) {}

}