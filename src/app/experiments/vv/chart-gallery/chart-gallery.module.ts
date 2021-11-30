import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChartGalleryRoutingModule } from './chart-gallery-routing.module';
import { ChartGalleryComponent } from './chart-gallery.component';


@NgModule({
  declarations: [
    ChartGalleryComponent
  ],
  imports: [
    CommonModule,
    ChartGalleryRoutingModule
  ]
})
export class ChartGalleryModule { }
