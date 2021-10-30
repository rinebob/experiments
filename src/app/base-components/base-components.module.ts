import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatTableModule} from '@angular/material/table';


import { BaseComponentsRoutingModule } from './base-components-routing.module';
import { CarouselViewerComponent } from './carousel-viewer/carousel-viewer.component';
import { PickerTableComponent } from './picker-table/picker-table.component';
import { BaseChartComponent } from './base-chart/base-chart.component';
import { SlimNavBarComponent } from './slim-nav-bar/slim-nav-bar.component';
import { BaseComponentsViewComponent } from './base-components-view.component';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { ChartGalleryComponent } from './chart-gallery/chart-gallery.component';
// import { ChartSettingsComponent } from './chart-settings/chart-settings.component';
import { ChartSettingsModule } from './chart-settings/chart-settings.module';


@NgModule({
  declarations: [
    CarouselViewerComponent,
    PickerTableComponent,
    BaseChartComponent,
    SlimNavBarComponent,
    BaseComponentsViewComponent,
    ChartGalleryComponent,
    // ChartSettingsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatTableModule,
    MdbCarouselModule,
    BaseComponentsRoutingModule,
    ChartSettingsModule,
  ]
})
export class BaseComponentsModule { }
