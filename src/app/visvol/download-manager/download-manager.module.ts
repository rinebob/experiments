import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DownloadManagerRoutingModule} from './download-manager-routing.module';
import { DownloadManagerComponent } from './download-manager.component';



@NgModule({
  declarations: [
    DownloadManagerComponent
  ],
  imports: [
    CommonModule,
    DownloadManagerRoutingModule
  ]
})
export class DownloadManagerModule { }
