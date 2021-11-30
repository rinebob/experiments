import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'exp-visvol',
  templateUrl: './visvol.component.html',
  styleUrls: ['./visvol.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VisvolComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
