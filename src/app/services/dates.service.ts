import { Injectable } from '@angular/core';

import { TimeParts } from '../common/interfaces';

const TWO_CALENDAR_WEEKS = 14;

@Injectable({
  providedIn: 'root'
})
export class DatesService {

  readonly millisInADay = 24 * 60 * 60 * 1000;
  
  constructor() { }

  getNow() {
    const now = Date.now();
    console.log('dS gN now: ', now);
  }

  
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

  generateTradingDates(start: Date, end: Date, days?:string[]) {
    let tradingDates = [];
    const startMillis = start.getTime();
    let checkDate = new Date(start);
    let millisInADay = 24 * 60 * 60 * 1000;
    let timeSpanDays = Math.ceil((end.getTime() - start.getTime()) / millisInADay);

    // console.log('dS gTD input start, end, days: ', start, end, days);
    // console.log('dS gTD checkDate: ', checkDate);
    // console.log('dS gTD timeSpanDays: ', timeSpanDays);
    // console.log('dS gTD millisInADay: ', millisInADay);
    // console.log('dS gTD currentMillis, nextMillis: ', currentMillis, nextMillis);


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
    const thirdThursday = this.getThirdThursday(minExpDate);
    const nextExpDate = this.getThirdThursday(new Date(thirdThursday.getFullYear(), thirdThursday.getMonth() + 1, thirdThursday.getDate()));
    

    
    // console.log('--------------------');
    // console.log('dS gED open trade day, date: ', tradingDate.getDay(), tradingDate);
    // console.log('dS gED min exp day, date: ', minExpDate.getDay(), minExpDate);
    // console.log('dS gED third th day, date: ', thirdThursday.getDay(), thirdThursday);
    // console.log('dS gED next exp day, date: ', nextExpDate.getDay(), nextExpDate);
    
    
    
    // console.log(`dS gED using ${minExpDate < thirdThursday ? 'thirdThursday' : 'nextExpDate'} for expiration`);
    
    return minExpDate < thirdThursday ? thirdThursday : nextExpDate;

  }

  getThirdThursday(date: Date) {
    // console.log('dS gTT input date: ', date);
    // console.log('dS gTT input DOW, date: ', date.getDay(), date);
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);

    const dayOfFirstDay = firstDayOfMonth.getDay();
    // console.log('dS gTT first day, date of expiration month: ', dayOfFirstDay, firstDayOfMonth);
    
    const daysUntilNextThurs = (dayOfFirstDay < 4 ? Math.abs(4 - dayOfFirstDay) : 7 - (dayOfFirstDay - 4)) + 1;
    // console.log('dS gTT days until next thurs: ', daysUntilNextThurs);
    
    const firstThursOfMonth = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth(), daysUntilNextThurs);
    // console.log('dS gTT date of first TOM, day: ', firstThursOfMonth, firstThursOfMonth.getDate(), firstThursOfMonth.getDay());
    
    const thirdThursOfMonth = new Date(firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth(), firstThursOfMonth.getDate() + TWO_CALENDAR_WEEKS);
    // console.log('dS gTT third TOM, day: ', thirdThursOfMonth, thirdThursOfMonth.getDate(), thirdThursOfMonth.getDay());
  
    
    return thirdThursOfMonth;
  }


}
