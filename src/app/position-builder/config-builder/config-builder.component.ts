import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'exp-config-builder',
  templateUrl: './config-builder.component.html',
  styleUrls: ['./config-builder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigBuilderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
