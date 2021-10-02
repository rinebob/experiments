import { Component, EventEmitter, Input, OnChanges, OnInit, ChangeDetectionStrategy, SimpleChanges, Output } from '@angular/core';


import { BehaviorSubject, Observable } from 'rxjs';

import { OptionPosition } from 'src/app/common/option_interfaces';

@Component({
  selector: 'exp-posn-config-list',
  templateUrl: './posn-config-list.component.html',
  styleUrls: ['./posn-config-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PosnConfigListComponent implements OnChanges, OnInit {
  @Input() positions:OptionPosition[];
  @Output() showConfig = new EventEmitter<string>();

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

  show(symbol: string) {
    console.log('pCL s show symbol: ', symbol);
    this.showConfig.emit(symbol);
  }

}
