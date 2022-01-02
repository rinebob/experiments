import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicChartComponent } from './dynamic-chart.component';



@NgModule({
  declarations: [
    DynamicChartComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [DynamicChartComponent],
})
export class DynamicChartModule { }
