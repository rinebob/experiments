import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseChartRoutingModule } from './base-chart-routing.module';
import { BaseChartComponent } from './base-chart.component';


@NgModule({
  declarations: [
    BaseChartComponent
  ],
  imports: [
    CommonModule,
    BaseChartRoutingModule
  ]
})
export class BaseChartModule { }
