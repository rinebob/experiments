import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseChartComponent } from './base-chart/base-chart.component';
import { BaseComponentsViewComponent } from './base-components-view.component';
import { CarouselViewerComponent } from './carousel-viewer/carousel-viewer.component';
import { PickerTableComponent } from './picker-table/picker-table.component';


const routes: Routes = [
  {
    path: '', component: BaseComponentsViewComponent,
    children: [
      {path: '', redirectTo: 'picker-table', pathMatch: 'full'},
      {path: 'base-chart', component: BaseChartComponent},
      {path: 'carousel-viewer', component: CarouselViewerComponent},
      {path: 'picker-table', component: PickerTableComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseComponentsRoutingModule { }
