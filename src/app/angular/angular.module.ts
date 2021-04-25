import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ToastrModule} from 'ngx-toastr';

import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatOptionModule} from '@angular/material/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatSelectModule} from '@angular/material/select';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {ReactiveFormsModule} from '@angular/forms';

import {AngularComponent} from './angular.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [
  {
    path: '', component: AngularComponent,
    children: [
      {path: 'rxjs', component: RxjsComponent},
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
  declarations: [
    AngularComponent,
    RxjsComponent,

  ],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatOptionModule,
    MatProgressBarModule,
    MatSelectModule,
    MatTabsModule,
    MatToolbarModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    RouterModule.forChild(routes),
  ]
})
export class AngularModule {
}
