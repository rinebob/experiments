import { Component, OnInit } from '@angular/core';

import { DatesService } from '../services/dates.service';
import { PositionBuilderService } from '../services/position-builder.service';
import { nflxData } from 'src/assets/data/nflx_21-0917';
import { tslaData } from 'src/assets/data/tsla_21-0917';
import { OptionSpreadConfig } from '../common/option_interfaces';
import * as legs from '../common/option_legs';
import * as configs from '../common/option_configs';

@Component({
  selector: 'app-position-builder',
  templateUrl: './position-builder.component.html',
  styleUrls: ['./position-builder.component.scss']
})
export class PositionBuilderComponent implements OnInit {

  private readonly configs: OptionSpreadConfig[] = [
    configs.ATM_LONG_STRADDLE,
  ];

  constructor(private readonly datesService: DatesService,
    private readonly posnBuilderService: PositionBuilderService
    ) { }

  ngOnInit(): void {

    // this.datesService.getNow();
    // this.datesService.getDateTimeParts(new Date(2019, 0, 1));
    // this.datesService.generateTradingDates(new Date(2019, 0, 1), new Date());

    // const nflxDates = this.posnBuilderService.generateTradingDates(nflxData);
    const tslaDates = this.posnBuilderService.generateTradingDates(tslaData);

    // console.log('pBC ngOI this.configs: ', this.configs);

    // const tslaStrikes = this.posnBuilderService.generateStrikesForAllData(tslaDates, this.configs);

    let tslaOptionPositions = this.posnBuilderService.generateOptionPositionObjects(tslaDates, 'TSLA', configs.ATM_LONG_STRADDLE);

    tslaOptionPositions = this.posnBuilderService.generateSymbolsForPositions(tslaOptionPositions);

    console.log('pBC ngOI tslaOptionPositions: ', tslaOptionPositions);


  }

  


}
