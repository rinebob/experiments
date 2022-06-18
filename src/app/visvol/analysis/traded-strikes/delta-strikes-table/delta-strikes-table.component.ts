import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OratsUiDatum } from 'src/app/common/interfaces_orats';

@Component({
  selector: 'exp-delta-strikes-table',
  templateUrl: './delta-strikes-table.component.html',
  styleUrls: ['./delta-strikes-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DeltaStrikesTableComponent implements OnInit {

  @Input()
  set tableData(data: OratsUiDatum[]) {
    this.tableDataBS.next(data);
    console.log('dST @i table data: ', data);

  }
  get tableData() {
    return this.tableDataBS.value;
  }
  tableDataBS = new BehaviorSubject<OratsUiDatum[]>([]);

  @Input()
  set columns(columns: string[]) {
    this.columnsBS.next(columns);
  }
  get columns() {
    return this.columnsBS.value;
  }
  columnsBS = new BehaviorSubject<string[]>([]);

  constructor() { }

  ngOnInit(): void {
  }

}
