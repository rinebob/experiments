import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { GalleryChartMode, PickerTableData } from '../common/interfaces';
import { PICKER_TABLE_DATA } from 'src/assets/picker-table-data';
import { DEFAULT_PICKER_TABLE_DATUM, GalleryNavSelections } from '../common/constants';

@Component({
  selector: 'vz-base-components-view',
  templateUrl: './base-components-view.component.html',
  styleUrls: ['./base-components-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseComponentsViewComponent implements OnInit {

  mainChartBS = new BehaviorSubject<PickerTableData>(DEFAULT_PICKER_TABLE_DATUM);
  mainChart$: Observable<PickerTableData> = this.mainChartBS;

  galleryDataBS = new BehaviorSubject<PickerTableData[]>(PICKER_TABLE_DATA);
  galleryData$: Observable<PickerTableData[]> = this.galleryDataBS;

  pickerDataBS = new BehaviorSubject<PickerTableData[]>(PICKER_TABLE_DATA);
  pickerData$: Observable<PickerTableData[]> = this.pickerDataBS;

  galleryNavSelections = GalleryNavSelections

  constructor() { }

  ngOnInit(): void {
  }

  handleSymbolSelection(selectedSymbol: string) {
   console.log('bCV hSS selectedSymbol: ', selectedSymbol);
   // dispatch symbol to store
   const symbolData = PICKER_TABLE_DATA.find(item => item.symbol === selectedSymbol);
  //  console.log('bCV hSS symbol data: ', symbolData);
   this.mainChartBS.next(symbolData);

  }


}
