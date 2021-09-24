import { Component, OnChanges, OnInit, ChangeDetectionStrategy, Input, SimpleChanges } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { OptionPosition } from 'src/app/common/option_interfaces';
import { DEFAULT_OPTION_POSITION } from 'src/app/common/constants';


@Component({
  selector: 'exp-posn-config-detail',
  templateUrl: './posn-config-detail.component.html',
  styleUrls: ['./posn-config-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PosnConfigDetailComponent implements OnChanges, OnInit {
  @Input() position: OptionPosition;

  positionBS = new BehaviorSubject<OptionPosition>(DEFAULT_OPTION_POSITION);
  position$: Observable<OptionPosition> = this.positionBS;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    // console.log('pCD ngOC changes[position].cV: ', changes['position'].currentValue);
    this.positionBS.next((changes['position']).currentValue);
    console.log('pCD ngOC t.pBS.value: ', this.positionBS.value);
  }

  ngOnInit(): void {
  }

}
