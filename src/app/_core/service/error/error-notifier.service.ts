import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpError } from '@core/service/error/error.model';

@Injectable({ providedIn: 'root' })
export class ErrorNotifierService {
  public readonly error$: Observable<HttpError>;

  private readonly errorSubject: Subject<HttpError>;

  constructor() {
    this.errorSubject = new Subject<HttpError>();
    this.error$ = this.errorSubject.asObservable();
  }

  public push(error: HttpError): void {
    this.errorSubject.next(error);
  }
}
