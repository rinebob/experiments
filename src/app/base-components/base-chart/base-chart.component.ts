import { Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { ChartDimensions, GalleryChartMode, PickerTableData } from 'src/app/common/interfaces';
import { DEFAULT_PICKER_TABLE_DATUM } from 'src/app/common/constants';
import { DEFAULT_CHART_DIMENSIONS,  } from 'src/app/common/constants';

@Component({
  selector: 'exp-base-chart',
  templateUrl: './base-chart.component.html',
  styleUrls: ['./base-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseChartComponent implements OnChanges, OnInit {
  @Input() chartData: PickerTableData = DEFAULT_PICKER_TABLE_DATUM;
  @Input() chartMode: GalleryChartMode = GalleryChartMode.FULLSCREEN_MODE;
  // @Input() chartDimensions: ChartDimensions = DEFAULT_CHART_DIMENSIONS;

  readonly chartDataBS = new BehaviorSubject<PickerTableData>(DEFAULT_PICKER_TABLE_DATUM);
  readonly chartData$: Observable<PickerTableData> = this.chartDataBS;

  readonly chartModeBS = new BehaviorSubject<GalleryChartMode>(GalleryChartMode.FULLSCREEN_MODE);
  readonly chartMode$: Observable<GalleryChartMode> = this.chartModeBS;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['chartData']) {
      // console.log('bC ngOC changes-chartData: ', changes['chartData']);
      

      const data: PickerTableData = (changes['chartData']).currentValue;
      this.chartDataBS.next(data);
    }

    if (changes['chartMode']) {
      // console.log('bC ngOC changes-chartMode: ', changes['chartMode']);
      

      const data: GalleryChartMode = (changes['chartMode']).currentValue;
      this.chartModeBS.next(data);
    }

  }

  ngOnInit(): void {
  }

}
