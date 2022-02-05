import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'exp-position-tile',
  templateUrl: './position-tile.component.html',
  styleUrls: ['./position-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PositionTileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
