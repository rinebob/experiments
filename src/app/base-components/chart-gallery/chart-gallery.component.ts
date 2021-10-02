import { AfterViewInit, Component, OnChanges, OnInit, ChangeDetectionStrategy, Input, SimpleChanges, ViewChild, ViewContainerRef, TemplateRef, ViewRef } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { GalleryChartMode, GalleryViewOption, NavBarSelection, PickerTableData } from 'src/app/common/interfaces';
import { DEFAULT_PICKER_TABLE_DATUM } from 'src/app/common/constants';

// const FULLSCREEN = 'fullscreen';
// const GALLERY = 'gallery';
// const FILMSTRIP = 'filmstrip';


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
  // @Input() navSelections: NavBarSelection[] = [];
  // @Input() gallerySelection: GalleryViewOption;
  // @Input() mainChart: PickerTableData = DEFAULT_PICKER_TABLE_DATUM;
  // @Input() galleryData: PickerTableData[] = [];
  

  @Input() 
  set gallerySelection(selection: GalleryViewOption) {
    this.gallerySelectionBS.next(selection);
  }
  get gallerySelection() {
    return this.gallerySelectionBS.value;
  }

  @Input() 
  set mainChart(data: PickerTableData) {
    this.mainChartBS.next(data);
  }
  get mainChart() {
    return this.mainChartBS.value;
  }

  @Input() 
  set galleryData(data: PickerTableData[]) {
    this.galleryDataBS.next(data);
  }
  get galleryData() {
    return this.galleryDataBS.value;
  }

  readonly gallerySelectionBS = new BehaviorSubject<GalleryViewOption | undefined>(undefined);
  readonly gallerySelection$: Observable<GalleryViewOption> = this.gallerySelectionBS;
  
  readonly mainChartBS = new BehaviorSubject<PickerTableData>(DEFAULT_PICKER_TABLE_DATUM);
  readonly mainChart$: Observable<PickerTableData> = this.mainChartBS;

  readonly galleryDataBS = new BehaviorSubject<PickerTableData[]>([]);
  readonly galleryData$: Observable<PickerTableData[]> = this.galleryDataBS;

  fullTpl: ViewRef;
  galTpl: ViewRef;
  stripTpl: ViewRef;

  showFull = false;
  showGal = false;
  showStrip = false;

  constructor(public viewContainerRef: ViewContainerRef) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['mainChart']) {
      console.log('cG ngOC changes mainChart: ', changes['mainChart']);
      const data: PickerTableData = (changes['mainChart']).currentValue;
      this.mainChartBS.next(data);
    }
    if (changes['galleryData']) {
      console.log('cG ngOC changes galleryData: ', changes['galleryData']);
      const data: PickerTableData[] = (changes['galleryData']).currentValue;
      this.galleryDataBS.next(data);
    }
    if (changes['gallerySelection']) {
      console.log('cG ngOC changes gallerySelection: ', changes['gallerySelection'].currentValue);
      this.gallerySelectionBS.next(changes['gallerySelection'].currentValue);
      
      if (this.fullscreenTpl || this.galleryTpl || this.filmstripTpl) {
        console.log('cG ngOC changes if block for handle nav selection');
        this.handleNavSelection(this.gallerySelectionBS.value);

      }
      
    }

  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    console.log('cG ngAVI gallery selection: ', this.gallerySelectionBS.value);
    console.log('cG ngAVI main chart BS: ', this.mainChartBS.value);
    this.handleNavSelection(GalleryViewOption.FULLSCREEN);
    // console.log('cG ngAVI container ref: ', this.viewContainer);
    // console.log('cG ngAVI fullscreenTpl ref: ', this.fullscreenTpl);
  }

  handleNavSelection(selection: GalleryViewOption) {
    console.log('cG hNS selection: ', selection);
    switch(selection) { 
      case GalleryViewOption.FULLSCREEN: { 
        this.showFullscreen();
        break; 
     } 
     case GalleryViewOption.GALLERY: { 
        this.showGallery();
        break; 
     } 
     case GalleryViewOption.FILMSTRIP: { 
       this.showFilmstrip();
       break; 
     }
     default: { 
        console.log('Cg hNS default dude wtf you doin here???')
        break; 
     } 
   } 
  }

  showFullscreen() {
    console.log('cG sFu show fullscreen called');
    this.fullTpl = this.fullscreenTpl.createEmbeddedView();
    this.updateViewContainer(this.fullTpl);
  }

  showGallery() {
    console.log('cG sG show gallery called');
    this.galTpl = this.galleryTpl.createEmbeddedView();
    this.updateViewContainer(this.galTpl);
  }

  showFilmstrip() {
    console.log('cG sFi show filmstrip called');
    this.stripTpl = this.filmstripTpl.createEmbeddedView();
    this.updateViewContainer(this.stripTpl);
  }

  updateViewContainer(view: ViewRef) {
    console.log('cG uVC viewRef: ', view);
    console.log('cG uVC viewContainer: ', this.viewContainer);
    this.viewContainer.clear();
    this.viewContainer.insert(view);

  }

}
