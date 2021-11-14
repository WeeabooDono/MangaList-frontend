import { ChangeDetectorRef, Directive, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';

@Directive()
export abstract class BaseOutlet implements OnInit {

  protected constructor(protected route: ActivatedRoute, protected cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.initParametersFromRouteData(this.route.snapshot);
  }

  private initParametersFromRouteData(route: ActivatedRouteSnapshot) {
    if (route.data) {
      this.cd.markForCheck();
    }
  }
}
