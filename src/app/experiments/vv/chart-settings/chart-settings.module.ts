import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartSettingsRoutingModule } from './chart-settings-routing.module';
import { ChartSettingsComponent } from './chart-settings.component';


@NgModule({
  declarations: [
    ChartSettingsComponent
  ],
  imports: [
    CommonModule,
    ChartSettingsRoutingModule
  ]
})
export class ChartSettingsModule { }
