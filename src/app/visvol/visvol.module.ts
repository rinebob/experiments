import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VisvolRoutingModule } from './visvol-routing.module';
import { VisvolComponent } from './visvol.component';


@NgModule({
  declarations: [
    VisvolComponent
  ],
  imports: [
    CommonModule,
    VisvolRoutingModule
  ]
})
export class VisvolModule { }
