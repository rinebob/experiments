import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { formatNumber, DecimalPipe } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

import { BlackScholesCalculatorConfig, BlackScholesInputs} from '../../../../common/option_interfaces';
import { BLACK_SCHOLES_INPUTS, BLACK_SCHOLES_CONFIG_INITIALIZER, BLACK_SCHOLES_INITIALIZER, BLACK_SCHOLES_OUTPUT_INITIALIZER, DAYS_IN_A_YEAR, } from '../../../../common/constants';
import { BlackScholesService } from '../black-scholes.service';

@Component({
  selector: 'exp-bs-calculator',
  templateUrl: './bs-calculator.component.html',
  styleUrls: ['./bs-calculator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BsCalculatorComponent implements OnInit {

  calculatorForm = new FormGroup({
   S0: new FormControl(100),
   X: new FormControl(100),
   t: new FormControl(.25),
   s: new FormControl(.25),
   q: new FormControl(0),
   r: new FormControl(.02),
  });

  calculatorFormValues = this.calculatorForm.valueChanges;
  calculatorFormValuesBS = new BehaviorSubject<BlackScholesInputs>(BLACK_SCHOLES_INITIALIZER);
  // calculatorFormValues$: Observable<BlackScholesInputs> = this.calculatorFormValuesBS;

  configForm = new FormGroup({
    undPriceMin: new FormControl(0),
    undPriceMax: new FormControl(0),
    strikeMin: new FormControl(0),
    strikeMax: new FormControl(0),
    strikeIncrement: new FormControl(0),
    timeMin: new FormControl(.01),
    timeMax: new FormControl(1),
    volMin: new FormControl(0),
    volMax: new FormControl(1),
    numDataPoints: new FormControl(100),
   });
 
   configFormValues = this.configForm.valueChanges;
   configFormValuesBS = new BehaviorSubject<BlackScholesCalculatorConfig>(BLACK_SCHOLES_CONFIG_INITIALIZER);

  oPWG = BLACK_SCHOLES_OUTPUT_INITIALIZER;  // onePriceWithGreeks - used in template

  minPrecision = 0;
  maxPrecision = 6;
  numberPipeString = this.generateNumberPipeString();

  constructor(private readonly bsService: BlackScholesService ) { }

  ngOnInit(): void {
    this.calculatorFormValuesBS.next(this.calculatorForm.value);
    // console.log('bSC ngOI initial calculatorForm.value: ', this.calculatorForm.value);
    // console.log('bSC ngOI initial calculatorFormValuesBS: ', this.calculatorFormValuesBS.value);
    this.calculatorFormValues.pipe().subscribe(
      values => {
        // console.log('bSC ngOI calculator form values:');
        // console.table(values);
        this.calculatorFormValuesBS.next(values);
        this.getOptionPriceWithGreeks();
      });

    this.configFormValuesBS.next(this.configForm.value);
    // console.log('bSC ngOI initial configForm.value: ', this.configForm.value);
    // console.log('bSC ngOI initial configFormValuesBS: ', this.configFormValuesBS.value);

    this.configFormValues.pipe().subscribe(
      values => {
        // console.log('bSC ngOI config form values:');
        // console.table(values);
        this.configFormValuesBS.next(values);
      });

    this.initializeConfigForm();
    this.getOptionPriceWithGreeks();
  }

  generateNumberPipeString() {
    const numberPipeString = '1.`${this.minPrecision}-${this.maxPrecision}`';
    // console.log('bSC numberPipeString: ', numberPipeString);
    return numberPipeString;
  }

  initializeConfigForm() {
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

  generateConfig() {
    const config = BLACK_SCHOLES_CONFIG_INITIALIZER;
    // console.log('bSC gC config: ', config)
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
    
    
    this.configFormValuesBS.next(config);
    // console.log('bSC gCFV config: ', config);
    // console.log('bSC gCFV configFormValuesBS: ', this.configFormValuesBS.value);

    return config;

  }

  // generate series for one strike
  generatePriceProjectionDataSeries(strike: number = 100) {
    console.log('---------------- gPPD Series.  strike: ', strike ,' --------------------');
    const config = this.configFormValuesBS.value;
    // console.log('bSC gPPD Series input config:')
    // console.table(config);

    const data = [];
    const {undPriceMin, undPriceMax, timeMin, timeMax, volMin, volMax, numDataPoints} = config;
  
    const priceInterval = (undPriceMax - undPriceMin) / numDataPoints;
    const timeInterval = (timeMax - timeMin) / numDataPoints;
    const volInterval = (volMax - volMin) / numDataPoints;

    for (let i = 0; i <= numDataPoints; i++ ) {
      const datum = {
        S0: undPriceMin + (priceInterval * i),
        X: strike,
        t: timeMax - (timeInterval * i),
        s: volMin + (volInterval * i),
        q: 0,
        r: 0.02,
      }
      
      
      const oPWG = this.getOptionPriceWithGreeks(datum);
      // console.log('bSC gPPD Series oPWG:', oPWG);
      
      datum['callPrice'] = oPWG.callPrice;
      datum['callDelta'] = oPWG.callDelta;
      datum['callTheta'] = oPWG.callTheta;
      datum['putPrice'] = oPWG.putPrice;
      datum['putDelta'] = oPWG.putDelta;
      datum['putTheta'] = oPWG.putTheta;
      datum['gamma'] = oPWG.gamma;
      datum['vega'] = oPWG.vega;
      datum['rho'] = oPWG.rho;
      

      // console.log('bSC gPPD Series output datum:');
      // console.table(datum);
      data.push(datum);
  }

    
    // console.log('bSC gPPD Series final data:', data);

    return data;


  }

  generatePriceProjectionDataSet() {
    console.log('---------------- gPPD Set --------------------');
    const config = this.configFormValuesBS.value;
    // console.log('bSC gPPD Set input config:')
    // console.table(config);
    const {strikeMin, strikeMax, strikeIncrement} = config;

    const numStrikes = Math.floor((strikeMax - strikeMin) / strikeIncrement);
    const strikeInterval = Math.floor((strikeMax - strikeMin) / numStrikes);
    console.log('bSC gPPD strikeInterval/numStrikes: ', strikeInterval, numStrikes);

    const dataSet = [];

    for (let i = 0; i <+ numStrikes; i++) {
      const strike = strikeMin + (i * strikeInterval)
      // console.log('bSC gPPD Set strike: ', strike)
      const seriesAtStrike = {
        strike,
        series: this.generatePriceProjectionDataSeries(strike)
      }
      
      // console.log('bSC gPPD series at strike: ', seriesAtStrike)

      dataSet.push(seriesAtStrike);

    }

    console.log('bSC gPPD Set final data set: ', dataSet);
    for (const set of dataSet.values()) {
      console.log('strike: ', set.strike);
      console.table(set.series)

    }

    return dataSet;


  }

    
  getOptionPriceWithGreeks(inputArg?: BlackScholesInputs) {
    const input = inputArg ? {...inputArg} : this.getCalculatorFormValues(); // returns a BlackScholesInput object
    
    const pricesAndGreeks = this.bsService.getOneOptionPriceWithGreeks(input);

    this.oPWG = this.bsService.getOneOptionPriceWithGreeks(input);

    // console.log('bSC c pricesAndGreeks: ', pricesAndGreeks);
    // console.log('bSC c t.oPWG: ', this.oPWG);

    return pricesAndGreeks;

  }

  getCalculatorFormValues() {
    // console.log('bSC c control values: ', );
    // console.log('bSC c S0: ', this.calculatorForm.value['S0']);
    
    const inputs: BlackScholesInputs = {...BLACK_SCHOLES_INITIALIZER};
    inputs.S0 = this.calculatorForm.value['S0'];
    inputs.X = this.calculatorForm.value['X'];
    inputs.t = this.calculatorForm.value['t'];
    inputs.s = this.calculatorForm.value['s'];
    inputs.q = this.calculatorForm.value['q'];
    inputs.r = this.calculatorForm.value['r'];
    
    
    this.calculatorFormValuesBS.next(inputs);
    // console.log('bSC c inputs: ', inputs);
    // console.log('bSC c calculatorFormValuesBS: ', this.calculatorFormValuesBS.value);

    return inputs;

  }

}
