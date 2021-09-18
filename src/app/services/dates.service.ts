import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatesService {
  
  constructor() { 
    // this.getNow();
    // this.getTimeParts();
    // this.generateTradingDates();
  }

  // Number of seconds since the ECMAScript Epoch
  seconds = Math.floor(Date.now() / 1000);

  // creating date objects
  today = new Date()
  birthday = new Date('December 17, 1995 03:24:00')
  birthday1 = new Date('1995-12-17T03:24:00')
  birthday2 = new Date(1995, 11, 17)            // the month is 0-indexed
  birthday3 = new Date(1995, 11, 17, 3, 24, 0)
  birthday4 = new Date(628021800000)            // passing epoch timestamp

  getNow() {
    const now = Date.now();
    console.log('dS gN now: ', now);
  }

  

  getTimeParts(mo: number, dy: number, yr: number) {
    // Get date, month, year or time
    const date = new Date(yr, mo, dy);
    const [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    const [hour, minutes, seconds, millis] = [date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()];

    console.log('dS gTP input mo dy yr: ', mo, dy, yr);
    console.log('dS gTP date: ', date);
    console.log('dS gTP month: ', month);
    console.log('dS gTP day: ', day);
    console.log('dS gTP year: ', year);
    console.log('dS gTP hour: ', hour);
    console.log('dS gTP min: ', minutes);
    console.log('dS gTP sec: ', seconds);
    console.log('dS gTP millis: ', millis);


  }




  // method to generate an array of dates
    // input start date, end date, day(s) of the week
    // create the input dates by


  generateTradingDates(start: Date, end: Date, days:string[]) {

    const first = new Date(start);
    const last = new Date(end);
    const daysToTrade = days;



  }  



}
