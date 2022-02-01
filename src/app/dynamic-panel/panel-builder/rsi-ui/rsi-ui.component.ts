import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'exp-rsi-ui',
  templateUrl: './rsi-ui.component.html',
  styleUrls: ['./rsi-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RsiUiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
