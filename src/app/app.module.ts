import { ApplicationRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from '@core/core.module';
import { HomeModule } from './home/home.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from '@shared/angular-material.module';
import { IconService } from '@core/service/utils/icon.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorNotifierService } from '@core/service/error/error-notifier.service';
import { ErrorInterceptor } from '@core/service/error/error.interceptor';
import { MangasModule } from 'app/mangas/mangas.module';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorIntlTranslate } from '@shared/components/pagination/MatPaginatorIntl.translate';
import { TranslateService } from '@ngx-translate/core';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    HomeModule,
    MangasModule,
    AppRoutingModule,
    AngularMaterialModule,
  ],
  providers: [
    ErrorNotifierService,
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MatPaginatorIntl, useClass: MatPaginatorIntlTranslate, deps: [TranslateService] },
  ],
})
export class AppModule {

  /**
   * ApplicationRef to avoid NullInjectorError
   */
  constructor(private iconService: IconService, public appRef: ApplicationRef) {
    this.iconService.registerSvgIcons();
  }
}
