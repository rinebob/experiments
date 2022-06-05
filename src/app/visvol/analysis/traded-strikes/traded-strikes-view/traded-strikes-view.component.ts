import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CsvService } from '../../../../services/csv/csv.service';

@Component({
  selector: 'exp-traded-strikes-view',
  templateUrl: './traded-strikes-view.component.html',
  styleUrls: ['./traded-strikes-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TradedStrikesViewComponent implements OnInit {

  constructor(readonly csvService: CsvService) { }

  ngOnInit(): void {
    this.setText();
    this.getText();
  }

  getTradedStrikesForSymbol(symbol: string) {
    console.log('tSV gTSFS get strikes for symbol: ', symbol);

  }

  setText() {
    this.csvService.setText('dude')
  }

  getText() {
    const text = this.csvService.getText();
    console.log('tSV gT text from csv store: ', text);
  };

  // getSomething() {
  //   const something = this.csvService.getSomething();
  //   console.log('tSV gS something: ', something);
  // }

}
