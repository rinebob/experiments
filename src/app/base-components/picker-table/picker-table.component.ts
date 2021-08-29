import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'vz-picker-table',
  templateUrl: './picker-table.component.html',
  styleUrls: ['./picker-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickerTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
