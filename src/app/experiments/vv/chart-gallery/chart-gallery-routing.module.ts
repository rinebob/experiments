import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartGalleryComponent } from './chart-gallery.component';

const routes: Routes = [{ path: '', component: ChartGalleryComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartGalleryRoutingModule { }
