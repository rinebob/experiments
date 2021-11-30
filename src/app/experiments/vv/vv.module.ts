import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VvRoutingModule } from './vv-routing.module';
import { VvComponent } from './vv.component';


@NgModule({
  declarations: [
    VvComponent
  ],
  imports: [
    CommonModule,
    VvRoutingModule
  ]
})
export class VvModule { }
