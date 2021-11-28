
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit,  } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

import { ChartDataService } from '../services/chart-data.service';

import * as av from '../services/av/av_interfaces';
import * as actions from '../store/actions';
import * as selectors from '../store/selectors';

import { Equity, GalleryChartMode, GalleryViewOption, NavBarSelection, OHLCData, PickerTableData } from '../common/interfaces';
import { ChartMoveEvent, ChartSetting, SymbolTimeSetting, TimeFrame } from '../common/interfaces_chart';
import { Option } from '../common/option_interfaces';
import { BaseSetting, DataSetting } from '../services/av/av_interfaces';
import { DEFAULT_PICKER_TABLE_DATUM, GalleryNavSelections } from '../common/constants';
import { PICKER_TABLE_DATA } from 'src/assets/picker-table-data';

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
  equityData$: Observable<OHLCData[]> = this.store.select(selectors.selectEquityData);
  option$: Observable<Option> = this.store.select(selectors.selectOption);
  chartSetting$: Observable<ChartSetting> = this.store.select(selectors.selectChartSettings);
  symbolTimeSetting$: Observable<SymbolTimeSetting> = this.store.select(selectors.selectSymbolTimeSettings);
  avBaseSetting$: Observable<BaseSetting> = this.store.select(selectors.selectAvBaseSettings);

  constructor(private readonly chartDataService: ChartDataService,
              private readonly store: Store) {
    // this.mainChartData$.pipe(takeUntil(this.destroy))
    // .subscribe(data => console.log('bCV ctor mainChartData$: ', data));

    combineLatest([this.symbolTimeSetting$, this.avBaseSetting$]).pipe(
      map(([symbolTimeSetting, avBaseSetting] ) => {
        const dataSetting =  {...symbolTimeSetting, ...avBaseSetting}
        // this.store.dispatch(actions.fetchEquityData({dataSetting})) 
        // console.log('bCV ctor combLatest.  dataSetting: ', dataSetting)
        return dataSetting;


      })
      // switchMap(dataSetting => {
      //   this.store.dispatch(actions.fetchEquityData({dataSetting})) 
      // })
    ).subscribe(
      dataSetting => {
        // console.log('bCV ctor dispatch fetch equity data.  dataSetting: ', dataSetting);
        this.store.dispatch(actions.bCVctorfetchEquityData({dataSetting})) 
      });
      
    }

  ngOnInit(): void {
    // console.log('bCV ngOI handle gallery selection fullscreen');d
    this.handleGallerySelection(GalleryViewOption.FULLSCREEN);

    // this.equity$.pipe(takeUntil(this.destroy)).subscribe(equity => console.log('bCV ngOI equity: ', equity));
    // this.equityData$.pipe(takeUntil(this.destroy)).subscribe(equityData => {
      // console.log('bCV ngOI equityData length: ', equityData.length)
      // console.table(equityData);
    // });
    // this.option$.pipe(takeUntil(this.destroy)).subscribe(option => console.log('bCV ngOI option: ', option));
    // this.chartSetting$.pipe(takeUntil(this.destroy)).subscribe(chartSetting => console.log('bCV ngOI chartSetting: ', chartSetting));
    // this.symbolTimeSetting$.pipe(takeUntil(this.destroy)).subscribe(dataSetting => console.log('bCV ngOI dataSetting: ', dataSetting));
    // this.avBaseSetting$.pipe(takeUntil(this.destroy)).subscribe(avDataSetting => console.log('bCV ngOI avDataSetting: ', avDataSetting));

  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  // handleSymbolSelection(selectedSymbol: string) {
  handleSymbolSelection(selectedSymbol: SymbolTimeSetting) {
  //  console.log('bCV hSS selectedSymbol: ', selectedSymbol);
   // dispatch symbol to store
  //  const symbolData = PICKER_TABLE_DATA.find(item => item.symbol === selectedSymbol);
   console.log('bCV hSS selectedSymbol: ', selectedSymbol);
   this.mainChartSymbolBS.next(selectedSymbol.symbol);

   const symbolTime: SymbolTimeSetting = {
     symbol: selectedSymbol.symbol,
     timeFrame: TimeFrame.DAILY
   };

   this.updateSymbolTimeSettings(symbolTime);
  

  }

  handleGallerySelection(selection: GalleryViewOption) {
    // console.log('bCV hNS selection: ', selection);
    // console.log('bCV hNS t.gSBS initial: ', this.gallerySelectionBS.value);
    // this.gallerySelectionBS.next(selection);
    this.gallerySelectionBS.next(GalleryViewOption.FULLSCREEN);
    // console.log('bCV hNS t.gSBS after next: ', this.gallerySelectionBS.value);
    
  }

  handleChartMoveEvent(event: ChartMoveEvent) {
    // console.log('bCV hCME chart move event: ', event);

  }

  updateChartSettings(chartSetting: ChartSetting) {
    // dispatch the settings to the store
    // or dispatch directly from ChartSettings component
    console.log('bCV uADS dispatch chartSetting: ', chartSetting);

    this.store.dispatch(actions.setChartSetting({chartSetting}));
  }

  updateSymbolTimeSettings(symbolTimeSetting: SymbolTimeSetting) {
    // dispatch the settings to the store
    // or dispatch directly from ChartSettings component

    console.log('bCV uSTS dispatch symbolTimeSetting: ', symbolTimeSetting);
    
    this.store.dispatch(actions.setSymbolTimeSetting({symbolTimeSetting}));
    
    // call get data to update chartData obs
    // this.getData(symbolTimeSetting);
    
  }
  
  updateAvBaseSettings(baseSetting: av.BaseSetting) {
    console.log('bCV uADS dispatch baseSetting: ', baseSetting);
    
    // dispatch the settings to the store
    // or dispatch directly from ChartSettings component

    this.store.dispatch(actions.setAvBaseSetting({baseSetting}));

    // call get data to update chartData obs
    // this.getData(event);

  }

  getData(dataSetting: DataSetting) {
    console.log('bCV gD dataSetting: ', dataSetting);
    // old way - pre ngrx
    // this.mainChartData$ = this.chartDataService.getAlphavantageOHLCData(event);

    // with ngrx
    // dispatch fetchEquityData action with data setting object as payload
    this.store.dispatch(actions.bCVctorfetchEquityData({dataSetting}));
    
  }


}
