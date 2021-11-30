import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DThreeRoutingModule } from './d-three-routing.module';
import { DThreeComponent } from './d-three.component';


@NgModule({
  declarations: [
    DThreeComponent
  ],
  imports: [
    CommonModule,
    DThreeRoutingModule
  ]
})
export class DThreeModule { }
