import {ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { OHLCData } from 'src/app/common/interfaces';

import { BlackScholesInputs } from '../../../common/option_interfaces';

import { MSFTData_sample } from '../../../../assets/data/MSFT_21-1112_sample';
import { BLACK_SCHOLES_INPUTS, DAYS_IN_A_YEAR } from '../../../common/constants';
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
  T = 365;  // T - number of days per year can be calendar or trading but must be consistent

  inputs: BlackScholesInputs[] = BLACK_SCHOLES_INPUTS;

  
  constructor() { }

  ngOnInit(): void {

    // this.generateStochastics(MSFTData_sample, 50, 10);

    // console.log('test dist cmtvNormalDis: ', this.cmtvNormalDis(2, 0, 1));
    // console.log('test dist2 normalCdf: ', this.normalCdf(2, 0, 1));
    // this.getOptionPricesAndGreeks(this.inputs);
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

  // N - cmtv normal dist.  see src/app/assets/cumtv_normal_dist.txt
  // d1 = [ ln(S0/X) + t(r-q+s^2/2) ] / s sqrt(t)
  //  =     lnS0X         trs2          ssqrtt

  // d2 = d1 - s * sqrt(t)
  
  // call price = S0 * e^-qt * N(d1) - X * e-rt * N(d2)
  // put price = X * e^-rt * N(-d2) - S0 * e^-qt * N(-d1)

  // call delta = e-qt * N(d1)
  // put delta = e-qt * N(d1) - 1

  // gamma = ( e-qt / S0ssqrt(t)) * (1 / sqrt(2*pi)) * (e^(-d1^2/2))

  // theta is most complicated.  
  // It uses a helper that is almost the same as gamma but not quite
  // Insert the helper where noted: (helper)

  // helper = ( S0se-qt / (2*sqrt(t)) * (1 / sqrt(2*pi)) * (e^(-d1^2/2))

  // Call theta
  // (1/T) * (-(helper)- rXe-rt * N(d2) + qS0e-qt * N(d1))

  // Put theta
  // (1/T) * (-(helper) + rXe-rt * N(-d2) - qS0e-qt * N(-d1))

  // Vega
  // 1/100 * (S0e-qt * sqrt(t)) * (1/sqrt(2*pi)) * (e^(-d1^2/2))

  // Rho
  // call rho = 1 / 100 * X * t * e-rt * (N(d2))
  // put rho = - 1/100 * X * t * e-rt * N(-d2)

  // const callPrice = inputs.S0 * h.eqt * h.Nd1 - inputs.X * h.ert * h.Nd2;
  // const putPrice = inputs.X * h.ert * h.Nmd2 - inputs.S0 * h.eqt * h.Nmd1;

  
  // const callDelta = h.eqt * h.Nd1;
  // const putDelta = callDelta - 1;

  


  getGreeksHelpers(inputs: BlackScholesInputs) {
    const lnS0X = Math.log(inputs.S0 / inputs.X); // ok
    const trs2 = inputs.t * (inputs.r -inputs.q + Math.pow(inputs.s, 2) / 2); // ok
    const ssqrtt = inputs.s * Math.sqrt(inputs.t); // ok
    const d1 = (lnS0X + trs2) / ssqrtt; // ok
    const d2 = d1 - ssqrtt; // ok
    
    const Nd1 = this.normalCdf(d1); // ok
    const Nd2 = this.normalCdf(d2); // ok
    const Nmd1 = this.normalCdf(-d1); // m = minus // ok
    const Nmd2 = this.normalCdf(-d2); // ok
    const eqt = Math.pow(Math.E, -inputs.q * inputs.t); // ok // = 1 when q = 0
    const ert = Math.pow(Math.E, -inputs.r * inputs.t); // ok
    const oneTwoPi = (1 / Math.sqrt(2 * Math.PI)); // ok
    
    // This change fixed gamma and vega errors
    // It also affects theta but theta still is wrong
    // const md2 = Math.pow(-d1, 2) / 2;
    const md2 = -1 * Math.pow(d1, 2) / 2; // = md3 below

    const ed2 = Math.pow(Math.E, md2);
    const T = DAYS_IN_A_YEAR; // = 365; ok as number but is it correct units?
    
    // theta helper = ( S0se-qt / (2*sqrt(t)) * (1 / sqrt(2*pi)) * (e^(-d1^2/2))
    const th = ((inputs.S0 * inputs.s * eqt) / (2 * Math.sqrt(inputs.t))) * oneTwoPi * ed2;
    
    // console.log('lnS0X: ', lnS0X,' trs2: ', trs2,' ssqrtt: ', ssqrtt);
    // console.log(' d1: ', d1,' -d1: ', -d1,' md2: ', md2,' ed2: ', ed2);
    // console.log(' Nd1: ', Nd1,' Nd2: ', Nd2);
    // console.log('Nmd1: ', Nmd1, 'Nmd2: ', Nmd2, ' eqt: ', eqt, ' ert: ', ert);
    // console.log(' eqt: ', eqt, ' ert: ', ert);
    
    // ========= oneTwoPi test ======================
    // const oneTwoPi = (1 / Math.sqrt(2 * Math.PI));
    // console.log('Pi: ', Math.PI);
    // console.log('2 * Pi: ', 2 * Math.PI);
    // console.log('Math.sqrt(2 * Math.PI): ', Math.sqrt(2 * Math.PI));
    // console.log('(1 / Math.sqrt(2 * Math.PI)): ', (1 / Math.sqrt(2 * Math.PI)));
    
    // ============ md2 test ========================
    // console.log(' d1: ', d1,' -d1: ', -d1,' md2: ', md2,' ed2: ', ed2);
    // console.log('Math.pow(-d1, 2): ', Math.pow(-d1, 2)); // WolframA answer is negative this is positive
    // console.log('Math.pow(-d1, 2) / 2: ', Math.pow(-d1, 2) / 2); 
    // console.log('Math.E: ', Math.E,' Math.pow(Math.E, md2) (=ed2): ', Math.pow(Math.E, md2)); // ok on given input
    // console.log(' -1 * Math.pow(d1, 2): ', -1 * Math.pow(d1, 2)); 
    // const md3 = -1 * Math.pow(d1, 2) / 2; 
    // console.log(' -1 * Math.pow(d1, 2) / 2 (=md3): ', -1 * Math.pow(d1, 2) / 2); 
    // console.log('Math.E: ', Math.E,' Math.pow(Math.E, md3) (=ed2): ', Math.pow(Math.E, md3)); // 


    // console.log(' oneTwoPi: ', oneTwoPi, ' md2: ', md2, ' ed2: ', ed2, ' T: ', T);
    
    return { lnS0X, trs2, ssqrtt, d1, d2, Nd1, Nd2, Nmd1, Nmd2, eqt, ert, oneTwoPi, ed2, th, T};

  }

  // call delta = e-qt * N(d1)
  // put delta = e-qt * N(d1) - 1
  calcDelta(inputs: BlackScholesInputs) {
    const h = this.getGreeksHelpers(inputs);

    const callDelta = h.eqt * h.Nd1;
    const putDelta = callDelta - 1;

    console.log('call delta: ', callDelta, ' put delta: ', putDelta);


    return {callDelta, putDelta}

  }

  // gamma = ( e-qt / S0ssqrt(t)) * (1 / sqrt(2*pi)) * (e^(-d1^2/2))
  calcGamma(inputs: BlackScholesInputs) {
    const h = this.getGreeksHelpers(inputs);

    // only ed2 is uncertain
    // yes ed2 was bug.  md2 code wrong order of inputs
    // vega also fixed
    const gamma = (h.eqt / (inputs.S0 * h.ssqrtt)) * h.oneTwoPi * h.ed2;  

    console.log('gamma: ', gamma);

    return gamma;

  }

  // theta is most complicated.  
  // It uses a helper that is almost the same as gamma but not quite
  // Insert the helper where noted: (helper)

  // helper = ( S0se-qt / (2*sqrt(t)) * (1 / sqrt(2*pi)) * (e^(-d1^2/2))

  // Call theta
  // (1/T) * (-(helper)- rXe-rt * N(d2) + qS0e-qt * N(d1))

  // Put theta
  // (1/T) * (-(helper) + rXe-rt * N(-d2) - qS0e-qt * N(-d1))
  calcTheta(inputs: BlackScholesInputs) {
    const h = this.getGreeksHelpers(inputs);
    // h.th = theta helper eq
    const th = ((inputs.S0 * inputs.s * h.eqt) / (2 * Math.sqrt(inputs.t))) * h.oneTwoPi * h.ed2;

    // console.log('th1/2: ', th, th2);
    console.log('-th: ', -th);

    // Is this the daily version?
    // const callTheta = (1/h.T) * (-h.th - (inputs.r * inputs.X * h.ert * h.Nd2) + (inputs.q * inputs.S0 * h.eqt * h.Nd1));
    // const putTheta = (1/h.T) * (-h.th + (inputs.r * inputs.X * h.ert * h.Nmd2) - (inputs.q * inputs.S0 * h.eqt * h.Nmd1));

    // negating 1/T makes these values agree with test sites except for sign (these are negative)
    const callTheta = h.T * ((1/h.T) * (-h.th - (inputs.r * inputs.X * h.ert * h.Nd2) + (inputs.q * inputs.S0 * h.eqt * h.Nd1)));
    const putTheta = h.T * ((1/h.T) * (-h.th + (inputs.r * inputs.X * h.ert * h.Nmd2) - (inputs.q * inputs.S0 * h.eqt * h.Nmd1)));

    const rXeN = inputs.r * inputs.X * h.ert * h.Nd2;
    const rXeNm = inputs.r * inputs.X * h.ert * h.Nmd2;
    const qSeN = inputs.q * inputs.S0 * h.eqt * h.Nd1;    // = 0 b/c q = 0
    const qSeNm = inputs.q * inputs.S0 * h.eqt * h.Nmd1;  // = 0 b/c q = 0

    console.log('rXeN: ', rXeN,' qSeN: ', qSeN);

    // This change makes call theta match the two verification websites 
    // one reports as negative the other as positive, so leading negation maybe not necessary
    // Removing 1/T is making it annual.  original formula could be daily this could be annual
    // put theta is off by < 10%
    const callTheta2 = (-h.th - rXeN + qSeN);
    const putTheta2 = (-h.th + rXeNm - qSeNm);

    // only the helper is uncertain.  Also order of operations

    console.log('call theta1/2: ', callTheta, callTheta2, ' put theta1/2: ', putTheta, putTheta2);

    return {callTheta, putTheta};

  }

  // Vega
  // 1/100 * (S0e-qt * sqrt(t)) * (1/sqrt(2*pi)) * (e^(-d1^2/2))
  calcVega(inputs: BlackScholesInputs) {
    const h = this.getGreeksHelpers(inputs);

    const vega = (1/100 * inputs.S0 * h.eqt * Math.sqrt(inputs.t)) * h.oneTwoPi * h.ed2;
    
    console.log('vega: ', vega);


  }

  calcRho(inputs: BlackScholesInputs) {
    const h = this.getGreeksHelpers(inputs);

  }

  getCallAndPutPrice(inputs: BlackScholesInputs) {
    const h = this.getGreeksHelpers(inputs);

    const callPrice = inputs.S0 * h.eqt * h.Nd1 - inputs.X * h.ert * h.Nd2;
    const putPrice = inputs.X * h.ert * h.Nmd2 - inputs.S0 * h.eqt * h.Nmd1;

    
    console.log('call price: ', callPrice, ' put price: ', putPrice);
    console.log('long straddle price: ', callPrice + putPrice);

    return { callPrice, putPrice }
  }




  getOptionPricesAndGreeks(inputs: BlackScholesInputs[]) {
    for (const input of inputs) {
      console.table(input);
      this.getGreeksHelpers(input);
      this.getCallAndPutPrice(input);
      this.calcDelta(input);
      this.calcGamma(input);
      this.calcTheta(input);
      this.calcVega(input);
      
    }
  }

  // ============================================== 

}
