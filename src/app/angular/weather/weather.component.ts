import { Component, OnInit } from '@angular/core';
import {Form, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  cities$: Observable<string[]>;

  countries = [
    {
      name: "United Kingdom",
      cities: ["London", "Warwick", "Birmingham"]
    },
    {
      name: "United States",
      cities: ["New York", "Chicago", "Washington"]
    },
    {
      name: "Australia",
      cities: ["Sydney", "Adelaide", "Melbourne"]
    },
    {
      name: "Pakistan",
      cities: ["Lahore", "Karachi", "Islamabad"]
    }
  ];

  countryControl: FormControl;
  cityControl: FormControl;

  constructor(private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.cityControl = new FormControl("");
    this.cityControl.valueChanges
      .subscribe(value => {
        console.log('wC route: ', value);
        this.router.navigate([value],
          { relativeTo: this.route });
      });
    this.countryControl = new FormControl("");
    this.cities$ = this.countryControl.valueChanges.pipe(
      map(country => country.cities)
    );
  }


}
