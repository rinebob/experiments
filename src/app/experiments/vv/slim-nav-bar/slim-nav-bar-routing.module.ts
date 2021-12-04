import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SlimNavBarComponent } from './slim-nav-bar.component';

const routes: Routes = [{ path: '', component: SlimNavBarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SlimNavBarRoutingModule { }
