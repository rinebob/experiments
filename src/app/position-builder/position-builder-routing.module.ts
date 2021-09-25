import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PositionBuilderComponent } from './position-builder.component';

const routes: Routes = [{ path: '', component: PositionBuilderComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PositionBuilderRoutingModule { }
