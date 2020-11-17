import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';

import {MatTabsModule} from '@angular/material/tabs';

import {AngularComponent} from './angular.component';
import {CounterComponent} from './counter/counter.component';
import { TicTacToeComponent } from './tic-tac-toe/tic-tac-toe.component';

const routes: Routes = [
  {path: '', component: AngularComponent,
    children: [
      {path: 'counter', component: CounterComponent},
      {path: 'tic-tac-toe', component: TicTacToeComponent},
    ]
  },
];

@NgModule({
  declarations: [AngularComponent, CounterComponent, TicTacToeComponent],
  imports: [
    CommonModule,
    MatTabsModule,
    RouterModule.forChild(routes),
  ]
})
export class AngularModule { }
