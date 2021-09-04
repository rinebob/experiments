import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatToolbarModule} from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { AngularModule } from './angular/angular.module';
import { DeeThreePanelComponent } from './d3/dee-three-panel/dee-three-panel.component';
import { DashboardPanelComponent } from './dashboard/dashboard-panel/dashboard-panel.component';
import { GamesModule } from './games/games.module';
import { ChartsModule } from './charts/charts.module';
import { BaseComponentsModule } from './base-components/base-components.module';



@NgModule({
  declarations: [
    AppComponent,
    DeeThreePanelComponent,
    DashboardPanelComponent,
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
    MatSidenavModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatToolbarModule,
    ChartsModule,
    GamesModule,
    BaseComponentsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
