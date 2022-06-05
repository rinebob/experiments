import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

import { AnalysisRoutingModule } from './analysis-routing.module';
import { AnalysisComponent } from './analysis.component';
import { AnalysisDashboardComponent } from './analysis-dashboard/analysis-dashboard.component';
import { TradedStrikesModule } from './traded-strikes/traded-strikes.module';


@NgModule({
  declarations: [
    AnalysisComponent,
    AnalysisDashboardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatSelectModule,
    AnalysisRoutingModule,
    TradedStrikesModule
  ]
})
export class AnalysisModule { }
