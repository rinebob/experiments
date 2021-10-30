import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'exp-data-controls',
  templateUrl: './data-controls.component.html',
  styleUrls: ['./data-controls.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DataControlsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
