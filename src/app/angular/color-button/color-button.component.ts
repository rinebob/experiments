import { Component, OnInit, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import {ColorButtonService} from './color-button.service'

@Component({
  selector: 'app-color-button',
  templateUrl: './color-button.component.html',
  styleUrls: ['./color-button.component.scss']
})
export class ColorButtonComponent implements OnInit {

  @Input() actualColor;
  @Input() colorText;

  private colorButtonSubscription: Subscription;

  constructor(private colorButtonService: ColorButtonService) { }

  ngOnInit(): void {
    console.log('cB C ngOI inputs aC cT: ', this.colorText, this.colorText);
    this.colorButtonSubscription = this.colorButtonService
    .colorStreamListener.subscribe(
      colorText => {
        console.log('cB C ngOI colorText: ', colorText);
        this.actualColor = colorText;
      }
    );
  }

  ngOnDestroy() {
    this.colorButtonSubscription.unsubscribe();
  }

  updateColors() {
    console.log('cB C uC this.colorText: ', this.colorText);
    this.colorButtonService.putColor(this.colorText);
  }

}
