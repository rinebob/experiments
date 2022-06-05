import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'exp-strikes-table',
  templateUrl: './strikes-table.component.html',
  styleUrls: ['./strikes-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StrikesTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
