import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { CsvService } from '../../../../services/csv/csv.service';
import {RibbonInfo, TradedStrikesDatum, TradedStrikesTableDataObject} from '../../../../common/interfaces';
import { DELTA_STRIKES_TARGET_DELTA_NUM_RECORDS, RIBBON_INFO_INITIALIZER } from 'src/app/common/constants';
import { DeltaStrikesGridData, OratsFileFormat, OratsUiDatum } from 'src/app/common/interfaces_orats';

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

  allExpirationsBS = new BehaviorSubject<string[]>([]);
  allExpirations$: Observable<string[]> = this.allExpirationsBS;

  strikesWithExpirationsBS = new BehaviorSubject<TradedStrikesDatum[]>([])
  strikesWithExpirations$: Observable<TradedStrikesDatum[]> = this.strikesWithExpirationsBS;

  strikesTableDataBS = new BehaviorSubject<TradedStrikesTableDataObject>({});
  strikesTableData$: Observable<TradedStrikesTableDataObject> = this.strikesTableDataBS;

  oratsDataRecordsBS = new BehaviorSubject<OratsUiDatum[]>([]);
  oratsDataRecords$: Observable<OratsUiDatum[]> = this.oratsDataRecordsBS;

  deltaStrikesGridDataBS = new BehaviorSubject<DeltaStrikesGridData>({});
  deltaStrikesGridData$: Observable<DeltaStrikesGridData> = this.deltaStrikesGridDataBS;

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

    // get traded strikes for symbol
    const tradedStrikesTableData = this.getTradedStrikesGridDataForSymbol(symbol);
    this.strikesTableDataBS.next(tradedStrikesTableData);
    this.allExpirationsBS.next(tradedStrikesTableData.allExpirations);
    this.strikesWithExpirationsBS.next(tradedStrikesTableData.tradedStrikesData);

    // get all data records for symbol
    const oratsDataRecords = this.getOratsDataRecordsForSymbol(symbol);
    console.log('tSV hSS orats record [0]: ', oratsDataRecords[0]);
    this.oratsDataRecordsBS.next(oratsDataRecords);

    // get Delta strikes grid data object
    const deltaStrikesGridData = this.getDeltaStrikesGridData(oratsDataRecords);
    console.log('tSV hSS deltaStrikesGridData: ', deltaStrikesGridData);
    this.deltaStrikesGridDataBS.next(deltaStrikesGridData);



  }

  getRibbonInfo(symbol: string): RibbonInfo {
    // console.log('tSV gRI ribbon info for symbol: ', symbol);
    const ribbonInfo: RibbonInfo = this.csvService.getRibbonInfo(symbol);

    return ribbonInfo;
  }

  getTradedStrikesGridDataForSymbol(symbol: string): TradedStrikesTableDataObject {
    // console.log('tSV gTSFS get strikes for symbol: ', symbol);

    const data: TradedStrikesTableDataObject = 
      this.csvService.getTradedStrikesData([symbol]);

    if (data && data.allExpirations && data.tradedStrikesData) {
    } else {
      console.log('cS gTSD dude i told you theres no effin data!!');
    }

    return data;
  }

  getOratsDataRecordsForSymbol(symbol: string): OratsUiDatum[] {
    const recordsForSymbol = this.csvService.generateRecordsArrayForSelectedSymbols([symbol]);

    return recordsForSymbol;
  }

  getDeltaStrikesGridData(data: OratsUiDatum[]): DeltaStrikesGridData  {
    const deltaStrikesGridData = this.csvService.generateDeltaStrikesGridData(data);

    return deltaStrikesGridData;
  }
}
