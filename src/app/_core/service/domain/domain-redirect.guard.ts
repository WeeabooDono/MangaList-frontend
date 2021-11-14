import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DomainService } from '@core/service/domain/domain.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DomainRedirectGuard implements CanActivate {

  constructor(private router: Router, private domainService: DomainService) {
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.domainService.valueChange$.pipe(
      map(domain => '/' + domain + '/home'),
      map(url => this.router.parseUrl(url)));
  }
}
