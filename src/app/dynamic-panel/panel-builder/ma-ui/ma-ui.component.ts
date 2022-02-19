import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'exp-ma-ui',
  templateUrl: './ma-ui.component.html',
  styleUrls: ['./ma-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaUiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
