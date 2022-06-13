import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { CsvService } from '../../../../services/csv/csv.service';
import {RibbonInfo, TradedStrikesTableDataObject} from '../../../../common/interfaces';
import { RIBBON_INFO_INITIALIZER } from 'src/app/common/constants';

@Component({
  selector: 'exp-traded-strikes-view',
  templateUrl: './traded-strikes-view.component.html',
  styleUrls: ['./traded-strikes-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TradedStrikesViewComponent implements OnInit {

  // tradedStrikesDataBS = new BehaviorSubject<Array<Object>>([]);
  // tradedStrikesData$: Observable<Array<Object>> = this.tradedStrikesDataBS;

  // allExpirationsBS = new BehaviorSubject<string[]>([]);
  // allExpirations$: Observable<string[]> = this.allExpirationsBS;

  ribbonInfoBS = new BehaviorSubject<RibbonInfo>(RIBBON_INFO_INITIALIZER);
  ribbonInfo$: Observable<RibbonInfo> = this.ribbonInfoBS;

  strikesTableDataBS = new BehaviorSubject<TradedStrikesTableDataObject>({});
  strikesTableData$: Observable<TradedStrikesTableDataObject> = this.strikesTableDataBS;



  constructor(
    readonly csvService: CsvService,
    ) { }

  ngOnInit(): void {
    // this.allExpirations$.pipe().subscribe(
    //   expirations => {console.log('tsV ngOI expirations sub: ', expirations)}
    // );
  }

  handleSymbolSelection(symbol: string) {
    console.log('tSV hSS selected symbol: ', symbol);

    // get ribbon info first and render 
    const ribbonInfo = this.getRibbonInfo(symbol);
    console.log('tSV hSS ribbon info: ', ribbonInfo);
    this.ribbonInfoBS.next(ribbonInfo);

    // get traded strikes
    const tradedStrikesTableData = this.getTradedStrikesForSymbol(symbol);
    this.strikesTableDataBS.next(tradedStrikesTableData);

  }

  getRibbonInfo(symbol: string): RibbonInfo {
    console.log('tSV gRI ribbon info for symbol: ', symbol);
    // const ribbonInfo: RibbonInfo = RIBBON_INFO_INITIALIZER;
    const ribbonInfo: RibbonInfo = this.csvService.getRibbonInfo(symbol);

    return ribbonInfo;
  }

  getTradedStrikesForSymbol(symbol: string): TradedStrikesTableDataObject {
    console.log('tSV gTSFS get strikes for symbol: ', symbol);

    const data: TradedStrikesTableDataObject = 
      this.csvService.getTradedStrikesData([symbol]);

      // this.strikesTableDataBS.next(data);

    if (data && data.allExpirations && data.tradedStrikesData) {
      // this.tradedStrikesDataBS.next(data.tradedStrikesData);
      // this.allExpirationsBS.next(data.allExpirations);
      // console.log('tSV gTSFS expirations: ', this.allExpirationsBS.value);
      // console.log('tSV gTSFS traded strikes data[0]: ', this.tradedStrikesDataBS.value[0]);

      
    } else {
      console.log('cS gTSD dude i told you theres no effin data!!');
    }

    return data;

  }

}
