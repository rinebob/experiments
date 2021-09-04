import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import {PickerTableData } from '../common/interfaces';
import { PICKER_TABLE_DATA } from 'src/assets/picker-table-data';

@Component({
  selector: 'vz-base-components-view',
  templateUrl: './base-components-view.component.html',
  styleUrls: ['./base-components-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseComponentsViewComponent implements OnInit {

  picker = true;
  charts = false;
  carousel = false;

  galleryDataBS = new BehaviorSubject<PickerTableData[]>(PICKER_TABLE_DATA);
  galleryData$: Observable<PickerTableData[]> = this.galleryDataBS;

  pickerDataBS = new BehaviorSubject<PickerTableData[]>(PICKER_TABLE_DATA);
  pickerData$: Observable<PickerTableData[]> = this.pickerDataBS;

  constructor() { }

  ngOnInit(): void {
  }

  handleSymbolSelection(symbol: string) {
   console.log('bCV hSS symbol: ', symbol);
   // dispatch symbol to store

  }

  handleComponentSelection(component: string) {
    console.log('bCV hSS component: ', component);
    switch(component) { 
      case 'charts': { 
         this.showCharts();
         break; 
      } 
      case 'carousel': { 
         this.showCarousel();
         break; 
      } 
      case 'picker': { 
        this.showPicker();
        break; 
      }
      default: { 
         console.log('bCV hCS default dude wtf you doin here???')
         break; 
      } 
   } 

  }

  showPicker() {
    this.picker = true;
    this.charts = false;
    this.carousel = false;

  }
  showCharts() {
    this.picker = false;
    this.charts = true;
    this.carousel = false;

  }
  showCarousel() {
    this.picker = false;
    this.charts = false;
    this.carousel = true;

  }

}
