import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart/chart.component';
import { SymbolPickerComponent } from './symbol-picker/symbol-picker.component';



@NgModule({
  declarations: [ChartComponent, SymbolPickerComponent],
  imports: [
    CommonModule
  ]
})
export class ChartsModule { }
