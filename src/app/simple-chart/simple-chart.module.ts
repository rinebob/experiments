import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleChartComponent } from './simple-chart.component';
import { SimpleChartRoutingModule } from './simple-chart.routing.module';
import { ChartSettingsModule } from '../base-components/chart-settings/chart-settings.module';
import { BaseComponentsModule } from '../base-components/base-components.module';


@NgModule({
  declarations: [
    SimpleChartComponent
  ],
  imports: [
    CommonModule,
    SimpleChartRoutingModule,
    BaseComponentsModule,
    ChartSettingsModule,

  ]
})
export class SimpleChartModule { }
