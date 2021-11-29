import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OpportunitiesComponent } from './opportunities.component';
import { OpptysDashboardComponent } from './opptys-dashboard/opptys-dashboard.component';

const routes: Routes = [
  { path: '', component: OpportunitiesComponent },
  { path: 'dashboard', component: OpptysDashboardComponent },
  { path: '**', component: OpportunitiesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OpportunitiesRoutingModule { }
