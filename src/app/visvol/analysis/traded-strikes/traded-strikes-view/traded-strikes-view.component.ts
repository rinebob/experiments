import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'exp-traded-strikes-view',
  templateUrl: './traded-strikes-view.component.html',
  styleUrls: ['./traded-strikes-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TradedStrikesViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getTradedStrikesForSymbol(symbol: string) {
    console.log('tSV gTSFS get strikes for symbol: ', symbol);

  }

}
