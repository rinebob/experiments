import { Injectable } from '@angular/core';

import { ExpirationDate, ExpirationSeries, ExpirationTimeDistance, } from '../common/interfaces';
import { DAYS_IN_A_WEEK, MILLIS_IN_A_DAY, OPTION_EXPIRATION_TIME_DISTANCES, QUARTERLY_EXPIRATION_MONTHS, STANDARD_DAYS_IN_A_MONTH } from '../common/constants';

@Injectable({
  providedIn: 'root'
})
export class DatesService {

  constructor() { }

  generateTradingDates(start: Date, end: Date, days?:string[]) {
    let tradingDates = [];
    let checkDate = new Date(start);
    let timeSpanDays = Math.ceil((end.getTime() - start.getTime()) / MILLIS_IN_A_DAY);
    for (let day = 0; day < timeSpanDays; day++) {
      
      if (checkDate.getDay() === 3) {
        tradingDates.push(checkDate)
      }
      checkDate = new Date(checkDate.getTime() + MILLIS_IN_A_DAY);
    }

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
    const minExpDate = new Date(tradingDate.getTime() + minExpDistance * MILLIS_IN_A_DAY);
    const thirdThursday = this.getThirdThursday(minExpDate);
    const nextExpDate = this.getThirdThursday(new Date(thirdThursday.getFullYear(), thirdThursday.getMonth() + 1, thirdThursday.getDate()));
    
    return minExpDate < thirdThursday ? thirdThursday : nextExpDate;
  }

  getThirdThursday(date: Date) {
    let numThursdays = 1;
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    let testDate = firstDayOfMonth;
    
    while (numThursdays < 3) {
      if (testDate.getDay() === 4) {
        testDate = new Date(testDate.getTime() + MILLIS_IN_A_DAY * 7);
        numThursdays++;
        
      } else {
        testDate = new Date(testDate.getTime() + MILLIS_IN_A_DAY);
      }
    }
    
    const thirdThursOfMonth = testDate;
    
    
    return thirdThursOfMonth;
  }

  // generates an array of dates corresponding to option expiration dates for a list
  // of expiration series (currently hardcoded as OPTION_EXPIRATION_TIME_DISTANCES)
  // dates are either fridays (weekly) or third-thursdays (monthly/quarterly)
  // used for ConfigBuilder component UI Expiration radio button data source
  generateExpirationCalendar(date: Date) {
    let calendar: ExpirationDate[] = [];
    let expDate = date;
    
    for (const dist of OPTION_EXPIRATION_TIME_DISTANCES) {
      const inputDateMillis = date.getTime();

      switch(dist.expSeries) {
        case ExpirationSeries.WEEKLY: {
    
          const dteMillis = this.getDteMillis(dist.expDist, DAYS_IN_A_WEEK);
          const maxExpDate = this.generateMaxExpDate(inputDateMillis, dteMillis);
          expDate = this.getWeeklyExpDate(maxExpDate);

          calendar.push(this.generateExpirationDateObject(expDate, dist));

          break
        }
        
        case ExpirationSeries.MONTHLY: {
    
          const dteMillis = this.getDteMillis(dist.expDist, STANDARD_DAYS_IN_A_MONTH);
          const maxExpDate = this.generateMaxExpDate(inputDateMillis, dteMillis);
          expDate = this.getThirdThursday(maxExpDate);

          calendar.push(this.generateExpirationDateObject(expDate, dist));

          break
        }
        
        case ExpirationSeries.QUARTERLY: {
          // console.log('dS gEC case quarterly');

          const dteMillis = this.getDteMillis(dist.expDist, STANDARD_DAYS_IN_A_MONTH);
          const maxExpDate = this.generateMaxExpDate(inputDateMillis, dteMillis);
          const expirationDateOb: ExpirationDate = this.generateQuarterlyExpiration(maxExpDate, dist);

          calendar.push(expirationDateOb);
          
          break
        }

        default: {
          
        }
      }
    }
    
    return calendar;
  }

  getDteMillis(expDist: number, mult: number) {
    return expDist * MILLIS_IN_A_DAY * mult;
  }

  generateMaxExpDate(inputMillis: number, dteMillis: number) {
    return new Date(inputMillis + dteMillis);
  }

  generateExpirationDateObject(date: Date, dist: ExpirationTimeDistance) {
    const expirationDate: ExpirationDate = {
      expLabel: dist.expLabel,
      expName: dist.expName,
      expDate: date,
      expDay: dist.expDay,
    }
    return expirationDate;
  }
  
  // generates a weekly expiration date (i.e. this coming friday or next friday)
  getWeeklyExpDate(maxExpDate: Date) {
    let expDate = maxExpDate;
    const maxExpDow = maxExpDate.getDay();

    // if day of week equals expiration day of week (friday (5) for weekly series)
    // then that is the exp date
    if (maxExpDow === 5) {
      expDate = maxExpDate;

    } else {
      // else walk backward by dow to exp dow and that is the exp date
      // console.log('dS gEC while loop start');
      let n = maxExpDow;
      while(n !== 5) {
        // console.log('dS gEC in while loop.  n: ', n);
        expDate = new Date(expDate.getTime() - MILLIS_IN_A_DAY);
        n--;
        n = n < 0 ? 6 : n;
        // console.log('dS gEC while loop end.  n: ', n);
      }

    }

    return expDate;
  }

  // generates an ExpirationDate object for a given quarterly series (i.e. six-, nine-, twelve-month etc. series)
  generateQuarterlyExpiration(date: Date, dist: ExpirationTimeDistance) {
    // console.log('dS gQE input date : ', date);
    
    let quarterlyExpiration: ExpirationDate = {expLabel: dist.expLabel, expName: dist.expName, expDate: date, expDay: 4};
    
    let nextQtrlyExpMo = date.getMonth();
    let nextQtrlyExpYr = date.getFullYear();
    
    // console.log('dS gQE nextQtrlyExpMo: ', nextQtrlyExpMo);
    // console.log('dS gQE nextQtrlyExpYr: ', nextQtrlyExpYr);
    // console.log('dS gQE exp mos: ', QUARTERLY_EXPIRATION_MONTHS);
    
    while (!QUARTERLY_EXPIRATION_MONTHS.includes(nextQtrlyExpMo)) {
      // console.log('dS gQE while start mo: ', nextQtrlyExpMo);
      nextQtrlyExpMo++;
      // console.log('dS gQE mo++: ', nextQtrlyExpMo);
      if (nextQtrlyExpMo > 12) {
        // console.log('dS gQE mo > 12 start: ', nextQtrlyExpMo);
        nextQtrlyExpMo = nextQtrlyExpMo - 12;
        // console.log('dS gQE mo - 12: ', nextQtrlyExpMo);
        nextQtrlyExpYr = nextQtrlyExpYr + 1;
        // console.log('dS gQE yr + 1: ', nextQtrlyExpYr);
      }
      
    }
    // console.log('dS gQE expDate from yr mo 1 gTT: ', nextQtrlyExpYr, nextQtrlyExpMo);
    
    let expDate = this.getThirdThursday(new Date(nextQtrlyExpYr, nextQtrlyExpMo, 1));

    // console.log('dS gQE expDate result: ', expDate);
    
    // create object with exp name and exp date
      quarterlyExpiration.expDate = expDate;

    return quarterlyExpiration;
  }


}

