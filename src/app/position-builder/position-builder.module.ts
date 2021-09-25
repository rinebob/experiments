import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PositionBuilderRoutingModule } from './position-builder-routing.module';
import { PositionBuilderComponent } from './position-builder.component';
import { PosnConfigListComponent } from './posn-config-list/posn-config-list.component';

import { BaseComponentsModule } from '../base-components/base-components.module';
import { PosnConfigDetailComponent } from './posn-config-detail/posn-config-detail.component';


@NgModule({
  declarations: [
    PositionBuilderComponent,
    PosnConfigListComponent,
    PosnConfigDetailComponent,
  ],
  imports: [
    CommonModule,
    PositionBuilderRoutingModule,
    BaseComponentsModule,
  ]
})
export class PositionBuilderModule { }
