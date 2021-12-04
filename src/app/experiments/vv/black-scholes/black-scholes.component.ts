import {ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { OHLCData } from 'src/app/common/interfaces';

import { BlackScholesInputs } from '../../../common/option_interfaces';

import { MSFTData_sample } from '../../../../assets/data/MSFT_21-1112_sample';
import * as fc from 'd3fc';



@Component({
  selector: 'exp-black-scholes',
  templateUrl: './black-scholes.component.html',
  styleUrls: ['./black-scholes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlackScholesComponent implements OnInit {

  // INPUT VARIABLES
  
  S0 = 0;   // S0 - price of underlying security ($)
  X = 0;     // X - option strike price ($)
  s = .25;    // s - implied volatility (% / yr as decimal)
  t = .25;      // t - time to expiration (percent of the year as decimal (i.e. 3 mo = .25 year))
  r = .02;     // r - risk free interest rate (% / yr as decimal)
  q = 0;      // q - dividend yield (% / yr as decimal).  If stock pays no dividend enter zero

  inputs: BlackScholesInputs[] = [
    {
      S0: 100,
      X: 100,
      s: .25,
      t: .15,
      r: .02,
      q: 0,
    },
    {
      S0: 103,
      X: 100,
      s: .3,
      t: .145,
      r: .02,
      q: 0,
    },
    {
      S0: 105,
      X: 100,
      s: .35,
      t: .14,
      r: .02,
      q: 0,
    },
    {
      S0: 107,
      X: 100,
      s: .4,
      t: .135,
      r: .02,
      q: 0,
    },
    {
      S0: 109,
      X: 100,
      s: .45,
      t: .13,
      r: .02,
      q: 0,
    },
    {
      S0: 111,
      X: 100,
      s: .5,
      t: .125,
      r: .02,
      q: 0,
    },
    
  ];

  constructor() { }

  ngOnInit(): void {

    this.generateStochastics(MSFTData_sample, 50, 10);

    // console.log('test dist cmtvNormalDis: ', this.cmtvNormalDis(2, 0, 1));
    // console.log('test dist2 normalCdf: ', this.normalCdf(2, 0, 1));
    // this.logPrices(this.inputs);
  }

  // =====================================
  // STOCHASTIC CALCULATOR

  // input data set, lookback period (n - calendar days) and smoothing factor (x - num periods)
  // output same data set with %K and %D lines added

  // %K = (current close - lowest low)/(highest high - lowest low) * 100
  // %D = x per ma of %K
  // all price ranges are over the last n days

  generateStochastics(data: OHLCData[], n: number, x: number) {
    console.log('bS gS input data[0], n, x: ', data[0], n, x)
    const newData: OHLCData[] = [];
    
    for (const datum of data ) {
      // let i;
      // const currentClose = datum.close;
      // const lowestLow = 


      
      
      
      
      
      
      // console.log('bS gS input datum close: ', datum.close)
    }



    return newData;
    
  }

// ==============================================
//  BLACK-SCHOLES CALCULATOR FUNCTIONS


//    WolframAlpha
//   function normalcdf(mean, sigma, to) 
// {
//     var z = (to-mean)/Math.sqrt(2*sigma*sigma);
//     var t = 1/(1+0.3275911*Math.abs(z));
//     var a1 =  0.254829592;
//     var a2 = -0.284496736;
//     var a3 =  1.421413741;
//     var a4 = -1.453152027;
//     var a5 =  1.061405429;
//     var erf = 1-(((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*Math.exp(-z*z);
//     var sign = 1;
//     if(z < 0)
//     {
//         sign = -1;
//     }
//     return (1/2)*(1+sign*erf);
// }

  // this one works
  normalCdf( to: number, mean: number = 0, sigma: number = 1) {
    const z = (to-mean)/Math.sqrt(2*sigma*sigma);
    const t = 1/(1+0.3275911*Math.abs(z));
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const erf = 1-(((((a5*t + a4)*t) + a3)*t + a2)*t + a1)*t*Math.exp(-z*z);
    let sign = 1;
    if (z < 0) sign = -1;

    return (1/2)*(1+sign*erf);
  }

  // from math.ucla.edu/~tom/distributions/normal.html
  // function normalcdf(X){   //HASTINGS.  MAX ERROR = .000001
  //   var T=1/(1+.2316419*Math.abs(X));
  //   var D=.3989423*Math.exp(-X*X/2);
  //   var Prob=D*T*(.3193815+T*(-.3565638+T*(1.781478+T*(-1.821256+T*1.330274))));
  //   if (X>0) {
  //     Prob=1-Prob
  //   }
  //  // from the wrapper
  //   Prob=round(100000*Prob)/100000;
  //   return Prob
  // } 

  // doesn't work
  cmtvNormalDis(Z: number, M = 0, SD = 1) {
    const val = (Z-M/SD);
    
    const T = 1 / (1 + .2316419 * Math.abs(val));
    const D = .3989423 * Math.exp(-val * val / 2);
    let prob = D * T * ( .3193815 + T * (-3565638 + T * ( 1.781478 + T * ( -1.821256 + T * 1.330274 ))));
    prob = val > 0 ? 1 - prob : prob;
    prob = Math.round(100000 * prob) / 100000;

    return prob;
  }
  
  // call price = S0 * e^-qt * N(d1) - X * e-rt * N(d2)
  // put price = X * e^-rt * N(-d2) - S0 * e^-qt * N(-d1)
  // N - cmtv normal dist.  see src/app/assets/cumtv_normal_dist.txt
  // d1 = [ ln(S0/X) + t(r-q+s^2/2) ] / s sqrt(t)
  // d2 = d1 - s * sqrt(t)
  
  getCallAndPutPrice(inputs: BlackScholesInputs) {
    const lnS0X = Math.log(inputs.S0 / inputs.X);
    const trs2 = inputs.t * (inputs.r -inputs.q + Math.pow(inputs.s, 2) / 2);
    const ssqrtt = inputs.s * Math.sqrt(inputs.t);
    const d1 = (lnS0X + trs2) / ssqrtt;
    const d2 = d1 - ssqrtt;
    // const Nd1 = this.cmtvNormalDis(d1);
    // const Nd2 = this.cmtvNormalDis(d2);
    // const Nmd1 = this.cmtvNormalDis(-d1); // m = minus
    // const Nmd2 = this.cmtvNormalDis(-d2);
    const Nd1 = this.normalCdf(d1);
    const Nd2 = this.normalCdf(d2);
    const Nmd1 = this.normalCdf(-d1); // m = minus
    const Nmd2 = this.normalCdf(-d2);
    const eqt = Math.pow(Math.E, -inputs.q * inputs.t);
    const ert = Math.pow(Math.E, -inputs.r * inputs.t);

    const callPrice = inputs.S0 * eqt * Nd1 - inputs.X * ert * Nd2;
    const putPrice = inputs.X * ert * Nmd2 - inputs.S0 * eqt * Nmd1;

    console.log('lnS0X: ', lnS0X,' trs2: ', trs2,' ssqrtt: ', ssqrtt);
    console.log(' d1: ', d1,' d2: ', d2);
    console.log(' Nd1: ', Nd1,' Nd2: ', Nd2);
    console.log('Nmd1: ', Nmd1, 'Nmd2: ', Nmd2, ' eqt: ', eqt, ' ert: ', ert);
    console.log(' eqt: ', eqt, ' ert: ', ert);
    console.log('call price: ', callPrice, ' put price: ', putPrice);
    console.log('long straddle price: ', callPrice + putPrice);

    return { callPrice, putPrice }
}

  logPrices(inputs: BlackScholesInputs[]) {
    for (const input of inputs) {
      console.table(input);
      this.getCallAndPutPrice(input);
    }
  }

  // ============================================== 

}
