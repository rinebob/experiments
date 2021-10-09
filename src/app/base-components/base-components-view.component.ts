
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit,  } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

import { ChartDataService } from '../services/chart-data.service';

import { GalleryChartMode, GalleryViewOption, NavBarSelection, OHLCData, PickerTableData } from '../common/interfaces';
import { ChartSetting } from '../common/interfaces_chart';
import { DataSetting } from '../services/av/av_interfaces';
import { DEFAULT_PICKER_TABLE_DATUM, GalleryNavSelections } from '../common/constants';
import { PICKER_TABLE_DATA } from 'src/assets/picker-table-data';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'vz-base-components-view',
  templateUrl: './base-components-view.component.html',
  styleUrls: ['./base-components-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseComponentsViewComponent implements OnDestroy, OnInit {
  destroy = new Subject();

  gallerySelectionBS = new BehaviorSubject<GalleryViewOption | undefined>(undefined);
  gallerySelection$: Observable<GalleryViewOption> = this.gallerySelectionBS;

  mainChartSymbolBS = new BehaviorSubject<string>('');
  mainChartSymbol$: Observable<string> = this.mainChartSymbolBS;

  galleryDataBS = new BehaviorSubject<PickerTableData[]>(PICKER_TABLE_DATA);
  galleryData$: Observable<PickerTableData[]> = this.galleryDataBS;

  pickerDataBS = new BehaviorSubject<PickerTableData[]>(PICKER_TABLE_DATA);
  pickerData$: Observable<PickerTableData[]> = this.pickerDataBS;

  mainChartDataBS = new BehaviorSubject<OHLCData[]>([]);
  mainChartData$: Observable<OHLCData[]> = this.mainChartDataBS;

  galleryChartsDataBS = new BehaviorSubject<OHLCData[]>([]);
  galleryChartsData$: Observable<OHLCData[]> = this.galleryChartsDataBS;

  galleryNavSelections = GalleryNavSelections;

  constructor(private readonly chartDataService: ChartDataService) {
    // this.mainChartData$.pipe(takeUntil(this.destroy))
    // .subscribe(data => console.log('bCV ctor mainChartData$: ', data));
   }

  ngOnInit(): void {
    // console.log('bCV ngOI handle gallery selection fullscreen');
    this.handleGallerySelection(GalleryViewOption.FULLSCREEN)
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  handleSymbolSelection(selectedSymbol: string) {
  //  console.log('bCV hSS selectedSymbol: ', selectedSymbol);
   // dispatch symbol to store
  //  const symbolData = PICKER_TABLE_DATA.find(item => item.symbol === selectedSymbol);
   console.log('bCV hSS selectedSymbol: ', selectedSymbol);
   this.mainChartSymbolBS.next(selectedSymbol);
  

  }

  handleGallerySelection(selection: GalleryViewOption) {
    // console.log('bCV hNS selection: ', selection);
    // console.log('bCV hNS t.gSBS initial: ', this.gallerySelectionBS.value);
    // this.gallerySelectionBS.next(selection);
    this.gallerySelectionBS.next(GalleryViewOption.FULLSCREEN);
    // console.log('bCV hNS t.gSBS after next: ', this.gallerySelectionBS.value);
    
  }

  updateChartSettings(event: ChartSetting) {
    // dispatch the settings to the store
  }

  updateDataSettings(event: DataSetting) {
    // dispatch the settings to the store
    // call get data to update chartData obs
    this.getData(event);

  }

  getData(event: DataSetting) {
    console.log('bCV gD event: ', event);
    this.mainChartData$ = this.chartDataService.getAlphavantageOHLCData(event);
    
  }


}
