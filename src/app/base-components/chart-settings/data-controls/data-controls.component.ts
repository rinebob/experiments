import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import { SymbolTimeSetting, TimeFrame } from '../../../common/interfaces_chart';
import { DEFAULT_SYMBOL, DEFAULT_SYMBOL_TIME_SETTING } from 'src/app/common/constants';


import * as av from '../../../services/av/av_interfaces';

// const DEFAULT_SYMBOL = 'TSLA';

// const DEFAULT_SYMBOL_TIME_SETTING: SymbolTimeSetting = {
//   symbol: DEFAULT_SYMBOL,
//   timeFrame: TimeFrame.DAILY,
//   // startDate: new Date(),
//   // endDate: new Date(),

// };


@Component({
  selector: 'exp-data-controls',
  templateUrl: './data-controls.component.html',
  styleUrls: ['./data-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataControlsComponent implements OnChanges, OnInit, OnDestroy {
  readonly destroy = new Subject<void>();

  @Input() symbol: string;
  @Input() settings: SymbolTimeSetting = DEFAULT_SYMBOL_TIME_SETTING;
  @Output() dataSettings = new EventEmitter<SymbolTimeSetting>();

  readonly timeframes = Object.values(TimeFrame);

  readonly settingsForm: FormGroup;
  settingsFormValues: SymbolTimeSetting = DEFAULT_SYMBOL_TIME_SETTING;
  dataRequest: SymbolTimeSetting;

  symbolControl = new FormControl(DEFAULT_SYMBOL);
  timeFrameControl = new FormControl(TimeFrame.DAILY);
  // startDateControl = new FormControl(new Date());
  // endDateControl = new FormControl(new Date());

  constructor() { 
    this.settingsForm = new FormGroup({
      symbol: this.symbolControl,
      timeFrame: this.timeFrameControl,
      // startDate: this.startDateControl,
      // endDate: this.endDateControl,
    });

    this.settingsForm.valueChanges.pipe(takeUntil(this.destroy))
      .subscribe(values => {
        this.settingsFormValues = values;
        // console.log('cS ctor t.sFV values: ', this.settingsFormValues);
        this.dataRequest = this.generateDataRequest();
        // console.log('cS ctor generated request: ', this.dataRequest);
        
      });

  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log('cS ngOC called.  changes: ', changes);
    if (changes['symbol'] && changes['symbol'].currentValue) {
      // console.log('cS ngOC changes symbol: ', changes['symbol'].currentValue);
      const symbol = changes['symbol'].currentValue;
      // console.log('cS ngOC symbol: ', symbol);
      this.symbolControl.setValue(symbol);
      // this.submit();
    }

    if (changes['settings'] && changes['settings'].currentValue) {
      // console.log('cS ngOC changes settings: ', changes['settings'].currentValue);
      const settings = changes['settings'].currentValue;
      // console.log('cS ngOC settings: ', settings);
      this.symbolControl.setValue(settings.symbol);
      this.timeFrameControl.setValue(settings.timeFrame);
    }

  }

  ngOnInit(): void {
    this.settingsForm.patchValue({
      'symbol': DEFAULT_SYMBOL_TIME_SETTING.symbol,
      'timeFrame': DEFAULT_SYMBOL_TIME_SETTING.timeFrame,
    });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  generateDataRequest() {
    const dataRequest: av.DataSetting = {
      symbol: this.settingsFormValues.symbol,
      timeFrame: this.settingsFormValues.timeFrame,
      // startDate: this.settingsFormValues.startDate,
      // endDate: this.settingsFormValues.endDate,
      
    };

    // console.log('cS gDR data request: ', dataRequest);

    return dataRequest;

  }

  submit() {
    // const dataRequest = this.generateDataRequest();
    this.dataSettings.emit(this.dataRequest);
    console.log('dC s data controls form submitted.  Data request: ', this.dataRequest);
  }

}
