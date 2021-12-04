import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlackScholesComponent } from './black-scholes.component';

const routes: Routes = [{ path: '', component: BlackScholesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlackScholesRoutingModule { }
