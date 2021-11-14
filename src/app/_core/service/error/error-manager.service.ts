import { Inject, Injectable, Optional } from '@angular/core';
import { Destroyed } from '@core/hooks/destroyed';
import {
  ERROR_MANAGER_CONFIG,
  ErrorHttpResponse,
  ErrorManagerConfig,
  HttpError,
} from '@core/service/error/error.model';
import { SnackbarService } from '@shared/components/snackbar/snackbar.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { ErrorNotifierService } from '@core/service/error/error-notifier.service';
import { takeUntil } from 'rxjs/operators';
import { SnackbarType } from '@shared/components/snackbar/snackbar.model';

const defaultErrorMessage = 'error.default.msg';

@Injectable({ providedIn: 'root' })
export class ErrorManagerService extends Destroyed {
  constructor(
    @Optional() @Inject(ERROR_MANAGER_CONFIG) private errorManagerConfig: ErrorManagerConfig,
    private errorNotifierService: ErrorNotifierService,
    private snackbarService: SnackbarService,
    private translate: TranslateService,
    private router: Router,
  ) {
    super();

    this.errorNotifierService.error$.pipe(takeUntil(this.destroyed)).subscribe((error) => {
      this.logError(error);
      this.manageSnackbar(error);
      this.managePageError(error);
    });
  }

  private logError(error: HttpError): void {
    let errorMessage = '';
    if (error.message) {
      errorMessage = this.translate.instant(error.message);
    }
    if (error.exceptionMessage) {
      errorMessage = `${ errorMessage } - ${ error.exceptionMessage }`;
    }
  }

  private manageSnackbar(error: HttpError): void {
    if (
      !this.matchHttpResponse(this.errorManagerConfig.ignoreHttpResponse!, error) &&
      !this.matchHttpResponse(this.errorManagerConfig.snackbarIgnoreHttpResponse!, error)
    ) {
      this.snackbarService.open(error.message ? error.message : defaultErrorMessage, null, SnackbarType.Error);
    }
  }

  private managePageError(error: HttpError): void {
    if (
      !this.matchHttpResponse(this.errorManagerConfig.ignoreHttpResponse!, error) &&
      !this.matchHttpResponse(this.errorManagerConfig.pageErrorIgnoredHttpResponse!, error) &&
      !this.matchHttpResponse(this.errorManagerConfig.pageErrorManagedHttpResponse!, error)
    ) {
      this.router.navigate([`/error/${ error.code }`]).catch(error => console.log(error));
    }
  }

  private matchHttpResponse(errorHttpResponses: ErrorHttpResponse[], error: HttpError): boolean {
    let match = false;

    if (this.errorManagerConfig && errorHttpResponses && error.request) {
      match = errorHttpResponses.some((response) => {
        let matchStatus = true;
        let matchUrl = true;
        let matchMethod = true;

        if (response.url) {
          const regExpUrl = new RegExp(response.url);
          matchUrl = regExpUrl.test(error.request!.url);
        }

        if (response.status) {
          matchStatus = response.status === error.code;
        }

        if (response.method) {
          matchMethod = response.method === error.request?.method;
        }
        return matchMethod && matchUrl && matchStatus;
      });
    }
    return match;
  }
}
