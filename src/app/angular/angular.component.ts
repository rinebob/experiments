/* tslint:disable:no-trailing-whitespace */
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { NavigationLink } from 'src/app/common/interfaces';

const NAVIGATION_LINKS = [
  {
    label: 'RxJs',
    link: './rxjs',
    index: 0
  },
  {
    label: 'Controls',
    link: './controls',
    index: 1
  },
  {
    label: 'Buttons',
    link: './color-button',
    index: 2
  },
  {
    label: 'Flexbox',
    link: './flexbox',
    index: 3
  },
  // {
  //   label: 'Weather',
  //   link: './weather',
  //   index: 2
  // },
];

@Component({
  selector: 'app-angular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.scss']
})
export class AngularComponent implements OnInit {
  title = 'Angular';
  navLinks: NavigationLink[] = NAVIGATION_LINKS;
  activeLinkIndex = -1;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(
        this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

}
