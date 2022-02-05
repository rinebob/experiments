import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositionTileComponent } from './position-tile.component';


@NgModule({
  declarations: [
    PositionTileComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PositionTileComponent,
  ],
})
export class PositionTileModule { }
