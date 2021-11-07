import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

import * as av from '../../../services/av/av_interfaces';
import { DEFAULT_AV_BASE_DATA_SETTING } from '../../../common/constants';

@Component({
  selector: 'exp-av-data-controls',
  templateUrl: './av-data-controls.component.html',
  styleUrls: ['./av-data-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvDataControlsComponent implements OnChanges, OnInit, OnDestroy {
  readonly destroy = new Subject<void>();

  @Input() settings: av.BaseSetting = DEFAULT_AV_BASE_DATA_SETTING;
  @Output() avBaseSettings = new EventEmitter<av.BaseSetting>();

  dataSettingsBS = new BehaviorSubject<av.BaseSetting>(DEFAULT_AV_BASE_DATA_SETTING);
  dataSettings$: Observable<av.BaseSetting> = this.dataSettingsBS;

  readonly outputSizes = Object.values(av.OutputSize);
  readonly slices = Object.values(av.Slice);
  readonly adjusted = Object.values(av.Adjusted);
  readonly dataTypes = Object.values(av.DataType);

  readonly settingsForm: FormGroup;
  settingsFormValues: av.BaseSetting = DEFAULT_AV_BASE_DATA_SETTING;
  dataRequest: av.BaseSetting = DEFAULT_AV_BASE_DATA_SETTING;

  outputSizeControl = new FormControl(av.OutputSize.COMPACT);
  sliceControl = new FormControl(av.Slice.YEAR1MONTH1);
  adjustedControl = new FormControl(av.Adjusted.ADJUSTED);
  dataTypeControl = new FormControl(av.DataType.JSON);

  constructor() {
    this.settingsForm = new FormGroup({
      outputSize: this.outputSizeControl,
      slice: this.sliceControl,
      adjusted: this.adjustedControl,
      dataType: this.dataTypeControl,
    });

    this.settingsForm.valueChanges.pipe(takeUntil(this.destroy))
      .subscribe(values => {
        this.settingsFormValues = values;
        // console.log('aDC ctor t.sFV values: ', this.settingsFormValues);
        this.dataRequest = this.generateDataRequest();
        // console.log('aDC ctor generated request: ', this.dataRequest);
        
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log('aDC ngOC changes: ', changes);
    if (changes['settings'] && changes['settings'].currentValue) {
      // console.log('aDC ngOC changes settings: ', changes['settings'].currentValue);
      const settings = changes['settings'].currentValue;
      // console.log('aDC ngOC settings: ', settings);
      this.updateFormValues(settings);
      this.dataSettingsBS.next(settings);
      
    }
  }

  ngOnInit(): void {
      this.settingsForm.patchValue({
      'slice': DEFAULT_AV_BASE_DATA_SETTING.slice,
      'adjusted': DEFAULT_AV_BASE_DATA_SETTING.adjusted,
      'outputSize': DEFAULT_AV_BASE_DATA_SETTING.outputSize,
      'dataType': DEFAULT_AV_BASE_DATA_SETTING.dataType,

    });
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }

  updateFormValues(settings: av.BaseSetting) {
    this.outputSizeControl.setValue(settings.outputSize);
    this.sliceControl.setValue(settings.slice);
    this.adjustedControl.setValue(settings.adjusted);
    this.dataTypeControl.setValue(settings.dataType);

  }

  generateDataRequest() {
    const dataRequest: av.BaseSetting = {
      outputSize: this.settingsFormValues.outputSize,
      slice: this.settingsFormValues.slice,
      adjusted: this.settingsFormValues.adjusted,
      dataType: this.settingsFormValues.dataType,
      
      
    };
    // console.log('aDC gDR data request: ', dataRequest);
    return dataRequest;
  }

  

  submit() {
    this.avBaseSettings.emit(this.dataRequest);
    console.log('aDC submit. form submitted.  Data request: ', this.dataRequest);
  }

}
