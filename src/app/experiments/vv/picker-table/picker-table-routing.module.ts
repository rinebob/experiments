import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PickerTableComponent } from './picker-table.component';

const routes: Routes = [{ path: '', component: PickerTableComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PickerTableRoutingModule { }
