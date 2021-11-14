import { Directive, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

@Directive()
export abstract class Destroyed implements OnDestroy {

  protected destroyed: Subject<void>;

  protected constructor() {
    this.destroyed = new Subject<void>();
  }

  ngOnDestroy(): void {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
