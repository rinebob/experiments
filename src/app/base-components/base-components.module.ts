import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';

import { BaseComponentsRoutingModule } from './base-components-routing.module';
import { CarouselViewerComponent } from './carousel-viewer/carousel-viewer.component';
import { PickerTableComponent } from './picker-table/picker-table.component';
import { BaseChartComponent } from './base-chart/base-chart.component';
import { SlimNavBarComponent } from './slim-nav-bar/slim-nav-bar.component';
import { BaseComponentsViewComponent } from './base-components-view.component';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { ChartGalleryComponent } from './chart-gallery/chart-gallery.component';


@NgModule({
  declarations: [
    CarouselViewerComponent,
    PickerTableComponent,
    BaseChartComponent,
    SlimNavBarComponent,
    BaseComponentsViewComponent,
    ChartGalleryComponent,
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    MdbCarouselModule,
    BaseComponentsRoutingModule,
  ]
})
export class BaseComponentsModule { }
