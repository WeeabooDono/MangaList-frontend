import { NgModule } from '@angular/core';
import { SimpleSidemenuComponent } from './simple-sidemenu.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AngularMaterialModule } from '@shared/angular-material.module';
import { SidemenuModule } from '@shared/layouts/main-layout/sidemenu/sidemenu.module';

@NgModule({
  declarations: [SimpleSidemenuComponent],
  exports     : [SimpleSidemenuComponent],
  imports     : [
    CommonModule,
    AngularMaterialModule,
    RouterModule,
    TranslateModule,
    SidemenuModule,
  ],
})
export class SimpleSidemenuModule { }
