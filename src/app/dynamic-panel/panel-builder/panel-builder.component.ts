import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'exp-panel-builder',
  templateUrl: './panel-builder.component.html',
  styleUrls: ['./panel-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PanelBuilderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
