import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'exp-stoch-ui',
  templateUrl: './stoch-ui.component.html',
  styleUrls: ['./stoch-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StochUiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
