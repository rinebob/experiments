import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PortfolioRoutingModule } from './portfolio-routing.module';
import { PortfolioComponent } from './portfolio.component';
import { PortDashboardComponent } from './port-dashboard/port-dashboard.component';
import { PositionTileModule } from '../position-tile/position-tile.module';



@NgModule({
  declarations: [
    PortfolioComponent,
    PortDashboardComponent
  ],
  imports: [
    CommonModule,
    PortfolioRoutingModule,
    PositionTileModule,
  ]
})
export class PortfolioModule { }
