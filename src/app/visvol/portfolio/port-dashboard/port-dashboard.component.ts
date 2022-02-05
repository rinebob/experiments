import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'exp-port-dashboard',
  templateUrl: './port-dashboard.component.html',
  styleUrls: ['./port-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortDashboardComponent implements OnInit {

  items = new Array(30);

  constructor() { }

  ngOnInit(): void {
  }

}
