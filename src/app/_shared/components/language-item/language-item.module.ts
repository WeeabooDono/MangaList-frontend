import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '@shared/angular-material.module';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageItemComponent } from '@shared/components/language-item/language-item.component';

@NgModule({
  imports: [AngularMaterialModule, CommonModule, RouterModule],
  declarations: [LanguageItemComponent],
  exports: [LanguageItemComponent],
})
export class LanguageItemModule {
}
