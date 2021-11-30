import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExperimentsComponent } from './experiments.component';
import { VvModule} from './vv/vv.module';

const routes: Routes = [
  { path: '', component: ExperimentsComponent },
  { path: 'vv', loadChildren: () => import('./vv/vv.module').then(m => m.VvModule) },
  { path: '**', component: ExperimentsComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExperimentsRoutingModule { }
