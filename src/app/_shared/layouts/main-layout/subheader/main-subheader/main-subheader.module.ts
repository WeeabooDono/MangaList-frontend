import { NgModule } from '@angular/core';
import { MainSubheaderComponent } from './main-subheader.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AngularMaterialModule } from '@shared/angular-material.module';
import { SubheaderModule } from '@shared/layouts/main-layout/subheader/subheader.module';

@NgModule({
  declarations: [MainSubheaderComponent],
  exports     : [MainSubheaderComponent],
    imports     : [
        CommonModule,
        AngularMaterialModule,
        RouterModule,
        TranslateModule,
        SubheaderModule,
    ],
})
export class MainSubheaderModule { }
