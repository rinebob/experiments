import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DThreeComponent } from './d-three.component';

const routes: Routes = [{ path: '', component: DThreeComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DThreeRoutingModule { }
