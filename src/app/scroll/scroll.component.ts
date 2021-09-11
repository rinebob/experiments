import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { PickerTableData } from '../common/interfaces';
import { PICKER_TABLE_DATA } from 'src/assets/picker-table-data';

@Component({
  selector: 'exp-scroll',
  templateUrl: './scroll.component.html',
  styleUrls: ['./scroll.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScrollComponent implements OnInit {

  galleryDataBS = new BehaviorSubject<PickerTableData[]>(PICKER_TABLE_DATA);
  galleryData$: Observable<PickerTableData[]> = this.galleryDataBS;

  items = Array.from({length: 100}).map((_, i) => `Dude #${i}`);

  constructor() { }

  ngOnInit(): void {
  }

}
