import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { MenuItem } from '@shared/models/tools/menu.model';
import { Destroyed } from '@core/hooks/destroyed';
import { DomainService } from '@core/service/domain/domain.service';
import { NavigationDomainRouter } from '@shared/navigation/navigation-domain-router';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'navbar',
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent extends NavigationDomainRouter {
  @HostBinding('class.navbar') isNavbar: boolean;

  @Input()
  public navbarItems: MenuItem[] = [];

  constructor(router: Router, route: ActivatedRoute, domainService: DomainService) {
    super(router, route, domainService);
    this.isNavbar = true;
  }
}
