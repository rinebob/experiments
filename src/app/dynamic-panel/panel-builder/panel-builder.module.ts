import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelBuilderComponent } from './panel-builder.component';
import { PaneConfigComponent } from './pane-config/pane-config.component';
import { SeriesConfigComponent } from './series-config/series-config.component';



@NgModule({
  declarations: [
    PanelBuilderComponent,
    PaneConfigComponent,
    SeriesConfigComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PanelBuilderComponent
  ],
})
export class PanelBuilderModule { }
