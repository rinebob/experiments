

/* tslint:disable:no-trailing-whitespace */
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1;

  constructor(private router: Router) {
    this.navLinks = [
      {
        label: 'Counter',
        link: './counter',
        index: 0
      },
      {
        label: 'Tic-Tac-Toe',
        link: './tic-tac-toe',
        index: 1
      },
      {
        label: 'Weather',
        link: './weather',
        index: 2
      },
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(
        this.navLinks.find(tab => tab.link === '.' + this.router.url));
    });
  }

}
