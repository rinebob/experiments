import { AfterViewInit, Component, OnChanges, OnInit, ChangeDetectionStrategy, Input, SimpleChanges, ViewChild, ViewContainerRef, TemplateRef, ViewRef } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { GalleryViewOptions, NavBarSelection, PickerTableData } from 'src/app/common/interfaces';
import { DEFAULT_PICKER_TABLE_DATUM } from 'src/app/common/constants';

const FULLSCREEN = 'fullscreen';
const GALLERY = 'gallery';
const FILMSTRIP = 'filmstrip';


@Component({
  selector: 'exp-chart-gallery',
  templateUrl: './chart-gallery.component.html',
  styleUrls: ['./chart-gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartGalleryComponent implements AfterViewInit, OnInit {
  @ViewChild('container', {read: ViewContainerRef}) viewContainer!: ViewContainerRef;
  @ViewChild('fullscreen', {read: TemplateRef}) fullscreenTpl;
  @ViewChild('gallery', {read: TemplateRef}) galleryTpl;
  @ViewChild('filmstrip', {read: TemplateRef}) filmstripTpl;
  @Input() navSelections: NavBarSelection[] = [];
  @Input() mainChart: PickerTableData = DEFAULT_PICKER_TABLE_DATUM;
  @Input() galleryData: PickerTableData[] = [];

  readonly galleryDataBS = new BehaviorSubject<PickerTableData[]>([]);
  readonly galleryData$: Observable<PickerTableData[]> = this.galleryDataBS;

  readonly mainChartBS = new BehaviorSubject<PickerTableData>(DEFAULT_PICKER_TABLE_DATUM);
  readonly mainChart$: Observable<PickerTableData> = this.mainChartBS;

  fullTpl: ViewRef;
  galTpl: ViewRef;
  stripTpl: ViewRef;

  showFull = false;
  showGal = false;
  showStrip = false;

  constructor(public viewContainerRef: ViewContainerRef) { }

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

  ngAfterViewInit() {
    console.log('cG ngAVI container ref: ', this.viewContainer);
    console.log('cG ngAVI fullscreenTpl ref: ', this.fullscreenTpl);
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
    this.fullTpl = this.fullscreenTpl.createEmbeddedView();
    this.updateView(FULLSCREEN);
    this.showFull = true;
    this.showGal = false;
    this.showStrip = false;
    this.viewContainer.clear();
    this.viewContainer.insert(this.fullTpl);

  }
  showGallery() {
    console.log('bCV sG show gallery called');
    this.galTpl = this.galleryTpl.createEmbeddedView();
    this.updateView(GALLERY);
    this.showFull = false;
    this.showGal = true;
    this.showStrip = false;
    this.viewContainer.clear();
    this.viewContainer.insert(this.galTpl);

  }
  showFilmstrip() {
    console.log('bCV sFi show filmstrip called');
    this.stripTpl = this.filmstripTpl.createEmbeddedView();
    this.updateView(FILMSTRIP);
    this.showFull = false;
    this.showGal = false;
    this.showStrip = true;
    this.viewContainer.clear();
    this.viewContainer.insert(this.stripTpl);

  }

  updateView(view: string) {
    console.log('cG uV view: ', view);
  }

}
