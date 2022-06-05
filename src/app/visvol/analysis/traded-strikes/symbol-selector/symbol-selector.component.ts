import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { SYMBOLS } from 'src/app/common/constants';

@Component({
  selector: 'exp-symbol-selector',
  templateUrl: './symbol-selector.component.html',
  styleUrls: ['./symbol-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SymbolSelectorComponent implements OnInit {

  @Output() selectedSymbol = new EventEmitter<string>();

  SYMBOLS_LIST = SYMBOLS;

  constructor() { }

  ngOnInit(): void {
    // console.log('sS ngOI symbols list: ', this.SYMBOLS_LIST);
  }

  getStrikesForSymbol(symbol: string) {
    // console.log('sS gSFS get strikes for symbol: ', symbol);
    this.selectedSymbol.emit(symbol);
  }

}
