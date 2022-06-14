import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { OratsFileFormat } from 'src/app/common/interfaces_orats';

export interface CsvState {
    allRecords: OratsFileFormat[];
    recordsForSymbols: OratsFileFormat[];
    tradedStrikesDataObject: Object;
    text: string;
}

export const CSV_STATE_INITIALIZER = {
    allRecords: [],
    recordsForSymbols: [],
    tradedStrikesDataObject: {},
    text: '',
}

@Injectable()
export class CsvStore extends ComponentStore<CsvState> {
    constructor() {
        super(CSV_STATE_INITIALIZER);
    }

    readonly setAllRecords = this.updater((state, allRecords: OratsFileFormat[]) => ({
        ...state,
        allRecords
    }));

    readonly setRecordsForSymbols = this.updater((state, records: OratsFileFormat[]) => ({
        ...state,
        records
    }));

    readonly setTradedStrikesDataObject = this.updater((state, dataObject: Object) => ({
        ...state,
        dataObject
    }));

    readonly setText = this.updater((state, text: string) => ({
        ...state,
        text
    }));

    readonly allRecords$ = this.select((allRecords) => {allRecords});

    readonly recordsForSymbols$ = this.select((recordsForSymbols) => {recordsForSymbols});

    readonly tradedStrikesDataObject$ = this.select((tradedStrikesDataObject) => {tradedStrikesDataObject});

    readonly text$ = this.select((text) => {text});



}

