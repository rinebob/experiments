import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'vz-symbol-picker',
  templateUrl: './symbol-picker.component.html',
  styleUrls: ['./symbol-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SymbolPickerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
