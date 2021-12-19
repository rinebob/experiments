import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { D3fcRoutingModule } from './d3fc-routing.module';
import { D3fcComponent } from './d3fc.component';


@NgModule({
  declarations: [
    D3fcComponent
  ],
  imports: [
    CommonModule,
    D3fcRoutingModule
  ]
})
export class D3fcModule { }
