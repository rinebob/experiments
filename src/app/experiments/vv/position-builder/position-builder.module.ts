import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PositionBuilderRoutingModule } from './position-builder-routing.module';
import { PositionBuilderComponent } from './position-builder.component';


@NgModule({
  declarations: [
    PositionBuilderComponent
  ],
  imports: [
    CommonModule,
    PositionBuilderRoutingModule
  ]
})
export class PositionBuilderModule { }
