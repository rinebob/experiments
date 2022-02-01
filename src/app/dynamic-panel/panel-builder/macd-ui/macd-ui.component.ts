import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'exp-macd-ui',
  templateUrl: './macd-ui.component.html',
  styleUrls: ['./macd-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MacdUiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
