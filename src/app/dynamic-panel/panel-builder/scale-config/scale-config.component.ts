import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'exp-scale-config',
  templateUrl: './scale-config.component.html',
  styleUrls: ['./scale-config.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScaleConfigComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
