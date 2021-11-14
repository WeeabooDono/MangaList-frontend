import { NgModule } from '@angular/core';
import { SimpleSidemenuModule } from './simple-sidemenu/simple-sidemenu.module';
import { CommonModule } from '@angular/common';
import { PortalModule } from '@angular/cdk/portal';
import {
  SidemenuComponent,
  SidemenuContentDirective,
  SidemenuFabComponent, SidemenuFooterDirective, SidemenuHeaderComponent,
} from '@shared/layouts/main-layout/sidemenu/sidemenu.component';

@NgModule({
  imports     : [CommonModule, PortalModule],
  declarations: [
    SidemenuComponent,
    SidemenuContentDirective,
    SidemenuFabComponent,
    SidemenuHeaderComponent,
    SidemenuFooterDirective,
  ],
  exports: [
    SidemenuComponent,
    SidemenuContentDirective,
    SidemenuFabComponent,
    SidemenuHeaderComponent,
    SidemenuFooterDirective,
  ],
})
export class SidemenuModule {
}
