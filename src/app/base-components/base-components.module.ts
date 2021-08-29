import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseComponentsRoutingModule } from './base-components-routing.module';
import { CarouselViewerComponent } from './carousel-viewer/carousel-viewer.component';
import { PickerTableComponent } from './picker-table/picker-table.component';
import { BaseChartComponent } from './base-chart/base-chart.component';
import { SlimNavBarComponent } from './slim-nav-bar/slim-nav-bar.component';
import { BaseComponentsViewComponent } from './base-components-view.component';


@NgModule({
  declarations: [
    CarouselViewerComponent,
    PickerTableComponent,
    BaseChartComponent,
    SlimNavBarComponent,
    BaseComponentsViewComponent,
  ],
  imports: [
    CommonModule,
    BaseComponentsRoutingModule
  ]
})
export class BaseComponentsModule { }
