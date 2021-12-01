import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VvComponent } from './vv.component';

const routes: Routes = [
  { path: '', component: VvComponent },
  { path: 'base-chart', loadChildren: () => import('./base-chart/base-chart.module').then(m => m.BaseChartModule) },
  { path: 'picker-table', loadChildren: () => import('./picker-table/picker-table.module').then(m => m.PickerTableModule) },
  { path: 'chart-settings', loadChildren: () => import('./chart-settings/chart-settings.module').then(m => m.ChartSettingsModule) }, 
  { path: 'chart-gallery', loadChildren: () => import('./chart-gallery/chart-gallery.module').then(m => m.ChartGalleryModule) }, 
  { path: 'slim-nav-bar', loadChildren: () => import('./slim-nav-bar/slim-nav-bar.module').then(m => m.SlimNavBarModule) }, 
  { path: 'position-builder', loadChildren: () => import('./position-builder/position-builder.module').then(m => m.PositionBuilderModule) }, 
  { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
  { path: 'black-scholes', loadChildren: () => import('./black-scholes/black-scholes.module').then(m => m.BlackScholesModule) },
  { path: '**', component: VvComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VvRoutingModule { }
