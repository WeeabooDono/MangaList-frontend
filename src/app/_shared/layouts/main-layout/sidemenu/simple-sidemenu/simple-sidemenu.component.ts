import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Sidemenu } from '../sidemenu';
import { DomainService } from '@core/service/domain/domain.service';

@Component({
  selector: 'simple-sidemenu',
  templateUrl: 'simple-sidemenu.component.html',
  styleUrls: ['simple-sidemenu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleSidemenuComponent extends Sidemenu {
  @HostBinding('class.simple-sidemenu') isSimpleSidemenu: boolean;

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected breakpointObserver: BreakpointObserver,
    protected cd: ChangeDetectorRef,
    protected domainService: DomainService,
  ) {
    super(router, route, breakpointObserver, cd, domainService);
    this.isSimpleSidemenu = true;
  }
}
