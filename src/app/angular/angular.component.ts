/* tslint:disable:no-trailing-whitespace */
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-angular',
  templateUrl: './angular.component.html',
  styleUrls: ['./angular.component.scss']
})
export class AngularComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1;

  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'RxJs',
        link: './rxjs',
        index: 0
      },
      // {
      //   label: 'Counter',
      //   link: './counter',
      //   index: 0
      // },
      // {
      //   label: 'Tic-Tac-Toe',
      //   link: './tic-tac-toe',
      //   index: 1
      // },
      // {
      //   label: 'Weather',
      //   link: './weather',
      //   index: 2
      // },
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(
        this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

}
