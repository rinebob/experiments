import { Component, EventEmitter, OnInit, ChangeDetectionStrategy, Output } from '@angular/core';
import { formatNumber, DecimalPipe } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

import { BlackScholesCalculatorConfig, BlackScholesInputs} from '../../../../../common/option_interfaces';
import { BLACK_SCHOLES_INPUTS, BLACK_SCHOLES_CONFIG_INITIALIZER, BLACK_SCHOLES_INITIALIZER, BLACK_SCHOLES_OUTPUT_INITIALIZER, DAYS_IN_A_YEAR, } from '../../../../../common/constants';
import { BlackScholesService } from '../../black-scholes.service';

@Component({
  selector: 'exp-calc-form',
  templateUrl: './calc-form.component.html',
  styleUrls: ['./calc-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalcFormComponent implements OnInit {

  @Output() calcFormValues = new EventEmitter<BlackScholesInputs>();

  
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

  oPWG = BLACK_SCHOLES_OUTPUT_INITIALIZER;  // onePriceWithGreeks - used in template

  constructor(private readonly bsService: BlackScholesService ) { }

  ngOnInit(): void {
    this.calculatorFormValuesBS.next(BLACK_SCHOLES_INITIALIZER);
     // console.log('bSC ngOI initial calculatorForm.value: ', this.calculatorForm.value);
    // console.log('bSC ngOI initial calculatorFormValuesBS: ', this.calculatorFormValuesBS.value);
    this.calculatorFormValues.pipe().subscribe(
      values => {
        // console.log('bSC ngOI calculator form values:');
        // console.table(values);
        this.calculatorFormValuesBS.next(values);
        this.calcFormValues.emit(values);
        this.getOptionPriceWithGreeks();
      });

      this.getOptionPriceWithGreeks();

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