import { ChangeDetectorRef, Directive, Input } from '@angular/core';
import { MenuItem } from '@shared/models/tools/menu.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { DomainService } from '@core/service/domain/domain.service';
import { NavigationDomainRouter } from '@shared/navigation/navigation-domain-router';

@Directive()
export abstract class Sidemenu extends NavigationDomainRouter {

  @Input()
  public sideMenuItems: MenuItem[] = [];

  public isMobile = false;

  protected constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected breakpointObserver: BreakpointObserver,
    protected cd: ChangeDetectorRef,
    protected domainService: DomainService) {
    super(router, route, domainService);

    breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        this.isMobile = result.matches;
        this.cd.markForCheck();
      });
  }
}
