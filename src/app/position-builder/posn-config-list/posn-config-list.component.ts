import { Component, Input, OnChanges, OnInit, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { OptionPosition } from 'src/app/common/option_interfaces';

@Component({
  selector: 'exp-posn-config-list',
  templateUrl: './posn-config-list.component.html',
  styleUrls: ['./posn-config-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PosnConfigListComponent implements OnChanges, OnInit {
  @Input() positions:OptionPosition[]

  private positionsBS = new BehaviorSubject<OptionPosition[]>([]);
  readonly positions$: Observable<OptionPosition[]> = this.positionsBS;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['positions']) {
      console.log('pCL ngOC positions input: ', changes['positions']);

      this.positionsBS.next(changes['positions'].currentValue)
    }

  }

  ngOnInit(): void {
  }

}
