import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicPanelRoutingModule } from './dynamic-panel-routing.module';
import { DynamicPanelComponent } from './dynamic-panel.component';


@NgModule({
  declarations: [
    DynamicPanelComponent
  ],
  imports: [
    CommonModule,
    DynamicPanelRoutingModule
  ]
})
export class DynamicPanelModule { }
