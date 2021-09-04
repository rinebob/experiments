import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { MdbCarouselComponent } from 'mdb-angular-ui-kit/carousel';

@Component({
  selector: 'vz-carousel-viewer',
  templateUrl: './carousel-viewer.component.html',
  styleUrls: ['./carousel-viewer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CarouselViewerComponent implements OnInit {
  @ViewChild('carousel') carousel!: MdbCarouselComponent;

  constructor() { }

  ngOnInit(): void {
    
  }

  stopCarousel() {
    this.carousel.stop();
  }

}
