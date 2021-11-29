import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VisvolComponent } from './visvol.component';

const routes: Routes = [
{ path: '', component: VisvolComponent },
{ path: 'portfolio', loadChildren: () => import('./portfolio/portfolio.module').then(m => m.PortfolioModule) },
{ path: 'opportunities', loadChildren: () => import('./opportunities/opportunities.module').then(m => m.OpportunitiesModule) },
{ path: 'analysis', loadChildren: () => import('./analysis/analysis.module').then(m => m.AnalysisModule) },
{ path: '**', component: VisvolComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VisvolRoutingModule { }
