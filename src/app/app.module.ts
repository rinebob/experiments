import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';

import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { AngularModule } from './angular/angular.module';
import { DeeThreePanelComponent } from './d3/dee-three-panel/dee-three-panel.component';
import { DashboardPanelComponent } from './dashboard/dashboard-panel/dashboard-panel.component';



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
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule
  ],
  providers: [],
  exports: [
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatTabsModule,
    MatToolbarModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
