import {Component, EventEmitter, HostBinding, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {OverlayContainer} from '@angular/cdk/overlay';
import { visVolMenuConfig, experimentsMenuConfig } from './common/main_menu_config';

@Component({
  selector: 'exp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  title = 'Experiments';
  opened: boolean;
  visvolMenuConfig = visVolMenuConfig;
  experimentsMenuConfig = experimentsMenuConfig;

  @HostBinding('class') className = '';

  toggleControl = new FormControl(false);
  @Output() menuClick = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit() {
    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkMode';
      this.className = darkMode ? darkClassName : '';
      // if (darkMode) {
      //   this.overlay.getContainerElement().classList.add(darkClassName);
      // } else {
      //   this.overlay.getContainerElement().classList.remove(darkClassName);
      // }
    })
  }

}
