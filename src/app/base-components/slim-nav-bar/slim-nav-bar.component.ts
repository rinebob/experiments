import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'vz-slim-nav-bar',
  templateUrl: './slim-nav-bar.component.html',
  styleUrls: ['./slim-nav-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlimNavBarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
