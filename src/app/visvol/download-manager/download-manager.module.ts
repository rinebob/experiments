import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {DownloadManagerRoutingModule} from './download-manager-routing.module';
import { DownloadManagerComponent } from './download-manager.component';



@NgModule({
  declarations: [
    DownloadManagerComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    DownloadManagerRoutingModule,
  ],
  exports: [
    DownloadManagerComponent,
  ],
})
export class DownloadManagerModule { }
