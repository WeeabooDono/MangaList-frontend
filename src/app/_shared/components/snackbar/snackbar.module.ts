import { SNACKBAR_DEFAULT_OPTIONS, SnackbarConfig } from '@shared/components/snackbar/snackbar.model';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { SnackbarComponent } from '@shared/components/snackbar/snackbar.component';
import { SnackbarService } from '@shared/components/snackbar/snackbar.service';
import { AngularMaterialModule } from '@shared/angular-material.module';
import { CommonModule } from '@angular/common';

export const snackbarDefaultOptionFactory = (): SnackbarConfig => {
  const config: SnackbarConfig = new SnackbarConfig();
  config.duration = 4000;
  return config;
};

export const SNACKBAR_DEFAULT_OPTIONS_PROVIDER = {
  provide: SNACKBAR_DEFAULT_OPTIONS,
  useFactory: snackbarDefaultOptionFactory,
};

@NgModule({
  imports: [AngularMaterialModule, CommonModule],
  declarations: [SnackbarComponent],
  providers: [SnackbarService],
})
export class SnackbarModule {

  public static forRoot(): ModuleWithProviders<SnackbarModule> {
    return {
      ngModule: SnackbarModule,
      providers: [SNACKBAR_DEFAULT_OPTIONS_PROVIDER],
    };
  }
}
