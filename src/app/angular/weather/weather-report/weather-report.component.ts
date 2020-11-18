import { Component, OnInit } from '@angular/core';
import {WeatherService} from '../weather.service';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs';
import {concatMap, filter, map, tap} from 'rxjs/operators';

@Component({
  selector: 'app-weather-report',
  templateUrl: './weather-report.component.html',
  styleUrls: ['./weather-report.component.scss']
})
export class WeatherReportComponent implements OnInit {

  data$: Observable<any>;
  loading = false;

  today: Date = new Date();

  constructor(private weatherService: WeatherService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.data$ = this.route.params.pipe(
      map(params => params["locationName"]),
      filter(name => !!name),
      tap(params => {
        console.log('wRC params: ', params);
        this.loading = true;
      }),
      concatMap(name =>
        this.weatherService.getWeatherForCity(name)),
      tap(() => this.loading = false)
    );
  }

}
