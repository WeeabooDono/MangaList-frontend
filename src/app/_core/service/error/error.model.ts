import { InjectionToken } from '@angular/core';
import { HttpHeaders, HttpRequest } from '@angular/common/http';

export const ERROR_MANAGER_CONFIG = new InjectionToken<ErrorManagerConfig>('error.manager.config');

export interface ErrorHttpResponse {
  url?: string;
  method?: string;
  status?: number;
}

export interface ErrorManagerConfig {
  ignoreHttpResponse?: ErrorHttpResponse[];
  snackbarIgnoreHttpResponse?: ErrorHttpResponse[];
  pageErrorManagedHttpResponse?: ErrorHttpResponse[];
  pageErrorIgnoredHttpResponse?: ErrorHttpResponse[];
}

export interface HttpError {
  code: number;
  title: string;
  message: string;
  exceptionMessage?: string;
  exceptionType?: string;
  ignore: boolean;
  request?: HttpRequest<any>;
  headers?: HttpHeaders;
}
