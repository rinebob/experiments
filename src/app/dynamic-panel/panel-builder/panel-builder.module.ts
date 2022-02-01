import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelBuilderComponent } from './panel-builder.component';
import { PaneConfigComponent } from './pane-config/pane-config.component';
import { SeriesConfigComponent } from './series-config/series-config.component';
import { MaUiComponent } from './ma-ui/ma-ui.component';
import { BbUiComponent } from './bb-ui/bb-ui.component';
import { RsiUiComponent } from './rsi-ui/rsi-ui.component';
import { StochUiComponent } from './stoch-ui/stoch-ui.component';
import { MacdUiComponent } from './macd-ui/macd-ui.component';
import { DatasourceUiComponent } from './datasource-ui/datasource-ui.component';



@NgModule({
  declarations: [
    PanelBuilderComponent,
    PaneConfigComponent,
    SeriesConfigComponent,
    MaUiComponent,
    BbUiComponent,
    RsiUiComponent,
    StochUiComponent,
    MacdUiComponent,
    DatasourceUiComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PanelBuilderComponent
  ],
})
export class PanelBuilderModule { }
