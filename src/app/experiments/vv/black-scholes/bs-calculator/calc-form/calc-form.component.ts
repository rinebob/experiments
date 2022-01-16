import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'exp-calc-form',
  templateUrl: './calc-form.component.html',
  styleUrls: ['./calc-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalcFormComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
