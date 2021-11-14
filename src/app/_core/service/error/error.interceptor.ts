import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { ErrorNotifierService } from '@core/service/error/error-notifier.service';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpError } from '@core/service/error/error.model';
import { HttpHeaders } from '@core/service/error/http.model';

@Injectable({ providedIn: 'root' })
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private errorNotifierService: ErrorNotifierService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: any, caught) => {
        try {
          if(req.responseType === 'arraybuffer') {
            console.log(err.error);
            // TODO: corriger cette partie
            // const decodedString = String.fromCharCode.apply(null, new Uint8Array(err.error));
            // err.error = JSON.parse(decodedString);
          } else if (req.responseType === 'text' && typeof err.error !== 'object') {
            err.error = JSON.parse(err.error);
          }
        } catch (e) {
          if(e instanceof SyntaxError) {
            err.error = {};
          } else {
            console.error(e);
          }
        }
        return this.manageError(req, err);
      }),
    );
  }

  private static hasHeader(errorResponse: HttpErrorResponse, header: string): boolean {
    return errorResponse.headers !== null && errorResponse.headers !== undefined && errorResponse.headers.has(header);
  }

  private static hasHeaderWithValue(errorResponse: HttpErrorResponse, header: string, value: string): boolean {
    return ErrorInterceptor.hasHeader(errorResponse, header) && errorResponse.headers.get(header)?.toLowerCase() === value.toLowerCase();
  }

  private static isHttpErrorFromServer(arg: HttpError) {
    return arg.exceptionMessage !== undefined && arg.exceptionType !== undefined && arg.message !== undefined;
  }

  private manageError(req: HttpRequest<any>, errorResponse: HttpErrorResponse) {
    if(!ErrorInterceptor.hasHeaderWithValue(errorResponse, HttpHeaders.XHttpInterceptError, 'false')){
      const error: HttpError = Object.assign(
        {},
        { code: errorResponse.status, request: req, headers: errorResponse.error },
        errorResponse.error,
      );

      if (!error.message || !ErrorInterceptor.isHttpErrorFromServer(errorResponse.error)) {
        error.title = `app.http.error.${error.code}.title`;
        error.message = `app.http.error.${error.code}.msg`;
      }

      if(!error.exceptionMessage) {
        error.exceptionMessage = errorResponse.message;
      }

      this.errorNotifierService.push(error);
    }
    return throwError(errorResponse);
  }
}
