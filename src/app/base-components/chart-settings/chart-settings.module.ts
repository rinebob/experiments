import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {MatSliderModule} from '@angular/material/slider';

import { ChartSettingsComponent } from './chart-settings.component';
import { ChartControlsComponent } from './chart-controls/chart-controls.component';
import { DataControlsComponent } from './data-controls/data-controls.component';
import { AvDataControlsComponent } from './av-data-controls/av-data-controls.component';



@NgModule({
  declarations: [
    ChartSettingsComponent,
    ChartControlsComponent,
    DataControlsComponent,
    AvDataControlsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatSliderModule,
  ],
  exports: [
    AvDataControlsComponent,
    ChartControlsComponent,
    ChartSettingsComponent,
    DataControlsComponent,
  ]
})
export class ChartSettingsModule { }
