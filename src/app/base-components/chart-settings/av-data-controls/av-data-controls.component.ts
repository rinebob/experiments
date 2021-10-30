import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'exp-av-data-controls',
  templateUrl: './av-data-controls.component.html',
  styleUrls: ['./av-data-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvDataControlsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
