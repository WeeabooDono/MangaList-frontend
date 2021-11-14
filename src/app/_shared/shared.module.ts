import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { OutletsModule } from '@shared/outlets/outlets.module';
import { AngularMaterialModule } from '@shared/angular-material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CustomComponentModule } from '@shared/components/custom-component.module';
import { CardsModule } from '@shared/components/cards/cards.module';

@NgModule({
  exports: [
    TranslateModule,
    CommonModule,
    OutletsModule,
    FormsModule,
    AngularMaterialModule,
    CustomComponentModule,
  ],
})
export class SharedModule { }
