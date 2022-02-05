import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GamesComponent } from './games/games.component';
import { GridComponent } from './grid/grid.component';
import { ScrollComponent } from './scroll/scroll.component';
import {AppComponent} from './app.component';

// const routes: Routes = [
//   {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
//   {path: 'angular',  loadChildren: () => import('./angular/angular.module').then(m => m.AngularModule)},
//   {path: 'dashboard', component: DashboardPanelComponent},
//   {path: 'd3', component: DeeThreePanelComponent},
//   {path: 'games',  loadChildren: () => import('./games/games.module').then(m => m.GamesModule)},
  // {path: 'base-components',  loadChildren: () => import('./base-components/base-components.module').then(m => m.BaseComponentsModule)},
  // {path: 'simple-chart',  loadChildren: () => import('./simple-chart/simple-chart.module').then(m => m.SimpleChartModule)},
//   {path: 'grid', component: GridComponent },
//   {path: 'scroll', component: ScrollComponent },
  // { path: 'position-builder', loadChildren: () => import('./position-builder/position-builder.module').then(m => m.PositionBuilderModule) },
//   {path: '**', component: DashboardPanelComponent},
// ];



const routes: Routes = [
  { path: '', redirectTo: '/visvol', pathMatch: 'full'},
  { path: 'position-builder', loadChildren: () => import('./position-builder/position-builder.module').then(m => m.PositionBuilderModule) },
  { path: 'simple-chart',  loadChildren: () => import('./simple-chart/simple-chart.module').then(m => m.SimpleChartModule) },
  { path: 'base-components',  loadChildren: () => import('./base-components/base-components.module').then(m => m.BaseComponentsModule) },
  { path: 'visvol', loadChildren: () => import('./visvol/visvol.module').then(m => m.VisvolModule) },
  { path: 'portfolio', loadChildren: () => import('./visvol/portfolio/portfolio.module').then(m => m.PortfolioModule) },
  { path: 'opportunities', loadChildren: () => import('./visvol/opportunities/opportunities.module').then(m => m.OpportunitiesModule) },
  { path: 'analysis', loadChildren: () => import('./visvol/analysis/analysis.module').then(m => m.AnalysisModule) },
  { path: 'portfolio', loadChildren: () => import('./visvol/portfolio/portfolio.module').then(m => m.PortfolioModule) },
  { path: 'exp', loadChildren: () => import('./experiments/experiments.module').then(m => m.ExperimentsModule) },
  { path: 'dynamic-panel', loadChildren: () => import('./dynamic-panel/dynamic-panel.module').then(m => m.DynamicPanelModule) },
  { path: '**', component: AppComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
