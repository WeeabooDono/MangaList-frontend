import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { NavigationRouter } from '@shared/navigation/navigation-router';
import { ActivatedRoute, Router } from '@angular/router';
import { DomainService } from '@core/service/domain/domain.service';
import { NavigationDomainRouter } from '@shared/navigation/navigation-domain-router';

@Component({
  selector: 'error-page-forbidden',
  templateUrl: './error-page-forbidden.component.html',
  styleUrls: ['./error-page-forbidden.component..scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorPageForbiddenComponent extends NavigationDomainRouter {
  @HostBinding('class.error-page-forbidden') isNotFound: boolean;

  constructor(router: Router, route: ActivatedRoute, domainService: DomainService) {
    super(router, route, domainService);
    this.isNotFound = true;
  }
}
