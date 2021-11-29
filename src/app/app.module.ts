import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CdkScrollableModule } from '@angular/cdk/scrolling';

import { AppComponent } from './app.component';
import { AngularModule } from './angular/angular.module';
import { DeeThreePanelComponent } from './d3/dee-three-panel/dee-three-panel.component';
import { DashboardPanelComponent } from './dashboard/dashboard-panel/dashboard-panel.component';
import { GamesModule } from './games/games.module';
import { ChartsModule } from './charts/charts.module';
import { BaseComponentsModule } from './base-components/base-components.module';
import { HeaderComponent } from './header/header.component';
import { GridComponent } from './grid/grid.component';
import { ScrollComponent } from './scroll/scroll.component';
import { ChartSettingsModule } from './base-components/chart-settings/chart-settings.module';
import { appReducer } from './store/reducers';
import { AppEffects } from './store/effects';
import { SimpleChartModule } from './simple-chart/simple-chart.module';

@NgModule({
  declarations: [
    AppComponent,
    DeeThreePanelComponent,
    DashboardPanelComponent,
    HeaderComponent,
    GridComponent,
    ScrollComponent,
  ],
  imports: [
    BrowserModule,
    AngularModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatToolbarModule,
    CdkScrollableModule,
    ChartsModule,
    GamesModule,
    BaseComponentsModule,
    ChartSettingsModule,
    StoreModule.forRoot({app: appReducer}, {}),
    EffectsModule.forRoot([AppEffects]),
    SimpleChartModule,
    // VisvolModule,
    // ExperimentsModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
