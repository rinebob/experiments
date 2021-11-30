import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PickerTableRoutingModule } from './picker-table-routing.module';
import { PickerTableComponent } from './picker-table.component';


@NgModule({
  declarations: [
    PickerTableComponent
  ],
  imports: [
    CommonModule,
    PickerTableRoutingModule
  ]
})
export class PickerTableModule { }
