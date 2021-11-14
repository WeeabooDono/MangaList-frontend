import { NgModule } from '@angular/core';
import { NavbarComponent } from './navbar.component';
import { AngularMaterialModule } from '@shared/angular-material.module';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [AngularMaterialModule, RouterModule, TranslateModule, CommonModule],
  declarations: [NavbarComponent],
  exports: [NavbarComponent],
})
export class NavbarModule {
}
