import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'exp-port-dashboard',
  templateUrl: './port-dashboard.component.html',
  styleUrls: ['./port-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
