
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit,  } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { ChartDataService } from '../services/chart-data.service';

import * as av from '../services/av/av_interfaces';
import * as actions from '../store/actions';
import * as selectors from '../store/selectors';

import { Equity, GalleryChartMode, GalleryViewOption, NavBarSelection, OHLCData, PickerTableData } from '../common/interfaces';
import { ChartSetting, SymbolTimeSetting } from '../common/interfaces_chart';
import { Option } from '../common/option_interfaces';
import { BaseSetting, DataSetting } from '../services/av/av_interfaces';
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

  equity$: Observable<Equity> = this.store.select(selectors.selectEquity);
  option$: Observable<Option> = this.store.select(selectors.selectOption);
  chartSetting$: Observable<ChartSetting> = this.store.select(selectors.selectChartSettings);
  dataSetting$: Observable<DataSetting> = this.store.select(selectors.selectDataSettings);
  avDataSetting$: Observable<BaseSetting> = this.store.select(selectors.selectAvDataSettings);

  constructor(private readonly chartDataService: ChartDataService,
              private readonly store: Store) {
    // this.mainChartData$.pipe(takeUntil(this.destroy))
    // .subscribe(data => console.log('bCV ctor mainChartData$: ', data));
   }

  ngOnInit(): void {
    // console.log('bCV ngOI handle gallery selection fullscreen');d
    this.handleGallerySelection(GalleryViewOption.FULLSCREEN);

    this.equity$.pipe(takeUntil(this.destroy)).subscribe(equity => console.log('bCV ngOI equity: ', equity));
    this.option$.pipe(takeUntil(this.destroy)).subscribe(option => console.log('bCV ngOI option: ', option));
    this.chartSetting$.pipe(takeUntil(this.destroy)).subscribe(chartSetting => console.log('bCV ngOI chartSetting: ', chartSetting));
    this.dataSetting$.pipe(takeUntil(this.destroy)).subscribe(dataSetting => console.log('bCV ngOI dataSetting: ', dataSetting));
    this.avDataSetting$.pipe(takeUntil(this.destroy)).subscribe(avDataSetting => console.log('bCV ngOI avDataSetting: ', avDataSetting));

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

   // convert PickerTableData object to Equity object
   // dispatch equity to store
  //  this.store.dispatch(actions.setEquity())
  

  }

  handleGallerySelection(selection: GalleryViewOption) {
    // console.log('bCV hNS selection: ', selection);
    // console.log('bCV hNS t.gSBS initial: ', this.gallerySelectionBS.value);
    // this.gallerySelectionBS.next(selection);
    this.gallerySelectionBS.next(GalleryViewOption.FULLSCREEN);
    // console.log('bCV hNS t.gSBS after next: ', this.gallerySelectionBS.value);
    
  }

  updateChartSettings(chartSetting: ChartSetting) {
    // dispatch the settings to the store
    // or dispatch directly from ChartSettings component

    this.store.dispatch(actions.setChartSetting({chartSetting}));
  }

  updateDataSettings(symbolTimeSetting: SymbolTimeSetting) {
    // dispatch the settings to the store
    // or dispatch directly from ChartSettings component

    this.store.dispatch(actions.setDataSetting({symbolTimeSetting}));
    
    // call get data to update chartData obs
    // this.getData(event);

  }

  updateAvDataSettings(baseSetting: av.BaseSetting) {
    console.log('bCV uADS av data settings: ', baseSetting)
    // dispatch the settings to the store
    // or dispatch directly from ChartSettings component

    this.store.dispatch(actions.setAvDataSetting({baseSetting}));

    // call get data to update chartData obs
    // this.getData(event);

  }

  getData(event: DataSetting) {
    console.log('bCV gD event: ', event);
    this.mainChartData$ = this.chartDataService.getAlphavantageOHLCData(event);
    
  }


}
