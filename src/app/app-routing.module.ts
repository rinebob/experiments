import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {DashboardPanelComponent} from './dashboard/dashboard-panel/dashboard-panel.component';
import {DeeThreePanelComponent} from './d3/dee-three-panel/dee-three-panel.component';
import { GamesComponent } from './games/games.component';
import { GridComponent } from './grid/grid.component';
import { ScrollComponent } from './scroll/scroll.component';
import {AppComponent} from './app.component';



const routes: Routes = [
  {path: '', redirectTo: '/visvol', pathMatch: 'full'},
  { path: 'visvol', loadChildren: () => import('./visvol/visvol.module').then(m => m.VisvolModule) },
  { path: 'experiments', loadChildren: () => import('./experiments/experiments.module').then(m => m.ExperimentsModule) },
  {path: '**', component: AppComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
