import { Injectable } from '@angular/core';

import { TimeParts } from '../common/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DatesService {

  readonly millisInADay = 24 * 60 * 60 * 1000;
  
  constructor() { }

  // Number of seconds since the ECMAScript Epoch
  // seconds = Math.floor(Date.now() / 1000);
  // seconds = (new Date(date)).getTime() / 1000;

  // creating date objects
  // today = new Date()
  // birthday = new Date('December 17, 1995 03:24:00')
  // birthday1 = new Date('1995-12-17T03:24:00')
  // birthday2 = new Date(1995, 11, 17)            // the month is 0-indexed
  // birthday3 = new Date(1995, 11, 17, 3, 24, 0)
  // birthday4 = new Date(628021800000)            // passing epoch timestamp

  getNow() {
    const now = Date.now();
    console.log('dS gN now: ', now);
  }

  

  // getTimeParts({mo: number, dy: number, yr: number, hr: number, min: number, sec: number}:TimeParts) {
    // getDateTimeParts({mo, dy, yr, hr, min, sec}:TimeParts) {
  getDateTimeParts(date:Date) {
    // Get date, month, year or time
    // const date = new Date(yr, mo, dy, hr, min, sec);
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    const [hour, minutes, seconds, millis] = [date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()];

    // console.log('dS gTP input date: ', date);
    // console.log('dS gTP month: ', month);
    // console.log('dS gTP day: ', day);
    // console.log('dS gTP year: ', year);
    // console.log('dS gTP hour: ', hour);
    // console.log('dS gTP min: ', minutes);
    // console.log('dS gTP sec: ', seconds);
    // console.log('dS gTP millis: ', millis);


  }




  // method to generate an array of dates
    // input start date, end date, day(s) of the week
    // create the input dates by


  generateTradingDates(start: Date, end: Date, days?:string[]) {

    let tradingDates = [];

    // get the millis for start date
    const startMillis = start.getTime();


    let checkDate = new Date(start);
    let millisInADay = 24 * 60 * 60 * 1000;
    let timeSpanDays = Math.ceil((end.getTime() - start.getTime()) / millisInADay);

    // console.log('dS gTD input start, end, days: ', start, end, days);
    // console.log('dS gTD checkDate: ', checkDate);
    // console.log('dS gTD timeSpanDays: ', timeSpanDays);
    // console.log('dS gTD millisInADay: ', millisInADay);
    // console.log('dS gTD currentMillis, nextMillis: ', currentMillis, nextMillis);

    // c
    // check if startdate day of week is in days array
    // if yes push to trading dates array
    // add millisInADay to currentMillis
    // getDay() returns day of week 0-6 sunday-saturday

    for (let day = 0; day < timeSpanDays; day++) {
      // console.log('----------------');
      // console.log('day: ', day);
      // console.log('dow: ', checkDate.getDay());
      
      if (checkDate.getDay() === 3) {
        // console.log('pushing to list');

        tradingDates.push(checkDate)
      }

      checkDate = new Date(checkDate.getTime() + millisInADay);



    }
    // console.log('dS gTD trading dates array: ', tradingDates);

    return tradingDates;
  } 
  
  // get a date that is at least minExpDistance away and is the expiration date for that option series
  // minExpDistance = minimum number of days until expiration
  // optionSeries = use weekly, monthly, quarterly option series
  // find the first expiration date using the given series that is the min distance of days in the future
  // ex:
  // trading date = 1-6-2021 wed minExpDistance = 30 days  optionSeries = monthly
  // monthly options expire on 3rd thursday of every month
  // first time a third thursday of a month is more than 30 days from trading date is in february
  // the expiration month is february
  // what is the date of the third thursday of the expiration month?

  getExpirationDate(tradingDate: Date, minExpDistance: number, optionSeries: string = 'MONTHLY') {
    const minExpDate = new Date(tradingDate.getTime() + minExpDistance * this.millisInADay);

    
    // console.log('--------------------');
    // console.log('dS gED open trade day, date: ', tradingDate.getDay(), tradingDate);
    // console.log('dS gED min exp day, date: ', minExpDate.getDay(), minExpDate);

    
    const expDate = this.getThirdThursday(minExpDate);
    // console.log('dS gED returned expiration date: ', expDate);
    // console.log('dS gED canUseThisDay: ', minExpDate, minExpDate.getDay());
    // console.log('dS gED expDate, day: ', expDate, expDate.getDay());


    // console.log('dS gED minExpDate: ', new Date(minExpDate));
    
    // const dateOfFirstAvailable = new Date(minExpDate).getDate();
    // console.log('dS gED date of minExpDate: ', dateOfFirstAvailable);
    
    // const dayOfFirstAvailable = new Date(minExpDate).getDay();
    // console.log('dS gED day of minExpDate: ', dayOfFirstAvailable);


    // const yr = 2021;
    // const mo = 11;
    // const da = 17;

    // const expDate = new Date(yr, mo, da);

    return expDate;

  }

  // dow of first day of month is a friday (= 5 on zero index)
  // need date of following thursday (= date first thurs of month)
  // number of days in a week = 7
  // number of days since last thursday = todays dow - 4
  // number of days until next thursday = 7 - days since last thurs = 6
  // date of next thurs = today's date (always = 1) + days til next thurs


  // day        daysSinceLastThurs          daysTilNextThurs
  // sun 0      3                           4
  // mon 1      4                           3
  // tue 2      5                           2
  // wed 3      6                           1
  // thu 4      0                           0
  // fri 5      1                           6
  // sat 6      2                           5


  getThirdThursday(date: Date) {
    // console.log('dS gTT input date: ', date);
    // console.log('dS gTT input DOW, date: ', date.getDay(), date);

    const canUseThisMonth = date.getDate() < 14;
    // console.log('dS gTT canUseThisMonth: ', canUseThisMonth);

    const firstDayOfMonth = canUseThisMonth ? new Date(date.getFullYear(), date.getMonth(), 1) : new Date(date.getFullYear(), date.getMonth() + 1, 1);
    const dayOfFirstDay = firstDayOfMonth.getDay();
    // console.log('dS gTT first day, date of expiration month: ', dayOfFirstDay, firstDayOfMonth);
    
    // const daysSinceLastThurs = Math.abs(dayOfFirstDay - 4);
    // console.log('dS gTT days since last thurs: ', daysSinceLastThurs);
    
    // const daysUntilNextThurs = Math.abs(4 - dayOfFirstDay);
    const daysUntilNextThurs = dayOfFirstDay < 4 ? Math.abs(4 - dayOfFirstDay) : 7 - (dayOfFirstDay - 4);
    // console.log('dS gTT days until next thurs: ', daysUntilNextThurs);

    // console.log('dS gTT fDOM, fDOM.gy, gM, dOFD, dUNT: ', firstDayOfMonth, firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth(), dayOfFirstDay, daysUntilNextThurs);
    
    const firstThursOfMonth = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth(), daysUntilNextThurs + 1);
    // console.log('dS gTT date of first TOM, day: ', firstThursOfMonth, firstThursOfMonth.getDate(), firstThursOfMonth.getDay());
    
    const thirdThursOfMonth = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth(), firstThursOfMonth.getDate() + 14);
    // console.log('dS gTT third TOM, day: ', thirdThursOfMonth, thirdThursOfMonth.getDate(), thirdThursOfMonth.getDay());
  
    
    return thirdThursOfMonth;
  }


}
