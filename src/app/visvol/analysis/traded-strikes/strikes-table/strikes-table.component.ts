import { Component, ChangeDetectionStrategy, ElementRef, Input, OnInit, ViewChild  } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import {TableColumn, TradedStrikesDatum, TradedStrikesTableDataObject} from '../../../../common/interfaces';

@Component({
  selector: 'exp-strikes-table',
  templateUrl: './strikes-table.component.html',
  styleUrls: ['./strikes-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StrikesTableComponent implements OnInit {

  @ViewChild('strikesGridContainer', {read: ElementRef}) strikesGridContainer: ElementRef;

  @Input()
  set inputData(data: TradedStrikesTableDataObject) {
    if (data && data.allExpirations && data.tradedStrikesData) {
      this.inputDataBS.next(data);
      this.tableDataBS.next(data.tradedStrikesData);
      this.allExpirationsBS.next(data.allExpirations);
    }


  }
  get inputData() {
    return this.inputDataBS.value;

  }
  inputDataBS = new BehaviorSubject<TradedStrikesTableDataObject>({});

  tableDataBS = new BehaviorSubject<TradedStrikesDatum[]>([]);
  tableData$: Observable<TradedStrikesDatum[]> = this.tableDataBS;
  tableDataSlice: TradedStrikesDatum[] = [];

  allExpirationsBS = new BehaviorSubject<string[]>([]);
  allExpirations$: Observable<string[]> = this.allExpirationsBS;
  allExpirations: string[] = [];

  visibleColumns: string[] = [];

  columns: TableColumn[] = [];

  scrollItems = Array.from({length: 1000}).map((_, i) => `Item #${i}`);



  constructor() { 
    this.tableData$.pipe().subscribe(
      data => {
        console.log('sT ctor table data sub value: ', data);
        this.generateColumnsObject();
        // this.tableDataSlice = data.slice(0, 20);
        this.tableDataSlice = data;
      }

    );

    this.allExpirations$.pipe().subscribe(
      expirations => {
        this.allExpirations = Object.values(expirations);
        console.log('sT ctor expirations sub value: ', expirations);
        console.log('sT ctor Obj.vals(all exps): ', this.allExpirations);
        // this.visibleColumns = expirations;
        console.log('sT ctor visible columns: ', this.visibleColumns);
      }
    );
  }

  ngOnInit(): void {
    
  }

  generateColumnsObject() {
    const row = this.tableDataBS.value[1];
    if (row) {
      const keys = Object.keys(row);
      console.log('sT gCO row/keys: ', row, keys);

      for (const key of keys) {
        const column: TableColumn = {
          columnDef: key,
          header: key,
          cell: (datum: TradedStrikesDatum) => `${datum.value}`
        }

        this.columns.push(column);
      }

      console.log('sT gCO columns: ', this.columns);
      this.visibleColumns = this.columns.map(c => c.columnDef);

    }



  }

}
