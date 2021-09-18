import { Injectable } from '@angular/core';

import { DateWithMillis, TimeParts } from '../common/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DatesService {
  
  constructor() { }

  // Number of seconds since the ECMAScript Epoch
  // seconds = Math.floor(Date.now() / 1000);

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

    console.log('dS gTD input start, end, days: ', start, end, days);
    // console.log('dS gTD checkDate: ', checkDate);
    console.log('dS gTD timeSpanDays: ', timeSpanDays);
    // console.log('dS gTD millisInADay: ', millisInADay);
    // console.log('dS gTD currentMillis, nextMillis: ', currentMillis, nextMillis);

    // c
    // check if startdate day of week is in days array
    // if yes push to trading dates array
    // add millisInADay to currentMillis
    // getDay() returns day of week 0-6 sunday-saturday

    for (let day = 0; day < timeSpanDays; day++) {
      console.log('----------------');
      console.log('day: ', day);
      console.log('dow: ', checkDate.getDay());
      
      if (checkDate.getDay() === 3) {
        console.log('pushing to list');

        tradingDates.push(checkDate)
      }

      checkDate = new Date(checkDate.getTime() + millisInADay);



    }
    console.log('dS gTD trading dates array: ', tradingDates);

    return tradingDates;
  }  


}
