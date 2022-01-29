import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'exp-pane-config',
  templateUrl: './pane-config.component.html',
  styleUrls: ['./pane-config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaneConfigComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
