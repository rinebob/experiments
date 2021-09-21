import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { OptionPosition } from 'src/app/common/option_interfaces';

@Component({
  selector: 'exp-posn-config-detail',
  templateUrl: './posn-config-detail.component.html',
  styleUrls: ['./posn-config-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PosnConfigDetailComponent implements OnInit {
  @Input() position: OptionPosition;

  constructor() { }

  ngOnInit(): void {
  }

}
