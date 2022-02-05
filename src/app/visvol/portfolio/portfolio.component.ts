import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { PositionBuilderService } from '../../services/position-builder.service';
import { moneynessMap, MoneynessUnit, OptionLegBase, OptionPosition, OptionSpreadConfigBase, OptionSymbolMetadata, OptionType } from '../../common/option_interfaces';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'exp-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioComponent implements OnInit {

  // items = new Array(30);

  // positions$:Observable<OptionPosition[]> = of();

  constructor(private readonly posnBuilderService: PositionBuilderService) { }

  ngOnInit(): void {
  }

}
