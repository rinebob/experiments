import {ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'exp-black-scholes',
  templateUrl: './black-scholes.component.html',
  styleUrls: ['./black-scholes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlackScholesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
