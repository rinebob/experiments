import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'vz-carousel-viewer',
  templateUrl: './carousel-viewer.component.html',
  styleUrls: ['./carousel-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselViewerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
