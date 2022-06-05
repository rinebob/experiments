import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'exp-symbol-selector',
  templateUrl: './symbol-selector.component.html',
  styleUrls: ['./symbol-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SymbolSelectorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
