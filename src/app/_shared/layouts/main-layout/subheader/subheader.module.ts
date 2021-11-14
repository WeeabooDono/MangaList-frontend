import { NgModule } from '@angular/core';
import { MainSubheaderModule } from './main-subheader/main-subheader.module';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  SubheaderComponent,
  SubheaderContentDirective, SubheaderFabDirective, SubheaderNavbarDirective,
} from '@shared/layouts/main-layout/subheader/subheader.component';

@NgModule({
  imports     : [CommonModule, MatToolbarModule],
  declarations: [
    SubheaderComponent,
    SubheaderContentDirective,
    SubheaderNavbarDirective,
    SubheaderFabDirective,
  ],
  exports: [
    SubheaderComponent,
    SubheaderContentDirective,
    SubheaderNavbarDirective,
    SubheaderFabDirective],
})
export class SubheaderModule { }
