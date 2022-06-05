import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { TradedStrikesViewComponent } from './traded-strikes-view/traded-strikes-view.component';
import { SymbolSelectorComponent } from './symbol-selector/symbol-selector.component';
import { StrikesTableComponent } from './strikes-table/strikes-table.component';



@NgModule({
  declarations: [
    TradedStrikesViewComponent,
    SymbolSelectorComponent,
    StrikesTableComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  exports: [TradedStrikesViewComponent],
})
export class TradedStrikesModule { }
