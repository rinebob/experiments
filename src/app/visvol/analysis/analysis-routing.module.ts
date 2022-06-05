import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalysisComponent } from './analysis.component';
import { AnalysisDashboardComponent } from './analysis-dashboard/analysis-dashboard.component';

import { DownloadManagerComponent } from '../download-manager/download-manager.component';
import {TradedStrikesViewComponent} from './traded-strikes/traded-strikes-view/traded-strikes-view.component';


const routes: Routes = [
  { path: '', component: AnalysisComponent },
  { path: 'dashboard', component: AnalysisDashboardComponent },
  { path: 'download', component: DownloadManagerComponent },
  { path: 'traded-strikes', component: TradedStrikesViewComponent },
  { path: '**', component: AnalysisComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalysisRoutingModule { }
