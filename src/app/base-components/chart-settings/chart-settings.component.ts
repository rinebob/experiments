import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { ChartSetting, ChartType, ScaleType} from '../../common/interfaces_chart';
import { PanDistance, SymbolTimeSetting, TimeFrame, Zoom } from '../../common/interfaces_chart';
import { DEFAULT_AV_BASE_DATA_SETTING, DEFAULT_CHART_SETTING, DEFAULT_SYMBOL_TIME_SETTING } from 'src/app/common/constants';
import * as av from '../../services/av/av_interfaces';

@Component({
  selector: 'exp-chart-settings',
  templateUrl: './chart-settings.component.html',
  styleUrls: ['./chart-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartSettingsComponent implements OnChanges, OnInit, OnDestroy {
  readonly destroy = new Subject<void>();

  @Input() iChartSettings: ChartSetting = DEFAULT_CHART_SETTING;
  @Input() iSymbolTimeSettings: SymbolTimeSetting = DEFAULT_SYMBOL_TIME_SETTING;
  @Input() iAvBaseSettings: av.BaseSetting = DEFAULT_AV_BASE_DATA_SETTING;
  @Output() oChartSettings = new EventEmitter<ChartSetting>();
  @Output() oSymbolTimeSettings = new EventEmitter<SymbolTimeSetting>();
  @Output() oAvBaseSettings = new EventEmitter<av.BaseSetting>();

  chartSettingsBS = new BehaviorSubject<ChartSetting>(DEFAULT_CHART_SETTING);
  chartSettings$: Observable<ChartSetting> = this.chartSettingsBS;
  symbolTimeSettingsBS = new BehaviorSubject<SymbolTimeSetting>(DEFAULT_SYMBOL_TIME_SETTING);
  symbolTimeSettings$: Observable<SymbolTimeSetting> = this.symbolTimeSettingsBS;
  avBaseSettingsBS = new BehaviorSubject<av.BaseSetting>(DEFAULT_AV_BASE_DATA_SETTING);
  avBaseSettings$: Observable<av.BaseSetting> = this.avBaseSettingsBS;
  
  chartRequest: ChartSetting;
  dataRequest: av.DataSetting;

  constructor() {
  
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('cS ngOC changes: ', changes);

    if (changes['iChartSettings'] && changes['iChartSettings'].currentValue) {
      this.chartSettingsBS.next(changes['iChartSettings'].currentValue);
      
      
    }
    if (changes['iSymbolTimeSettings'] && changes['iSymbolTimeSettings'].currentValue) {
      this.symbolTimeSettingsBS.next(changes['iSymbolTimeSettings'].currentValue);
      
      
    }
    if (changes['iAvBaseSettings'] && changes['iAvBaseSettings'].currentValue) {
      this.avBaseSettingsBS.next(changes['iAvBaseSettings'].currentValue);
      

    }
  
  }

  ngOnInit(): void {
  
  }

  ngOnDestroy () {
    this.destroy.next();
    this.destroy.complete();
  }

  handleZoom(zoom: Zoom) {
    console.log('cS hP handle zoom: ', zoom);

  }

  handlePan(panDistance: PanDistance) {
    console.log('cS hP handle pan: ', panDistance);

  }

  setChartType(chartType: ChartType) {
    console.log('cS sCT chart type: ', chartType);
    const setting = {...this.chartSettingsBS.value}
    setting.chartType = chartType;
    
    this.handleChartSettingsChange(setting);


  }


  setScaleType(scaleType: ScaleType) {
    console.log('cS sST scale type: ', scaleType);
    const setting = {...this.chartSettingsBS.value}
    setting.scaleType = scaleType;
    
    this.handleChartSettingsChange(setting);
  }
  
  
  handleChartSettingsChange(settings: ChartSetting) {
    console.log('cS hCSC called.  chart settings: ', settings);
    this.chartSettingsBS.next(settings);
    this.oChartSettings.emit(settings);
    
  }
  
  handleSymbolTimeSettingsChange(settings: SymbolTimeSetting) {
    console.log('cS hDSC called.  data settings: ', settings);
    this.symbolTimeSettingsBS.next(settings);
    this.oSymbolTimeSettings.emit(settings);
    
    
  }
  
  handleAvBaseSettingsChange(settings: av.BaseSetting) {
    console.log('cS hADSC called.  av settings: ', settings);
    
    this.avBaseSettingsBS.next(settings);
    this.oAvBaseSettings.emit(settings);

  }

  generateDataRequest() {
    // const dataRequest: av.DataSetting = {
    //   symbol: this.settingsFormValues.symbol,
    //   timeFrame: this.settingsFormValues.timeFrame,
    //   // outputSize: this.settingsFormValues.outputSize,
    //   // slice: this.settingsFormValues.slice,
    //   // adjusted: this.settingsFormValues.adjusted,
    //   // dataType: this.settingsFormValues.dataType,
    //   outputSize: DEFAULT_CHART_SETTING.outputSize,
    //   slice: DEFAULT_CHART_SETTING.slice,
    //   adjusted: DEFAULT_CHART_SETTING.adjusted,
    //   dataType: DEFAULT_CHART_SETTING.dataType,
    // };

    // console.log('cS gDR data request: ', dataRequest);

    // return dataRequest;

  }

  generateChartReqest() {
    const chartRequest: ChartSetting = {

    }

    return chartRequest;

  }

  submit() {
    // const dataRequest = this.generateDataRequest();
    // this.dataSettings.emit(this.dataRequest);
    // console.log('cS submit form submitted.  Data request: ', this.dataRequest);
  }

}
