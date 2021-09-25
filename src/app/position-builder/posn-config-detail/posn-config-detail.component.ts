import { Component, OnChanges, OnInit, ChangeDetectionStrategy, Input, SimpleChanges } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { OptionPosition } from 'src/app/common/option_interfaces';
import { DAYS_MAP, DEFAULT_OPTION_POSITION, MILLIS_IN_A_DAY, MONTHS_MAP } from 'src/app/common/constants';


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

  daysToExp = 0;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    // console.log('pCD ngOC changes[position].cV: ', changes['position'].currentValue);
    this.positionBS.next((changes['position']).currentValue);
    // console.log('pCD ngOC t.pBS.value: ', this.positionBS.value);
    const posn = this.positionBS.value;
    // console.log('------------------');
    // console.log('pCD ngOC posn: ', posn);
    // console.log('pCD ngOC legs: ', posn.config.legs);
    

    this.daysToExp = Math.floor((posn.expDate.getTime() - Date.now()) / MILLIS_IN_A_DAY);

  }



  ngOnInit(): void {
  }

}
