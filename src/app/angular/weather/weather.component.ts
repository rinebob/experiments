import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {filter, find, map, tap} from 'rxjs/operators';
import * as data from "../../../assets/history-city-list.json";

import { ALL_COUNTRIES } from "../../../assets/countries"


export interface Country {
  id: string,
  code: string,
  code3: string,
  name: string,
  cities?: any[];
}

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {

  cities = Object.values(data["default"]);

  countryMap = new Map<string, Country>();
  countriesList:Array<Partial<Country>> = [];
  citiesList: any[];

  weatherForm = this.fb.group({
    country: [''],
    city: ['']
  })

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getCountriesFromList();
    ALL_COUNTRIES.forEach(country => this.countriesList.push({code:country.code, name:country.name}));
    this.onChanges();
  }

  onChanges():void {
    this.weatherForm.get("country").valueChanges.pipe(
      tap(valueChanges => console.log({valueChanges})),
    ).subscribe(
      countryCode => {
        this.citiesList = this.countryMap.get(countryCode).cities;

        console.log(this.citiesList);
      }
    );

    this.weatherForm.get("city").valueChanges
      .subscribe(value => {
        console.log('wC route: ', value,'value === string: ',typeof value === 'string');
        this.router.navigate([value],
          { relativeTo: this.route });
      });
  }

  getCountriesFromList():void {
    for (let country of ALL_COUNTRIES) {
      this.countryMap.set(country.code, country);
    }
    this.countryMap.forEach(country => {
        country.cities = this.getCitiesForCountry(country.code);
      })}

  getCitiesForCountry(code: string):any[] {
    let allCitiesArray = this.cities.filter(c => c["city"].country === code);
    let citiesArray = allCitiesArray.map(c => c["city"].name);
    citiesArray.sort();

    return citiesArray;
  }


}
