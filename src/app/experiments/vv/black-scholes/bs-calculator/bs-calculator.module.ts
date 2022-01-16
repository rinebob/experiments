import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BsCalculatorComponent } from './bs-calculator.component';
import { CalcFormComponent } from './calc-form/calc-form.component';
import { ConfigFormComponent } from './config-form/config-form.component';
import { CalcChartsComponent } from './calc-charts/calc-charts.component';



@NgModule({
  declarations: [
    BsCalculatorComponent,
    CalcFormComponent,
    ConfigFormComponent,
    CalcChartsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
  ],
  exports: [
    BsCalculatorComponent,
    CalcFormComponent,
    ConfigFormComponent,
    CalcChartsComponent,
  ],
})
export class BsCalculatorModule { }
