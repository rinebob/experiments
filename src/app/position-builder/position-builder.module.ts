import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PositionBuilderRoutingModule } from './position-builder-routing.module';
import { PositionBuilderComponent } from './position-builder.component';
import { PosnConfigListComponent } from './posn-config-list/posn-config-list.component';

import { BaseComponentsModule } from '../base-components/base-components.module';


@NgModule({
  declarations: [
    PositionBuilderComponent,
    PosnConfigListComponent,
  ],
  imports: [
    CommonModule,
    PositionBuilderRoutingModule,
    BaseComponentsModule,
  ]
})
export class PositionBuilderModule { }
