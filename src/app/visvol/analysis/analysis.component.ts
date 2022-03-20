import {ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { ExpriationTimeDistanceLabel } from '../../common/option_interfaces';
import { ALL_OPTION_CONFIGS_LIST} from '../../common/option_configs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'exp-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnalysisComponent implements OnInit {

  readonly expirations = Object.values(ExpriationTimeDistanceLabel);
  readonly configsList = ALL_OPTION_CONFIGS_LIST;

  symbolControl = new FormControl('');
  openDateControl = new FormControl('');
  expirationControl = new FormControl('');
  optionConfigControl = new FormControl('');
  nameControl = new FormControl('');
  configForm: FormGroup;
  

  constructor() { }

  ngOnInit(): void {
    console.log('a ngOI expirations: ', this.expirations);

    this.configForm = new FormGroup({
      'symbolControl' : this.symbolControl,
      'openDateControl' : this.openDateControl,
      'expirationControl' : this.expirationControl,
      'optionConfigControl' : this.optionConfigControl,
      'nameControl' : this.nameControl,
    });

  }

}
