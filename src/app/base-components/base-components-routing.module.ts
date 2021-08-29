import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: AngularComponent,
    children: [
      {path: '', redirectTo: 'rxjs', pathMatch: 'full'},
      {path: 'rxjs', component: RxjsComponent},
      {path: 'controls', component: ControlsComponent},
      {path: 'color-button', component: ColorButtonComponent},
      // {path: 'tic-tac-toe', component: TicTacToeComponent},
      // {
      //   path: 'weather', component: WeatherComponent,
      //   children: [
      //     {path: ':locationName', component: WeatherReportComponent},
      //   ]
      // },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaseComponentsRoutingModule { }
