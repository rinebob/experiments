import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { DeltaStrikesGridData, OratsUiDatum } from 'src/app/common/interfaces_orats';

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
    this.expirations = this.getExpirations(data);
  }
  get deltaStrikesGridData() {
    return this.deltaStrikesGridDataBS.value;
  }
  deltaStrikesGridDataBS = new BehaviorSubject<DeltaStrikesGridData>({});
  // deltaStrikesGridData$: Observable<DeltaStrikesGridData> = this.deltaStrikesGridDataBS;

  expirations: string[] = [];
  dataForExpiration: OratsUiDatum[] = [];
  visibleColumns = ['strike', 'cValue', 'pValue', 'delta', 'cMidIv', 'pMidIv',];
  showTable = true;

  constructor() { }

  ngOnInit(): void {}

  getExpirations(data: DeltaStrikesGridData): string[] {
    const expirations = Object.keys(this.deltaStrikesGridData);
    console.log('dSG get expirations: ', expirations);

    return expirations;

  }

  getDeltaStrikesDataForExpiration(exp: string) {
    const data = this.deltaStrikesGridData[exp];
    console.log('dSG gDSDFE data for exp: ', exp, data);
    this.showTable = true;

    this.dataForExpiration = data;
  }

  toggleTable() {
    this.showTable = !this.showTable;
  }

}
