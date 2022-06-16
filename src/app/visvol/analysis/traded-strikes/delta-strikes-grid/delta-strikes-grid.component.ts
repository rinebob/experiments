import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { DeltaStrikesGridData } from 'src/app/common/interfaces_orats';

@Component({
  selector: 'exp-delta-strikes-grid',
  templateUrl: './delta-strikes-grid.component.html',
  styleUrls: ['./delta-strikes-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeltaStrikesGridComponent implements OnInit {
  @Input()
  set deltaStrikesGridData(data: DeltaStrikesGridData) {
    this.deltaStrikesGridDataBS.next(data);
  }
  get deltaStrikesGridData() {
    return this.deltaStrikesGridDataBS.value;
  }
  deltaStrikesGridDataBS = new BehaviorSubject<DeltaStrikesGridData>({});
  // deltaStrikesGridData$: Observable<DeltaStrikesGridData> = this.deltaStrikesGridDataBS;

  constructor() { }

  ngOnInit(): void {
  }

}
