import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BsCalculatorComponent } from './bs-calculator.component';



@NgModule({
  declarations: [
    BsCalculatorComponent
  ],
  imports: [
    CommonModule,
    FormsModule, 
    ReactiveFormsModule,
  ],
  exports: [
    BsCalculatorComponent
  ],
})
export class BsCalculatorModule { }
