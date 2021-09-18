import { Component, OnInit } from '@angular/core';

import { DatesService } from '../services/dates.service';

@Component({
  selector: 'app-position-builder',
  templateUrl: './position-builder.component.html',
  styleUrls: ['./position-builder.component.scss']
})
export class PositionBuilderComponent implements OnInit {

  constructor(private readonly datesService: DatesService) { }

  ngOnInit(): void {

    this.datesService.getNow();
    this.datesService.getDateTimeParts(new Date(2019, 0, 1));
    this.datesService.generateTradingDates(new Date(2019, 0, 1), new Date());

  }

}
