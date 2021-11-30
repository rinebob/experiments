import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'exp-opportunities',
  templateUrl: './opportunities.component.html',
  styleUrls: ['./opportunities.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush, 
})
export class OpportunitiesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
