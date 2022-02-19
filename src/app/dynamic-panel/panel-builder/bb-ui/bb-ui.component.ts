import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'exp-bb-ui',
  templateUrl: './bb-ui.component.html',
  styleUrls: ['./bb-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BbUiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
