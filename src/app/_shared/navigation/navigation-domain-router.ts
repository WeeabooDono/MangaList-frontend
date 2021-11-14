import { NavigationRouter } from '@shared/navigation/navigation-router';
import { ActivatedRoute, Router } from '@angular/router';
import { DomainService } from '@core/service/domain/domain.service';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

export abstract class NavigationDomainRouter extends NavigationRouter {

  protected constructor(protected router: Router, protected route: ActivatedRoute, protected domainService: DomainService) {
    super(router, route);
  }

  public navigateToDomain(path: string | string[]): void {
    this.getDomainRoute(path).subscribe(route => this.router.navigate(route));
  }

  public getDomainRoute(path: string | string[]): Observable<string[]> {
    const paths: string[] = typeof path === 'string' ? path.split('/').filter(route => route): path;
    return this.domainService.valueChange$.pipe(take(1), map(domain => ['/' + domain, ...paths]));
  }
}
