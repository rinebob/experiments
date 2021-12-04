import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'exp-experiments',
  templateUrl: './experiments.component.html',
  styleUrls: ['./experiments.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperimentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
