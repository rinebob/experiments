import {Component, EventEmitter, HostBinding, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {OverlayContainer} from '@angular/cdk/overlay';
import { experimentsMenu, interimMenu, visvolMenu, visVolAnalysisMenu, visvolPortfolioMenu, visvolOpportunitiesMenu, visVolTopLevelMenu,  } from './common/main_menu_config';
import { MenuConfig } from './common/interfaces';
import { getOpcalc, loadOpcalc } from './common/opcalc';

// import * as oc from 'opcalc';
// import * as abs from 'angular-black-scholes';

// import * as bs from 'black-scholes-js';

@Component({
  selector: 'exp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit{
  title = 'Experiments';
  opened: boolean;
  interimMenu: MenuConfig[] = interimMenu;
  visvolTopLevelMenu: MenuConfig[] = visVolTopLevelMenu;
  visvolMenu: MenuConfig[] = visvolMenu;
  visvolPortfolioMenu = visvolPortfolioMenu;
  visvolOpportunitiesMenu = visvolOpportunitiesMenu;
  visvolAnalysisMenu = visVolAnalysisMenu;
  experimentsMenu = experimentsMenu;

  @HostBinding('class') className = '';

  toggleControl = new FormControl(false);
  @Output() menuClick = new EventEmitter<void>();

  constructor() {
  }

  ngOnInit() {
    // console.log('a ngOI gOOP called');
    // this.getOtherOptionPrice();

    this.toggleControl.valueChanges.subscribe((darkMode) => {
      const darkClassName = 'darkMode';
      this.className = darkMode ? darkClassName : '';

      // if (darkMode) {
      //   this.overlay.getContainerElement().classList.add(darkClassName);
      // } else {
      //   this.overlay.getContainerElement().classList.remove(darkClassName);
      // }
    });

    // console.log('a visvolTopLevelMenu: ', this.visvolTopLevelMenu);
    // console.log('a visvolMenu: ', this.visvolMenu);
  }

  getOptionPrice() {

    const now = new Date(Date.now());
    const exp = new Date(Date.now() + 60);
    const millisNow = now.getTime();
    const millisExp = exp.getTime();

    // const option = oc.create_option()
    //   .with_asset_price(100)
    //   .with_strike(105)
    //   .with_volatility(.2)
    //   .with_interest(.005)
    //   .with_current_time(millisNow)
    //   .with_maturity_time(millisExp)
    //   .finalize();

    // console.log('a gOP option: ', option);
    // console.log('a gOP call delta: ', option.call_delta);
    // console.log('a gOP put delta: ', option.put_delta);
  }

  getOtherOptionPrice() {
    loadOpcalc().then(module => {
      const opcalc = module.instance.exports;
      console.log('a gOOP opcalc: ', opcalc);
    });
   
  }

}
