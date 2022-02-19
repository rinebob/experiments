import { Component, Input, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {Direction, Status} from '../../../common/interfaces';
import { OptionPosition, OptionStrategyName } from 'src/app/common/option_interfaces';
import * as configs from '../../../common/option_configs';

@Component({
  selector: 'exp-port-dashboard',
  templateUrl: './port-dashboard.component.html',
  styleUrls: ['./port-dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortDashboardComponent implements OnDestroy, OnInit {
  readonly destroy = new Subject();
  @Input()
  set optionPositions(value: OptionPosition[]) {
    this.optionPositionsBS.next(value);
    console.log('pDC @i oP: ', value);
    this.firstColumnPositionsBS.next(value);
    this.secondColumnPositionsBS.next(value);
    this.thirdColumnPositionsBS.next(value);

  }
  get optionPositions() {
    return this.optionPositionsBS.value;
  }
  private readonly optionPositionsBS = new BehaviorSubject<OptionPosition[]>([]);

  // sorting dropdown list populators
  symbolsBS = new BehaviorSubject<string[]>([]);
  symbols$: Observable<string[]> = this.symbolsBS;

  openDatesBS = new BehaviorSubject<string[]>([]);
  openDates$: Observable<string[]> = this.openDatesBS;

  expirationDatesBS = new BehaviorSubject<string[]>([]);
  expirationDates$: Observable<string[]> = this.expirationDatesBS;

  strategiesBS = new BehaviorSubject<string[]>([]);
  strategies$: Observable<string[]> = this.strategiesBS;

  directionsBS = new BehaviorSubject<string[]>([]);
  directions$: Observable<string[]> = this.directionsBS;

  statusesBS = new BehaviorSubject<string[]>([]);
  statuses$: Observable<string[]> = this.statusesBS;
  
  symbolControl = new FormControl('Symbol');
  openDateControl = new FormControl('Open date');
  expirationControl = new FormControl('Exp date');
  strategyControl = new FormControl('Strategy');
  directionControl = new FormControl(Direction.LONG);
  statusControl = new FormControl(Status.OPEN);


  firstColumnPositionsBS = new BehaviorSubject<OptionPosition[]>([]);
  firstColumnPositions$: Observable<OptionPosition[]> = this.firstColumnPositionsBS;
  
  secondColumnPositionsBS = new BehaviorSubject<OptionPosition[]>([]);
  secondColumnPositions$: Observable<OptionPosition[]> = this.secondColumnPositionsBS;
  
  thirdColumnPositionsBS = new BehaviorSubject<OptionPosition[]>([]);
  thirdColumnPositions$: Observable<OptionPosition[]> = this.thirdColumnPositionsBS;

  constructor() { }

  ngOnInit(): void {

    this.initializeSelects();

    // console.log('pDC ngOI Direction values: ', Object.values(Direction));

    // const {symbols, openDates, expirationDates, strategies} = this.generateSortingDropdownLists(this.optionPositionsBS.value);

    // // this.symbolsBS.next(symbols);
    // // this.openDatesBS.next(openDates);
    // // this.expirationDatesBS.next(expirationDates);
    // // this.strategiesBS.next(strategies);

    // // this.symbolControl.setValue(this.symbolsBS.value[0]);
    // // this.openDateControl.setValue(this.openDatesBS.value[0]);
    // // this.expirationControl.setValue(this.expirationDatesBS.value[0]);
    // // this.strategyControl.setValue(this.strategiesBS.value[0]);

    // // console.log('pDC ngOI symbols/openDates/expDates/stragegies: ', symbols, openDates, expirationDates, strategies);

    // // this.symbolControl.setValue(symbols[0]);
    // // this.openDateControl.setValue(openDates[0]);
    // // this.expirationControl.setValue(expirationDates[0]);
    // // this.strategyControl.setValue(strategies[0]);

    // this.symbolControl.valueChanges.pipe(takeUntil(this.destroy))
    //   .subscribe(
    //     changes => {
    //       console.log('pDC ngOI symbol control change: ', changes);
    //       this.sortColumn('first', changes)

    //     }
    //   );

    // this.openDateControl.valueChanges.pipe(takeUntil(this.destroy))
    //   .subscribe(
    //     changes => this.sortColumn('first', changes)
    //   );

    // this.expirationControl.valueChanges.pipe(takeUntil(this.destroy))
    //   .subscribe(
    //     changes => this.sortColumn('first', changes)
    //   );

    // this.strategyControl.valueChanges.pipe(takeUntil(this.destroy))
    //   .subscribe(
    //     changes => this.sortColumn('first', changes)
    //   );

    // this.directionControl.valueChanges.pipe(takeUntil(this.destroy))
    //   .subscribe(
    //     changes => this.sortColumn('first', changes)
    //   );

    // this.statusControl.valueChanges.pipe(takeUntil(this.destroy))
    //   .subscribe(
    //     changes => this.sortColumn('first', changes)
    //   );
  }

  ngOnDestroy(): void {
      this.destroy.next();
      this.destroy.complete();
  }

  initializeSelects() {
    console.log('pDC iS init selects called');

    console.log('pDC ngOI Direction values: ', Object.values(Direction));

    const {symbols, openDates, expirationDates, strategies} = this.generateSortingDropdownLists(this.optionPositionsBS.value);

    // this.symbolsBS.next(symbols);
    // this.openDatesBS.next(openDates);
    // this.expirationDatesBS.next(expirationDates);
    // this.strategiesBS.next(strategies);

    // this.symbolControl.setValue(this.symbolsBS.value[0]);
    // this.openDateControl.setValue(this.openDatesBS.value[0]);
    // this.expirationControl.setValue(this.expirationDatesBS.value[0]);
    // this.strategyControl.setValue(this.strategiesBS.value[0]);

    // console.log('pDC ngOI symbols/openDates/expDates/stragegies: ', symbols, openDates, expirationDates, strategies);

    // this.symbolControl.setValue(symbols[0]);
    // this.openDateControl.setValue(openDates[0]);
    // this.expirationControl.setValue(expirationDates[0]);
    // this.strategyControl.setValue(strategies[0]);

    this.symbolControl.valueChanges.pipe(takeUntil(this.destroy))
      .subscribe(
        changes => {
          console.log('pDC ngOI symbol control change: ', changes);
          this.sortColumn('first', changes)

        }
      );

    this.openDateControl.valueChanges.pipe(takeUntil(this.destroy))
      .subscribe(
        changes => this.sortColumn('first', changes)
      );

    this.expirationControl.valueChanges.pipe(takeUntil(this.destroy))
      .subscribe(
        changes => this.sortColumn('first', changes)
      );

    this.strategyControl.valueChanges.pipe(takeUntil(this.destroy))
      .subscribe(
        changes => this.sortColumn('first', changes)
      );

    this.directionControl.valueChanges.pipe(takeUntil(this.destroy))
      .subscribe(
        changes => this.sortColumn('first', changes)
      );

    this.statusControl.valueChanges.pipe(takeUntil(this.destroy))
      .subscribe(
        changes => this.sortColumn('first', changes)
      );

  }

  generateSortingDropdownLists(positions: OptionPosition[]) {
    // lists of all symbols, openDates, expirationDates, strategies, 
    // also whether any positions are long/short and open/closed

    const symbols = [];
    const openDates = [];
    const expirationDates = [];
    const strategies = [];
    const directions = Object.values(Direction);
    const statuses = Object.values(Status);


    for (const position of positions) {

      if (!symbols.includes(position.underlying)) {
        symbols.push(position.underlying);
      }

      if (!openDates.includes(position.dateOpenedText)) {
        openDates.push(position.dateOpenedText);
      }

      if (!expirationDates.includes(position.expDateText)) {
        expirationDates.push(position.expDateText);
      }

      if (!strategies.includes(position.config.name)) {
        strategies.push(position.config.name);
      }

    }

    console.log('pDC gSDL symbols/openDates/expDates/stragegies/dirns/stats: ', symbols, openDates, expirationDates, strategies, directions, statuses);

    this.symbolsBS.next(symbols);
    this.openDatesBS.next(openDates);
    this.expirationDatesBS.next(expirationDates);
    this.strategiesBS.next(strategies);
    this.directionsBS.next(directions);
    this.statusesBS.next(statuses);

    return {symbols, openDates, expirationDates, strategies, directions, statuses };


  }

  sortColumn(column: string, category: string) {

    if (!category) {
      console.log('pDC sC dude no category I want my category!!!');
      this.firstColumnPositionsBS.next(this.optionPositions);
      return;
    }

    console.log('pDC sC sort cat/col: ', category, column);
    const positions = [...this.optionPositions];

    const sortedPositions = positions.filter(
      position => 
      position.status === category ||
      position.underlying === category ||
      position.expDateText === category ||
      position.config.strategyName === category ||
      position.config.direction === category ||
      position.dateOpenedText === category
      

    );

    console.log('pDC sC sortedPositions: ', sortedPositions);

    switch (column) {
      case 'first':
        this.firstColumnPositionsBS.next(sortedPositions);
        
        break;

      case 'second':
        this.secondColumnPositionsBS.next(sortedPositions);
        
        break;
        
      case 'third':
        this.thirdColumnPositionsBS.next(sortedPositions);

        break;

      default: 
        console.log('pDC sC no column dude! wtf???');
        break;
    }


  }

  resetFilter() {
    this.symbolControl.setValue('Symbol');
    this.openDateControl.setValue('Open date');
    this.expirationControl.setValue('Exp date');
    this.strategyControl.setValue('Strategy');
    this.directionControl.setValue(Direction.LONG);
    this.statusControl.setValue(Status.OPEN);

    this.firstColumnPositionsBS.next(this.optionPositions);

  }

}

// symbolControl = new FormControl('Symbol');
// openDateControl = new FormControl('Open date');
// expirationControl = new FormControl('Exp date');
// strategyControl = new FormControl('Strategy');
// directionControl = new FormControl(Direction.LONG);
// statusControl = new FormControl(Status.OPEN);