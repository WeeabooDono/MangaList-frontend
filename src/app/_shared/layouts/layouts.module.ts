import { NgModule } from '@angular/core';
import { MainLayoutModule } from './main-layout/main-layout.module';
import { SidemenuModule } from '@shared/layouts/main-layout/sidemenu/sidemenu.module';
import { SubheaderModule } from '@shared/layouts/main-layout/subheader/subheader.module';

@NgModule({
  exports: [
    MainLayoutModule,
    SidemenuModule,
    SubheaderModule],
})
export class LayoutsModule { }
