import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngComponent } from './ang.component';

const routes: Routes = [{ path: '', component: AngComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AngRoutingModule { }
