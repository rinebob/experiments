import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {

  title = 'World\'s Coolest Counter';
  count = 0;

  constructor() { }

  ngOnInit(): void {
  }

  handleIncrease = () => {
    this.count = this.count + 1;
  }

  handleDecrease = () => {
    this.count = this.count - 1;
  }

  resetCount = () => {
    this.count = 0;
  }

}
