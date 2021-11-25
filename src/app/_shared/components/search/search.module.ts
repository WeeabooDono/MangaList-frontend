import { NgModule } from '@angular/core';
import { SearchComponent } from '@shared/components/search/search.component';
import { AngularMaterialModule } from '@shared/angular-material.module';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [AngularMaterialModule, CommonModule, ReactiveFormsModule, TranslateModule],
  declarations: [SearchComponent],
  exports: [SearchComponent],
})
export class SearchModule {
}
