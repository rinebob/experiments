import { Injectable } from '@angular/core';

import { ExpirationDate, ExpirationSeries, ExpirationTimeDistance, } from '../common/option_interfaces';
import { DAYS_IN_A_WEEK, DAYS_MAP, MILLIS_IN_A_DAY, MONTHS_MAP, OPTION_EXPIRATION_TIME_DISTANCES, QUARTERLY_EXPIRATION_MONTHS, STANDARD_DAYS_IN_A_MONTH } from '../common/constants';

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

    const mo = MONTHS_MAP.get(date.getMonth());
    const day = date.getDate();
    const label = `${dist.expLabel} ${mo} ${day}`;

    console.log('dS gEDO label: ', label);

    const expirationDate: ExpirationDate = {
      expSeries: dist.expSeries,
      expLabel: dist.expLabel,
      expName: dist.expName,
      expDate: date,
      expDay: dist.expDay,
      checkboxLabel: label,
    }
   
    return expirationDate;
  }
  
  // generates a weekly expiration date (i.e. this coming friday or next friday)
  getWeeklyExpDate(maxExpDate: Date) {
    let expDate = maxExpDate;
    const maxExpDow = maxExpDate.getDay();

    if (maxExpDow === 5) {
      expDate = maxExpDate;

    } else {
      let n = maxExpDow;
      while(n !== 5) {
        expDate = new Date(expDate.getTime() - MILLIS_IN_A_DAY);
        n--;
        n = n < 0 ? 6 : n;
      }
    }

    return expDate;
  }

  // generates an ExpirationDate object for a given quarterly series (i.e. six-, nine-, twelve-month etc. series)
  generateQuarterlyExpiration(date: Date, dist: ExpirationTimeDistance) {

    const mo = MONTHS_MAP.get(date.getMonth());
    const day = date.getDate();
    const label = `${dist.expLabel} ${mo} ${day}`;

    let quarterlyExpiration: ExpirationDate = {expSeries: dist.expSeries, expLabel: dist.expLabel, expName: dist.expName, expDate: date, expDay: 4, checkboxLabel: label};
    let nextQtrlyExpMo = date.getMonth();
    let nextQtrlyExpYr = date.getFullYear();
    
    while (!QUARTERLY_EXPIRATION_MONTHS.includes(nextQtrlyExpMo)) {
      nextQtrlyExpMo++;
      if (nextQtrlyExpMo > 12) {
        nextQtrlyExpMo = nextQtrlyExpMo - 12;
        nextQtrlyExpYr = nextQtrlyExpYr + 1;
      }
    }
    
    let expDate = this.getThirdThursday(new Date(nextQtrlyExpYr, nextQtrlyExpMo, 1));
    quarterlyExpiration.expDate = expDate;

    return quarterlyExpiration;
  }
}

