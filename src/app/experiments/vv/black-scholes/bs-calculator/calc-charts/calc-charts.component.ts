import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'exp-calc-charts',
  templateUrl: './calc-charts.component.html',
  styleUrls: ['./calc-charts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalcChartsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
