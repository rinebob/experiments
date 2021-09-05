import { Component, EventEmitter, OnInit, ChangeDetectionStrategy, Output, Input, SimpleChanges } from '@angular/core';

import {BehaviorSubject, Observable} from 'rxjs';

import { GalleryViewOptions, NavBarSelection } from 'src/app/common/interfaces';


// interface NavBarSelection {
//   buttonText: string;
//   destination: string;
// }

// enum GalleryViewOptions {
//   FULLSCREEN = 'fullscreen',
//   GALLERY = 'gallery',
//   FILMSTRIP = 'filmstrip',

// } 

// const galleryNavSelections = [
//   {buttonText: GalleryViewOptions.FULLSCREEN},
//   {buttonText: GalleryViewOptions.GALLERY},
//   {buttonText: GalleryViewOptions.FILMSTRIP},

// ];


@Component({
  selector: 'exp-slim-nav-bar',
  templateUrl: './slim-nav-bar.component.html',
  styleUrls: ['./slim-nav-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SlimNavBarComponent implements OnInit {
  @Input() selectionOptions: NavBarSelection[] = [];
  @Output() selection = new EventEmitter<string>();

  navBarSelectionsBS = new BehaviorSubject<NavBarSelection[]>([]);
  navBarSelections$: Observable<NavBarSelection[]> = this.navBarSelectionsBS;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectionOptions']) {
      console.log('pT ngOC changes-selectionOptions: ', changes['selectionOptions']);
      const data: NavBarSelection[] = (changes['selectionOptions']).currentValue;
      this.navBarSelectionsBS.next(data);
      for (const datum of this.navBarSelectionsBS.value) {
        // console.log('pT ngOI datum: ', datum);
      }
    }

    

  }

  ngOnInit(): void {
  }

  handleClick(selection: string) {
    console.log('sNB hC selection: ', selection);
    this.selection.emit(selection);
  }

}
