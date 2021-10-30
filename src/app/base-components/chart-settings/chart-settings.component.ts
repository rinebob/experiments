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

  @Input() iSymbol: string;
  @Input() iChartSettings: ChartSetting = DEFAULT_CHART_SETTING;
  @Input() iDataSettings: SymbolTimeSetting = DEFAULT_SYMBOL_TIME_SETTING;
  @Input() iAvDataSettings: av.BaseSetting = DEFAULT_AV_BASE_DATA_SETTING;
  @Output() oChartSettings = new EventEmitter<ChartSetting>();
  @Output() oDataSettings = new EventEmitter<SymbolTimeSetting>();
  @Output() oAvDataSettings = new EventEmitter<av.BaseSetting>();

  chartSettingsBS = new BehaviorSubject<ChartSetting>(DEFAULT_CHART_SETTING);
  chartSettings$: Observable<ChartSetting> = this.chartSettingsBS;
  dataSettingsBS = new BehaviorSubject<SymbolTimeSetting>(DEFAULT_SYMBOL_TIME_SETTING);
  dataSettings$: Observable<SymbolTimeSetting> = this.dataSettingsBS;
  avDataSettingsBS = new BehaviorSubject<av.BaseSetting>(DEFAULT_AV_BASE_DATA_SETTING);
  avDataSettings$: Observable<av.BaseSetting> = this.avDataSettingsBS;
  
  chartRequest: ChartSetting;
  dataRequest: av.DataSetting;

  constructor() {
  
  }

  ngOnChanges(changes: SimpleChanges) {
  
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

  setScaleType(scaleType: ScaleType) {
    console.log('cS sST scale type: ', scaleType);
    
    this.handleChartSettingsChange(this.chartSettingsBS.value);
  }
  
  setChartType(chartType: ChartType) {
    console.log('cS sCT chart type: ', chartType);

    this.handleChartSettingsChange(this.chartSettingsBS.value);

  }

  handleChartSettingsChange(settings: ChartSetting) {
    console.log('cS hDSC called');
    // console.log('cS hDSC called new settings: ', settings);

  }

  handleDataSettingsChange(settings: SymbolTimeSetting) {
    console.log('cS hDSC new settings: ', settings);

  }

  handleAvDataSettingsChange(settings: av.BaseSetting) {
    console.log('cS hADSC new av settings: ', settings);

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
