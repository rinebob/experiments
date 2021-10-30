import { Component, EventEmitter, OnChanges, OnInit, ChangeDetectionStrategy, Output, Input, SimpleChanges } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import {PickerTableData} from '../../common/interfaces';
import { PICKER_TABLE_DATA } from 'src/assets/picker-table-data';


@Component({
  selector: 'exp-picker-table',
  templateUrl: './picker-table.component.html',
  styleUrls: ['./picker-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickerTableComponent implements OnChanges, OnInit {
  @Input() pickerData: PickerTableData[] = [];
  // @Output() selectedSymbol = new EventEmitter<string>();
  @Output() selectedSymbol = new EventEmitter<PickerTableData>();

  // readonly dataSource: PickerTableData[] = PICKER_TABLE_DATA;
  readonly dataSource: PickerTableData[] = [];
  readonly dataSourceBS = new BehaviorSubject<PickerTableData[]>([]);
  readonly dataSource$: Observable<PickerTableData[]> = this.dataSourceBS;

  columnsToRender = ['symbol', 'company', 'price', 'implVolty'];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['pickerData']) {
      // console.log('pT ngOC changes-pickerData: ', changes['pickerData']);
      

      const data: PickerTableData[] = (changes['pickerData']).currentValue;
      this.dataSourceBS.next(data);
      for (const datum of this.dataSourceBS.value) {
        // console.log('pT ngOI datum: ', datum);
      }
    }

  }

  ngOnInit(): void {
   
    
  }

  handleSymbolClick(symbol: PickerTableData) {
    console.log('pT hSC symbol: ', symbol);
    this.selectedSymbol.emit(symbol);

  }



}
