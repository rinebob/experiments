import {ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'exp-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalysisComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
