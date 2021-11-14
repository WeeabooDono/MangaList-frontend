import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LOCALE_ID, NgModule, Optional, SkipSelf } from '@angular/core';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ERROR_MANAGER_CONFIG, ErrorManagerConfig } from '@core/service/error/error.model';

// inscription pour la langue par défaut : Français
registerLocaleData(localeFr);

// déclaration du loader translate
export const httpLoaderFactory = (http: HttpClient) => new TranslateHttpLoader(http, './i18n/', '.json');

export const ERROR_MANAGER_DI_CONFIG: ErrorManagerConfig = {
  snackbarIgnoreHttpResponse: [{ status: 401 }, { status: 403 }],
  pageErrorManagedHttpResponse: [{ status: 403 }],
};

@NgModule({
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [TranslateModule, HttpClientModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' },
    { provide: ERROR_MANAGER_CONFIG, useValue: ERROR_MANAGER_DI_CONFIG },
  ],
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
      parentModule: CoreModule,
  ) {
    if (parentModule) {
      throw new Error('CoreModule est déjà chargé.On ne l\'importe que dans le AppModule.');
    }
  }
}
