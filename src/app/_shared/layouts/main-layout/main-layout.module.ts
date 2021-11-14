import { NgModule } from '@angular/core';
import { MainLayoutComponent, MainLayoutSidenavDirective, MainLayoutSubheaderDirective } from './main-layout.component';
import { FooterModule } from '@shared/layouts/_footer/footer.module';
import { NavbarModule } from '@shared/layouts/main-layout/navbar/navbar.module';
import { ToolbarModule } from '@shared/layouts/_toolbar/toolbar.module';
import { AngularMaterialModule } from '@shared/angular-material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SimpleSidemenuModule } from '@shared/layouts/main-layout/sidemenu/simple-sidemenu/simple-sidemenu.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { PageLayoutModule } from '@shared/layouts/_page-layout/page-layout.module';
import { LanguageItemModule } from '@shared/components/language-item/language-item.module';

@NgModule({
  declarations: [
    MainLayoutComponent,
    MainLayoutSidenavDirective,
    MainLayoutSubheaderDirective],
  exports: [
    MainLayoutComponent,
    MainLayoutSidenavDirective,
    MainLayoutSubheaderDirective],
  imports: [
    FooterModule,
    NavbarModule,
    ToolbarModule,
    AngularMaterialModule,
    CommonModule,
    FormsModule,
    SimpleSidemenuModule,
    TranslateModule,
    RouterModule,
    PageLayoutModule,
    LanguageItemModule,
  ],
})
export class MainLayoutModule {
}
