import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { PICKER_TABLE_DATA } from 'src/assets/picker-table-data';

interface PickerSymbol {
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

  readonly dataSource: PickerSymbol[] = PICKER_TABLE_DATA;

  columnsToRender = ['symbol', 'company', 'price', 'implVolty'];

  constructor() { }

  ngOnInit(): void {
    for (const datum of this.dataSource) {
      console.log('pT ngOI datum: ', datum);
    }
    
  }



}
