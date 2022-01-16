import { Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { BlackScholesCalculatorConfig} from '../../../../../common/option_interfaces';
import { BLACK_SCHOLES_CONFIG_INITIALIZER,  } from '../../../../../common/constants';

@Component({
  selector: 'exp-config-form',
  templateUrl: './config-form.component.html',
  styleUrls: ['./config-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigFormComponent implements OnInit {

  @Output() configFormValues = new EventEmitter<BlackScholesCalculatorConfig>()

  config: BlackScholesCalculatorConfig = {...BLACK_SCHOLES_CONFIG_INITIALIZER};
  
  configForm = new FormGroup({
    // undPriceMin: new FormControl(0),
    // undPriceMax: new FormControl(0),
    // strikeMin: new FormControl(0),
    // strikeMax: new FormControl(0),
    // strikeIncrement: new FormControl(0),
    // timeMin: new FormControl(.01),
    // timeMax: new FormControl(1),
    // volMin: new FormControl(0),
    // volMax: new FormControl(1),
    // numDataPoints: new FormControl(100),
    undPriceMin: new FormControl(this.config.undPriceMin),
    undPriceMax: new FormControl(this.config.undPriceMax),
    strikeMin: new FormControl(this.config.strikeMin),
    strikeMax: new FormControl(this.config.strikeMax),
    strikeIncrement: new FormControl(this.config.strikeIncrement),
    timeMin: new FormControl(this.config.timeMin),
    timeMax: new FormControl(this.config.timeMax),
    volMin: new FormControl(this.config.volMin),
    volMax: new FormControl(this.config.volMax),
    numDataPoints: new FormControl(this.config.numDataPoints),
  });

  configFormValueChanges = this.configForm.valueChanges;
  configFormValueChangesBS = new BehaviorSubject<BlackScholesCalculatorConfig>(BLACK_SCHOLES_CONFIG_INITIALIZER);

  constructor() { }

  ngOnInit(): void {
    this.configFormValueChangesBS.next(this.configForm.value);
    // console.log('bSC ngOI initial configForm.value: ', this.configForm.value);
    // console.log('bSC ngOI initial configFormValuesBS: ', this.configFormValuesBS.value);

    this.configFormValueChanges.pipe().subscribe(
      values => {
        // console.log('bSC ngOI config form values:');
        // console.table(values);
        this.configFormValueChangesBS.next(values);
        this.configFormValues.emit(values);
      });

    // this.initializeConfigForm();
    this.configFormValues.emit(this.configFormValueChangesBS.value);
  }

  resetConfigForm() {
    const config: BlackScholesCalculatorConfig = {...BLACK_SCHOLES_CONFIG_INITIALIZER};
    console.log('bSC iCF init with config:');
    console.table(config);
    this.configForm.controls['undPriceMin'].setValue(config.undPriceMin);
    this.configForm.controls['undPriceMax'].setValue(config.undPriceMax);
    this.configForm.controls['strikeMin'].setValue(config.strikeMin);
    this.configForm.controls['strikeMax'].setValue(config.strikeMax);
    this.configForm.controls['strikeIncrement'].setValue(config.strikeIncrement);
    this.configForm.controls['timeMin'].setValue(config.timeMin);
    this.configForm.controls['timeMax'].setValue(config.timeMax);
    this.configForm.controls['volMin'].setValue(config.volMin);
    this.configForm.controls['volMax'].setValue(config.volMax);
    this.configForm.controls['numDataPoints'].setValue(config.numDataPoints);
  }

  getConfigFormValues() {
    // console.log('bSC gCFV control values: ', );
    // console.log('bSC gCFV undPriceMin: ', this.configForm.value['undPriceMin']);
    
    const config: BlackScholesCalculatorConfig = {...BLACK_SCHOLES_CONFIG_INITIALIZER};
    config.undPriceMin = this.configForm.value['undPriceMin'];
    config.undPriceMax = this.configForm.value['undPriceMax'];
    config.strikeMin = this.configForm.value['strikeMin'];
    config.strikeMax = this.configForm.value['strikeMax'];
    config.strikeIncrement = this.configForm.value['strikeIncrement'];
    config.timeMin = this.configForm.value['timeMin'];
    config.timeMax = this.configForm.value['timeMax'];
    config.volMin = this.configForm.value['volMin'];
    config.volMax = this.configForm.value['volMax'];
    config.numDataPoints = this.configForm.value['numDataPoints'];
    
    
    this.configFormValueChangesBS.next(config);
    // console.log('bSC gCFV config: ', config);
    // console.log('bSC gCFV configFormValuesBS: ', this.configFormValuesBS.value);

    return config;

  }

  handleGenerateDataSet() {
    console.log('cF hGDS handle generate data set called');
    this.getConfigFormValues();
    this.configFormValues.emit(this.configFormValueChangesBS.value)
  }

  

}
