import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'exp-datasource-ui',
  templateUrl: './datasource-ui.component.html',
  styleUrls: ['./datasource-ui.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatasourceUiComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
