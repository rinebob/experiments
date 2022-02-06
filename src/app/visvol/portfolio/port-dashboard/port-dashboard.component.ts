import { Component, Input, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { OptionPosition } from 'src/app/common/option_interfaces';

@Component({
  selector: 'exp-port-dashboard',
  templateUrl: './port-dashboard.component.html',
  styleUrls: ['./port-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortDashboardComponent implements OnInit {
  @Input()
  set optionPositions(value: OptionPosition[]) {
    this.optionPositionsBS.next(value);
    console.log('pDC @i oP: ', value);

  }
  get optionPositions() {
    return this.optionPositionsBS.value;
  }
  private readonly optionPositionsBS = new BehaviorSubject<OptionPosition[]>([])

  constructor() { }

  ngOnInit(): void {
  }

}
