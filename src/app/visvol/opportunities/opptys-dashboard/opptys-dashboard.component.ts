import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'exp-opptys-dashboard',
  templateUrl: './opptys-dashboard.component.html',
  styleUrls: ['./opptys-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OpptysDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
