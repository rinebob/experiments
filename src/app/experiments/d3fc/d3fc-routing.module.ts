import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { D3fcComponent } from './d3fc.component';

const routes: Routes = [{ path: '', component: D3fcComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class D3fcRoutingModule { }
