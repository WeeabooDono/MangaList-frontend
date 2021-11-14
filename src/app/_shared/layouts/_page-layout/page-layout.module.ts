import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ScrollingModule } from '@angular/cdk/scrolling';
import {
  PageLayoutComponent,
  PageLayoutContentDirective,
  PageLayoutFooterDirective,
  PageLayoutHeaderDirective,
  PageLayoutSidenavDirective,
  PageLayoutSubHeaderDirective,
} from '@shared/layouts/_page-layout/page-layout.component';

@NgModule({
  imports: [CommonModule, MatSidenavModule, ScrollingModule],
  declarations: [
    PageLayoutComponent,
    PageLayoutHeaderDirective,
    PageLayoutSubHeaderDirective,
    PageLayoutContentDirective,
    PageLayoutFooterDirective,
    PageLayoutSidenavDirective,
  ],
  exports: [
    PageLayoutComponent,
    PageLayoutHeaderDirective,
    PageLayoutSubHeaderDirective,
    PageLayoutContentDirective,
    PageLayoutFooterDirective,
    PageLayoutSidenavDirective,
  ],
})
export class PageLayoutModule {
}
