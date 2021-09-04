import {ChangeDetectionStrategy, Component, EventEmitter, HostBinding, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {OverlayContainer} from '@angular/cdk/overlay';


@Component({
  selector: 'exp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  title = 'Experiments';
  opened: boolean;

  @HostBinding('class') className = '';

  toggleControl = new FormControl(false);
  @Output() menuIconClick = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
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
