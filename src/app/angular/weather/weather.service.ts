import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {delay, map, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  readonly urlStart = 'https://api.openweathermap.org/data/2.5/weather?q=';
  readonly urlEnd = '&units=metric&APPID=';
  readonly apiKey = '282248d6396b884b505ac3059ad6d26e';

  constructor(private http: HttpClient) { }

  getWeatherForCity(city: string): Observable<any> {
    const path = `${this.urlStart}${city}${this.urlEnd}${this.apiKey}`;

    console.log('wS path: ', path);
    return this.http.get(path).pipe(
      tap(data => console.log('wS data: ', data)),
      map(data => ({

        ...data,
        // image: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
      })),
      delay(1500)
    );
  }

}
