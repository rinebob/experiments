import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SlimNavBarRoutingModule } from './slim-nav-bar-routing.module';
import { SlimNavBarComponent } from './slim-nav-bar.component';


@NgModule({
  declarations: [
    SlimNavBarComponent
  ],
  imports: [
    CommonModule,
    SlimNavBarRoutingModule
  ]
})
export class SlimNavBarModule { }
