import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'exp-flex-box',
  templateUrl: './flex-box.component.html',
  styleUrls: ['./flex-box.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FlexBoxComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
