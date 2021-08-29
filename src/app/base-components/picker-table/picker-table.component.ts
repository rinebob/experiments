import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { PICKER_TABLE_DATA } from 'src/assets/picker-table-data';

@Component({
  selector: 'vz-picker-table',
  templateUrl: './picker-table.component.html',
  styleUrls: ['./picker-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickerTableComponent implements OnInit {

  readonly data = PICKER_TABLE_DATA;

  constructor() { }

  ngOnInit(): void {
    for (const datum of this.data) {
      console.log('pT ngOI datum: ', datum);
    }
    
  }

}
