import { Component, EventEmitter, OnInit, ChangeDetectionStrategy, Output } from '@angular/core';


@Component({
  selector: 'exp-slim-nav-bar',
  templateUrl: './slim-nav-bar.component.html',
  styleUrls: ['./slim-nav-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlimNavBarComponent implements OnInit {
  @Output() selectedComponent = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  handleClick(component: string) {
    console.log('sNB hC selectedComponent: ', component);
    this.selectedComponent.emit(component);
  }

}
