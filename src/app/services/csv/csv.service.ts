import { Injectable } from '@angular/core';
import { CsvStore } from './csv-store';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  constructor(readonly csvStore: CsvStore) { }

  setText(text: string) {
    this.csvStore.setText(text);

  };

  getText() {
    return this.csvStore.text$;

  };

    // public
  // generate raw data records array from csv file
  // all symbols or only from list

  // public
  // generate traded strikes data array


  // helper methods
  // generate expirations by traded strike

  // get expirations from strike expirations object



}
