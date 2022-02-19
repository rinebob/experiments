import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'exp-series-config',
  templateUrl: './series-config.component.html',
  styleUrls: ['./series-config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeriesConfigComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
