import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartSettingsComponent } from './chart-settings.component';

const routes: Routes = [{ path: '', component: ChartSettingsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartSettingsRoutingModule { }
