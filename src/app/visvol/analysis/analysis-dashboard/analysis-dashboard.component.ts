import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'exp-analysis-dashboard',
  templateUrl: './analysis-dashboard.component.html',
  styleUrls: ['./analysis-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnalysisDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
