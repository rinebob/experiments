import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpportunitiesRoutingModule } from './opportunities-routing.module';
import { OpportunitiesComponent } from './opportunities.component';
import { OpptysDashboardComponent } from './opptys-dashboard/opptys-dashboard.component';


@NgModule({
  declarations: [
    OpportunitiesComponent,
    OpptysDashboardComponent
  ],
  imports: [
    CommonModule,
    OpportunitiesRoutingModule
  ]
})
export class OpportunitiesModule { }
