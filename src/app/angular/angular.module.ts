import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';


import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {AngularComponent} from './angular.component';
import {CounterComponent} from './counter/counter.component';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';

import { IconComponent } from './tic-tac-toe/icon/icon.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ToastrModule } from 'ngx-toastr';

const routes: Routes = [
  {path: '', component: AngularComponent,
    children: [
      {path: 'counter', component: CounterComponent},
      {path: 'tic-tac-toe', component: TicTacToeComponent},
    ]
  },
];

@NgModule({
  declarations: [AngularComponent, CounterComponent, TicTacToeComponent, IconComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    MatButtonModule,
    MatTabsModule,
    ToastrModule.forRoot(),
    RouterModule.forChild(routes),
  ]
})
export class AngularModule { }
