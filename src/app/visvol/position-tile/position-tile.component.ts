import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

import { OptionPosition } from 'src/app/common/option_interfaces';

@Component({
  selector: 'exp-position-tile',
  templateUrl: './position-tile.component.html',
  styleUrls: ['./position-tile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PositionTileComponent implements OnInit {
  @Input() position: OptionPosition;

  constructor() { }

  ngOnInit(): void {
  }

}
