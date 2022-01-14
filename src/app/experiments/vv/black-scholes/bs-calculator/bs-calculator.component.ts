import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

import { BlackScholesInputs} from '../../../../common/option_interfaces';
import { BLACK_SCHOLES_INITIALIZER} from '../../../../common/constants';

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

   

  constructor() { }

  ngOnInit(): void {
    this.formValuesBS.next(this.calculatorForm.value);
    console.log('bSC ngOI initial calculatorForm.value: ', this.calculatorForm.value);
    console.log('bSC ngOI initial formValuesBS: ', this.formValuesBS.value);
    this.formValues.pipe().subscribe(
      values => {
        console.log('bSC ngOI form values: ', values)
        this.formValuesBS.next(values);
      }
      
      );
    }
    
  calculate() {
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

  }

  getFormValues() {

  }

}
