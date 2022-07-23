import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NDX_SYMBOLS_0622, SYMBOLS } from 'src/app/common/constants';

@Component({
  selector: 'exp-symbol-selector',
  templateUrl: './symbol-selector.component.html',
  styleUrls: ['./symbol-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SymbolSelectorComponent implements OnInit {

  @Output() selectedSymbol = new EventEmitter<string>();

  // SYMBOLS_LIST = SYMBOLS;
  SYMBOLS_LIST = NDX_SYMBOLS_0622;

  // true if user has selected a symbol from the list
  symbolSelected = false;
  
  constructor() { }

  ngOnInit(): void {
    // console.log('sS ngOI symbols list: ', this.SYMBOLS_LIST);
  }

  handleSymbolSelection(symbol: string) {
    // console.log('sS gSFS selected symbol: ', symbol);
    this.symbolSelected = true;
    this.selectedSymbol.emit(symbol);
  }

}
