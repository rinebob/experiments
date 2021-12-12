import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicPanelComponent } from './dynamic-panel.component';

const routes: Routes = [{ path: '', component: DynamicPanelComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicPanelRoutingModule { }
