import { AfterViewInit, Component, OnInit, ChangeDetectionStrategy, Input, OnChanges, SimpleChanges } from '@angular/core';

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
export class BaseChartComponent implements AfterViewInit, OnChanges, OnInit {
  // @Input() chartData: PickerTableData = DEFAULT_PICKER_TABLE_DATUM;
  // @Input() chartMode: GalleryChartMode = GalleryChartMode.FULLSCREEN_MODE;
  // @Input() chartDimensions: ChartDimensions = DEFAULT_CHART_DIMENSIONS;
  

  @Input()
  set chartData(data: PickerTableData) {
    console.log('bC chartData input data: ', data);
    this.chartDataBS.next(data);
  }
  get chartData() {
    return this.chartDataBS.value;
  }
  
  @Input()
  set chartMode(mode: GalleryChartMode) {
    console.log('bC chartMode input mode: ', mode);
    this.chartModeBS.next(mode);
  }
  get chartMode() {
    return this.chartModeBS.value;
  }





  readonly chartDataBS = new BehaviorSubject<PickerTableData>(DEFAULT_PICKER_TABLE_DATUM);
  readonly chartData$: Observable<PickerTableData> = this.chartDataBS;

  readonly chartModeBS = new BehaviorSubject<GalleryChartMode>(GalleryChartMode.FULLSCREEN_MODE);
  readonly chartMode$: Observable<GalleryChartMode> = this.chartModeBS;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    console.log('bC ngOC changes: ', changes);
    if (changes['chartData']) {
      // console.log('bC ngOC changes-chartData: ', changes['chartData'].currentValue);
      

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
    console.log('bC ngOI chart data: ', this.chartDataBS.value);
  }
  
  ngAfterViewInit() {
    console.log('bC ngAVI chart data: ', this.chartDataBS.value);
    
  }

}
