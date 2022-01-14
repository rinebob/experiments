import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlackScholesRoutingModule } from './black-scholes-routing.module';
import { BlackScholesComponent } from './black-scholes.component';
import { BsCalculatorModule } from './bs-calculator/bs-calculator.module';


@NgModule({
  declarations: [
    BlackScholesComponent
  ],
  imports: [
    CommonModule,
    BlackScholesRoutingModule,
    BsCalculatorModule
  ]
})
export class BlackScholesModule { }
