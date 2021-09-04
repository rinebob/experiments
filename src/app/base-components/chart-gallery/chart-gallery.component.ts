import { Component, OnChanges, OnInit, ChangeDetectionStrategy, Input, SimpleChanges } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { PickerTableData } from 'src/app/common/interfaces';
@Component({
  selector: 'exp-chart-gallery',
  templateUrl: './chart-gallery.component.html',
  styleUrls: ['./chart-gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChartGalleryComponent implements OnInit {
  @Input() galleryData: any[] = [];

  readonly galleryDataBS = new BehaviorSubject<PickerTableData[]>([]);
  readonly galleryData$: Observable<PickerTableData[]> = this.galleryDataBS;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['galleryData']) {
      console.log('cG ngOC changes-galleryData: ', changes['galleryData']);
      

      const data: PickerTableData[] = (changes['galleryData']).currentValue;
      this.galleryDataBS.next(data);
    }

  }

  ngOnInit(): void {
  }

}
