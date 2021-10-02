import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'exp-chart-settings',
  templateUrl: './chart-settings.component.html',
  styleUrls: ['./chart-settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartSettingsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
