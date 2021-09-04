import { Component, EventEmitter, OnInit, ChangeDetectionStrategy, Output } from '@angular/core';


import { PICKER_TABLE_DATA } from 'src/assets/picker-table-data';

interface SymbolData {
  symbol: string;
  company: string;
  price: number;
  implVolty: number;

}

@Component({
  selector: 'vz-picker-table',
  templateUrl: './picker-table.component.html',
  styleUrls: ['./picker-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickerTableComponent implements OnInit {
  @Output() selectedSymbol = new EventEmitter<string>();

  readonly dataSource: SymbolData[] = PICKER_TABLE_DATA;

  columnsToRender = ['symbol', 'company', 'price', 'implVolty'];

  constructor() { }

  ngOnInit(): void {
    for (const datum of this.dataSource) {
      // console.log('pT ngOI datum: ', datum);
    }
    
  }

  handleSymbolClick(symbol: string) {
    console.log('pT hSC symbol: ', symbol);
    this.selectedSymbol.emit(symbol);

  }



}
