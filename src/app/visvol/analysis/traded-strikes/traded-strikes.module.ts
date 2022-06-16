import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import {ScrollingModule} from '@angular/cdk/scrolling';

import { DownloadManagerModule } from '../../download-manager/download-manager.module';
import { TradedStrikesViewComponent } from './traded-strikes-view/traded-strikes-view.component';
import { SymbolSelectorComponent } from './symbol-selector/symbol-selector.component';
import { StrikesTableComponent } from './strikes-table/strikes-table.component';
import { InfoRibbonComponent } from './info-ribbon/info-ribbon.component';
import { DeltaStrikesGridComponent } from './delta-strikes-grid/delta-strikes-grid.component';



@NgModule({
  declarations: [
    TradedStrikesViewComponent,
    SymbolSelectorComponent,
    StrikesTableComponent,
    InfoRibbonComponent,
    DeltaStrikesGridComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatTableModule,
    ScrollingModule,
    DownloadManagerModule,
  ],
  exports: [TradedStrikesViewComponent],
})
export class TradedStrikesModule { }
