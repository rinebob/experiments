import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { formatNumber, DecimalPipe } from '@angular/common';
import { FormGroup, FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';

import { BlackScholesCalculatorConfig, BlackScholesInputs} from '../../../../common/option_interfaces';
import { BLACK_SCHOLES_INPUTS, BLACK_SCHOLES_CONFIG_INITIALIZER, BLACK_SCHOLES_INITIALIZER, BLACK_SCHOLES_OUTPUT_INITIALIZER, DAYS_IN_A_YEAR, } from '../../../../common/constants';
import { BlackScholesService } from '../black-scholes.service';

@Component({
  selector: 'exp-bs-calculator',
  templateUrl: './bs-calculator.component.html',
  styleUrls: ['./bs-calculator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BsCalculatorComponent implements OnInit {
  configFormValuesBS = new BehaviorSubject<BlackScholesCalculatorConfig>(BLACK_SCHOLES_CONFIG_INITIALIZER);

  constructor(private readonly bsService: BlackScholesService ) { }

  ngOnInit(): void {
  }

  // generate series for one strike
  generatePriceProjectionDataSeries(strike: number = 100) {
    console.log('---------------- gPPD Series.  strike: ', strike ,' --------------------');
    const config = this.configFormValuesBS.value;
    // console.log('bSC gPPD Series input config:')
    // console.table(config);

    const data = [];
    const {undPriceMin, undPriceMax, timeMin, timeMax, volMin, volMax, numDataPoints} = config;
  
    const priceInterval = (undPriceMax - undPriceMin) / numDataPoints;
    const timeInterval = (timeMax - timeMin) / numDataPoints;
    const volInterval = (volMax - volMin) / numDataPoints;

    for (let i = 0; i <= numDataPoints; i++ ) {
      const datum = {
        S0: undPriceMin + (priceInterval * i),
        X: strike,
        t: timeMax - (timeInterval * i),
        s: volMin + (volInterval * i),
        q: 0,
        r: 0.02,
      }
      
      
      const oPWG = this.getOptionPriceWithGreeks(datum);
      // console.log('bSC gPPD Series oPWG:', oPWG);
      
      datum['callPrice'] = oPWG.callPrice;
      datum['callDelta'] = oPWG.callDelta;
      datum['callTheta'] = oPWG.callTheta;
      datum['putPrice'] = oPWG.putPrice;
      datum['putDelta'] = oPWG.putDelta;
      datum['putTheta'] = oPWG.putTheta;
      datum['gamma'] = oPWG.gamma;
      datum['vega'] = oPWG.vega;
      datum['rho'] = oPWG.rho;
      

      // console.log('bSC gPPD Series output datum:');
      // console.table(datum);
      data.push(datum);
    }
    // console.log('bSC gPPD Series final data:', data);
    return data;
  }

  handleGenerateDataSet(event: BlackScholesCalculatorConfig) {
    console.log('bSC hGDS handle generate data set called.  event: ', event);
    this.configFormValuesBS.next(event);
    this.generatePriceProjectionDataSet();
  }

  generatePriceProjectionDataSet() {
    console.log('---------------- gPPD Set --------------------');
    const config = this.configFormValuesBS.value;
    // console.log('bSC gPPD Set input config:')
    // console.table(config);
    const {strikeMin, strikeMax, strikeIncrement} = config;

    const numStrikes = Math.floor((strikeMax - strikeMin) / strikeIncrement);
    const strikeInterval = Math.floor((strikeMax - strikeMin) / numStrikes);
    console.log('bSC gPPD strikeInterval/numStrikes: ', strikeInterval, numStrikes);

    const dataSet = [];

    for (let i = 0; i <+ numStrikes; i++) {
      const strike = strikeMin + (i * strikeInterval)
      // console.log('bSC gPPD Set strike: ', strike)
      const seriesAtStrike = {
        strike,
        series: this.generatePriceProjectionDataSeries(strike)
      }
      
      // console.log('bSC gPPD series at strike: ', seriesAtStrike)
      dataSet.push(seriesAtStrike);
    }

    console.log('bSC gPPD Set final data set: ', dataSet);
    for (const set of dataSet.values()) {
      console.log('strike: ', set.strike);
      console.table(set.series)

    }
    return dataSet;
  }
    
  getOptionPriceWithGreeks(input: BlackScholesInputs) {
    const pricesAndGreeks = this.bsService.getOneOptionPriceWithGreeks(input);
    // console.log('bSC c pricesAndGreeks: ', pricesAndGreeks);
    // console.log('bSC c t.oPWG: ', this.oPWG);

    return pricesAndGreeks;

  }
}
