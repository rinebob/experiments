import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseChartComponent } from './base-chart.component';

const routes: Routes = [{ path: '', component: BaseChartComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseChartRoutingModule { }
