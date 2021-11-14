import { NgModule } from '@angular/core';
import { SearchComponent } from '@shared/components/search/search.component';
import { AngularMaterialModule } from '@shared/angular-material.module';
import { CommonModule } from '@angular/common';
import { CoreModule } from '@core/core.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [AngularMaterialModule, CommonModule, CoreModule, ReactiveFormsModule],
  declarations: [SearchComponent],
  exports: [SearchComponent],
})
export class SearchModule {
}
