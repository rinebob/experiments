import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalysisComponent } from './analysis.component';
import { AnalysisDashboardComponent } from './analysis-dashboard/analysis-dashboard.component';

import { DownloadManagerComponent } from '../download-manager/download-manager.component';

const routes: Routes = [
  { path: '', component: AnalysisComponent },
  { path: 'dashboard', component: AnalysisDashboardComponent },
  { path: 'download', component: DownloadManagerComponent },
  { path: '**', component: AnalysisComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalysisRoutingModule { }
