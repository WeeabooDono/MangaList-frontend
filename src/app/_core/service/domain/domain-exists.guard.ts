import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { domains, DomainService } from '@core/service/domain/domain.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DomainExistsGuard implements CanActivate {

  constructor(private router: Router, private domainService: DomainService) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const domainExists = domains.find(domain => domain === route.paramMap.get(DomainService.KEY)) !== undefined;
    return domainExists ? domainExists : this.domainService.valueChange$.pipe(
      map(domain => '/' + domain + '/error/404'),
      map(url => this.router.parseUrl(url)));
  }
}
