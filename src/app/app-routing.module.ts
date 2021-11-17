import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {DashboardPanelComponent} from './dashboard/dashboard-panel/dashboard-panel.component';
import {DeeThreePanelComponent} from './d3/dee-three-panel/dee-three-panel.component';
import { GamesComponent } from './games/games.component';
import { GridComponent } from './grid/grid.component';
import { ScrollComponent } from './scroll/scroll.component';



const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'angular',  loadChildren: () => import('./angular/angular.module').then(m => m.AngularModule)},
  {path: 'dashboard', component: DashboardPanelComponent},
  {path: 'd3', component: DeeThreePanelComponent},
  {path: 'games',  loadChildren: () => import('./games/games.module').then(m => m.GamesModule)},
  {path: 'base-components',  loadChildren: () => import('./base-components/base-components.module').then(m => m.BaseComponentsModule)},
  {path: 'simple-chart',  loadChildren: () => import('./simple-chart/simple-chart.module').then(m => m.SimpleChartModule)},
  {path: 'grid', component: GridComponent },
  {path: 'scroll', component: ScrollComponent },
  { path: 'position-builder', loadChildren: () => import('./position-builder/position-builder.module').then(m => m.PositionBuilderModule) },
  {path: '**', component: DashboardPanelComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
