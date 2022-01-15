import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { formatNumber, DecimalPipe } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

import { BlackScholesInputs} from '../../../../common/option_interfaces';
import { BLACK_SCHOLES_INPUTS, BLACK_SCHOLES_INITIALIZER, BLACK_SCHOLES_OUTPUT_INITIALIZER, DAYS_IN_A_YEAR, } from '../../../../common/constants';
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

  formValues = this.calculatorForm.valueChanges;
  formValuesBS = new BehaviorSubject<BlackScholesInputs>(BLACK_SCHOLES_INITIALIZER);
  formValues$: Observable<BlackScholesInputs> = this.formValuesBS;

  oPWG = BLACK_SCHOLES_OUTPUT_INITIALIZER;  // onePriceWithGreeks - used in template

  minPrecision = 0;
  maxPrecision = 6;
  // numberPipeString = '1.`${this.minPrecision}-${this.maxPrecision}`';
  numberPipeString = this.generateNumberPipeString();

  constructor(private readonly bsService: BlackScholesService ) { }

  ngOnInit(): void {
    this.formValuesBS.next(this.calculatorForm.value);
    console.log('bSC ngOI initial calculatorForm.value: ', this.calculatorForm.value);
    console.log('bSC ngOI initial formValuesBS: ', this.formValuesBS.value);
    this.formValues.pipe().subscribe(
      values => {
        console.log('bSC ngOI form values: ', values)
        this.formValuesBS.next(values);
        this.calculate();
      });

    this.calculate();
  }

  generateNumberPipeString() {
    const numberPipeString = '1.`${this.minPrecision}-${this.maxPrecision}`';
    console.log('bSC numberPipeString: ', numberPipeString);
    return numberPipeString;
  }

    
  calculate() {
    const input = this.getFormValues();
    const pricesAndGreeks = this.bsService.getOneOptionPriceWithGreeks(input);

    const {callPrice, callDelta, callTheta, putPrice, putDelta, putTheta, gamma, vega, rho,}
     = this.bsService.getOneOptionPriceWithGreeks(input);

    this.oPWG = this.bsService.getOneOptionPriceWithGreeks(input);

    console.log('bSC c pricesAndGreeks: ', pricesAndGreeks);
    console.log('bSC c t.oPWG: ', this.oPWG);

    return pricesAndGreeks;

  }

  getFormValues() {
    console.log('bSC c control values: ', );
    console.log('bSC c So: ', this.calculatorForm.value['So']);
    
    const inputs: BlackScholesInputs = {...BLACK_SCHOLES_INITIALIZER};
    inputs.S0 = this.calculatorForm.value['S0'];
    inputs.X = this.calculatorForm.value['X'];
    inputs.t = this.calculatorForm.value['t'];
    inputs.s = this.calculatorForm.value['s'];
    inputs.q = this.calculatorForm.value['q'];
    inputs.r = this.calculatorForm.value['r'];
    
    
    this.formValuesBS.next(inputs);
    console.log('bSC c inputs: ', inputs);
    console.log('bSC c formValuesBS: ', this.formValuesBS.value);

    return inputs;

  }

}
