import { Component, OnChanges, OnInit, ChangeDetectionStrategy, Input, SimpleChanges } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { GalleryViewOptions, NavBarSelection, PickerTableData } from 'src/app/common/interfaces';
import { DEFAULT_PICKER_TABLE_DATUM } from 'src/app/common/constants';

@Component({
  selector: 'exp-chart-gallery',
  templateUrl: './chart-gallery.component.html',
  styleUrls: ['./chart-gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartGalleryComponent implements OnInit {
  @Input() navSelections: NavBarSelection[] = [];
  @Input() mainChart: PickerTableData = DEFAULT_PICKER_TABLE_DATUM;
  @Input() galleryData: PickerTableData[] = [];

  readonly galleryDataBS = new BehaviorSubject<PickerTableData[]>([]);
  readonly galleryData$: Observable<PickerTableData[]> = this.galleryDataBS;

  readonly mainChartBS = new BehaviorSubject<PickerTableData>(DEFAULT_PICKER_TABLE_DATUM);
  readonly mainChart$: Observable<PickerTableData> = this.mainChartBS;

  fullscreen = false;
  gallery = true;
  filmstrip = false;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['mainChart']) {
      console.log('cG ngOC changes-mainChart: ', changes['mainChart']);
      

      const data: PickerTableData = (changes['mainChart']).currentValue;
      this.mainChartBS.next(data);
    }
    if (changes['galleryData']) {
      console.log('cG ngOC changes-galleryData: ', changes['galleryData']);
      

      const data: PickerTableData[] = (changes['galleryData']).currentValue;
      this.galleryDataBS.next(data);
    }

  }

  ngOnInit(): void {
  }

  handleNavSelection(selection: string) {
    console.log('bCV hNS selection: ', selection);
    switch(selection) { 
      case GalleryViewOptions.FULLSCREEN: { 
        this.showFullscreen();
        break; 
     } 
     case GalleryViewOptions.GALLERY: { 
        this.showGallery();
        break; 
     } 
     case GalleryViewOptions.FILMSTRIP: { 
       this.showFilmstrip();
       break; 
     }
     default: { 
        console.log('bCV hNS default dude wtf you doin here???')
        break; 
     } 
   } 
  }

  showFullscreen() {
    console.log('bCV sFu show fullscreen called');
    this.fullscreen = true;
    this.gallery = false;
    this.filmstrip = false;

  }
  showGallery() {
    console.log('bCV sG show gallery called');
    this.fullscreen = false;
    this.gallery = true;
    this.filmstrip = false;

  }
  showFilmstrip() {
    console.log('bCV sFi show filmstrip called');
    this.fullscreen = false;
    this.gallery = false;
    this.filmstrip = true;

  }

}
