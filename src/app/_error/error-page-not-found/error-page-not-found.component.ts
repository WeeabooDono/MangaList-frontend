import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomainService } from '@core/service/domain/domain.service';
import { NavigationDomainRouter } from '@shared/navigation/navigation-domain-router';

@Component({
  selector: 'error-page-not-found',
  templateUrl: './error-page-not-found.component.html',
  styleUrls: ['./error-page-not-found.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorPageNotFoundComponent extends NavigationDomainRouter {
  @HostBinding('class.error-page-not-found') isNotFound: boolean;

  constructor(router: Router, route: ActivatedRoute, domainService: DomainService) {
    super(router, route, domainService);
    this.isNotFound = true;
  }
}
