import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { PageErrorRoutingModule } from '@error/page-error-routing.module';
import { ErrorPageNotFoundComponent } from '@error/error-page-not-found/error-page-not-found.component';
import { ErrorPageForbiddenComponent } from '@error/error-page-forbidden/error-page-forbidden.component';
import {
  AppPageErrorActionDirective,
  AppPageErrorInfoDirective,
  AppPageErrorTitleDirective,
  PageErrorComponent,
} from '@error/page-error.component';

@NgModule({
  imports: [SharedModule, PageErrorRoutingModule],
  declarations: [
    AppPageErrorTitleDirective,
    AppPageErrorActionDirective,
    AppPageErrorInfoDirective,
    PageErrorComponent,
    /**
     * Pages d'erreur
     */
    ErrorPageNotFoundComponent,
    ErrorPageForbiddenComponent,
  ],
  exports: [
    AppPageErrorTitleDirective,
    AppPageErrorActionDirective,
    AppPageErrorInfoDirective,
    PageErrorComponent,
  ],
})
export class PageErrorModule {
}
