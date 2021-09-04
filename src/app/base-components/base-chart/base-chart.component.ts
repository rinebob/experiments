import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'vz-base-chart',
  templateUrl: './base-chart.component.html',
  styleUrls: ['./base-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseChartComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
