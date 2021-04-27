import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';



@Injectable()
export class ColorButtonService {
  private colorStream: Subject<string> = new Subject();

  putColor = colorText => {
    console.log('cB S pC colorText: ', colorText);
    this.colorStream.next(colorText);
  }

  colorStreamListener = this.colorStream.asObservable();

  constructor() { }
}
