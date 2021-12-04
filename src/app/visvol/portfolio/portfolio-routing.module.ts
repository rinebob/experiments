import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioComponent } from './portfolio.component';
import { PortDashboardComponent } from './port-dashboard/port-dashboard.component';

const routes: Routes = [
  { path: '', component: PortfolioComponent },
  { path: 'dashboard', component: PortDashboardComponent },
  { path: '**', component: PortfolioComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortfolioRoutingModule { }
