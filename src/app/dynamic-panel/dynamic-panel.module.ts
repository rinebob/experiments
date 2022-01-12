import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicPanelRoutingModule } from './dynamic-panel-routing.module';
import { DynamicPanelComponent } from './dynamic-panel.component';
import { ChartSettingsModule } from '../base-components/chart-settings/chart-settings.module';
import { BaseComponentsModule } from '../base-components/base-components.module';
import { DynamicChartModule } from './dynamic-chart/dynamic-chart.module';



@NgModule({
  declarations: [
    DynamicPanelComponent
  ],
  imports: [
    CommonModule,
    DynamicPanelRoutingModule,
    BaseComponentsModule,
    ChartSettingsModule,
    DynamicChartModule,
  ]
})
export class DynamicPanelModule { }
