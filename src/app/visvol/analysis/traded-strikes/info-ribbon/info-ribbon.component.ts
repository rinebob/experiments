import { Component, OnInit, ChangeDetectionStrategy, EventEmitter, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import {RibbonInfo} from '../../../../common/interfaces';
import { RIBBON_INFO_INITIALIZER} from '../../../../common/constants';

@Component({
  selector: 'exp-info-ribbon',
  templateUrl: './info-ribbon.component.html',
  styleUrls: ['./info-ribbon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoRibbonComponent implements OnInit {

  @Input()
  set ribbonInfo(info: RibbonInfo) {
    this.ribbonInfoBS.next(info);

  }
  get ribbonInfo() {
    return this.ribbonInfoBS.value;
  }
  private ribbonInfoBS = new BehaviorSubject<RibbonInfo>(RIBBON_INFO_INITIALIZER);


  constructor() { }

  ngOnInit(): void {
  }

}
