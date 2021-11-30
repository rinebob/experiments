import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AngRoutingModule } from './ang-routing.module';
import { AngComponent } from './ang.component';


@NgModule({
  declarations: [
    AngComponent
  ],
  imports: [
    CommonModule,
    AngRoutingModule
  ]
})
export class AngModule { }
