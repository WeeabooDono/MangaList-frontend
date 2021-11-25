import { Injectable } from '@angular/core';
import { Destroyed } from '@core/hooks/destroyed';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { combineLatest, Subject } from 'rxjs';
import { DomainService } from '@core/service/domain/domain.service';

@Injectable({ providedIn: 'root' })
export class BrowserTitleService extends Destroyed implements Destroyed {

  private readonly appName: string;

  private customPageTitle$ = new Subject<string | null>();

  constructor(private domainService: DomainService,
              private title: Title,
              private router: Router,
              private route: ActivatedRoute,
              private translate: TranslateService) {
    super();
    this.appName = BrowserTitleService.capitalize(this.title.getTitle());
  }

  private static capitalize(string: string): string {
    if (!string) {
      return string;
    }
    return string[0].toUpperCase() + string.substr(1);
  }

  private static findBrowserTitle(route: ActivatedRoute): any {
    if (route.snapshot.data.browserTitle?.inherit) {
      return BrowserTitleService.findBrowserTitle(route.parent!);
    }
    return route.snapshot.data.browserTitle;
  }

  public init(): void {
    // On récupère le browserTitle lors d'une fin de navigation
    const browserTitle$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map(() => {
        let route = this.router.routerState.root;
        while (route.firstChild) {
          route = route.firstChild;
        }
        return BrowserTitleService.findBrowserTitle(route);
      }));

    const after$ = browserTitle$.pipe(map(browserTitle => browserTitle?.after));
    const routeTitle$ = browserTitle$.pipe(map(browserTitle => browserTitle?.title), switchMap(title => this.translate.get(title)));

    // On combine le tout pour afficher le titre comme voulu. Il sera donc mis à jour sur un évènement de fin
    // de navifation, sur un changement de domain ou sur une modification du customPageTitle.
    combineLatest([this.customPageTitle$, routeTitle$, after$, this.domainService.valueChange$])
      .pipe(takeUntil(this.destroyed))
      .subscribe(([customPageTitle, routeTitle, after, domain]) => {
        this.updateTitle(customPageTitle ? customPageTitle : routeTitle, after, domain);
      });

    // On commence par clear le customPageTitle
    this.clearCustomTitle();
  }

  private updateTitle(pageTitle: string, after?: boolean, domain?: string): void {
    if (pageTitle) {
      const beforeText = after ? this.appName : pageTitle;
      const afterText = after ? pageTitle : this.appName;
      this.title.setTitle(`${ beforeText } - ${ afterText }`);
    } else {
      this.title.setTitle(this.appName);
    }
  }

  private clearCustomTitle() {
    this.setCustomTitle(null);
  }

  public setCustomTitle(pageTitle: string | null): void {
    this.customPageTitle$.next(pageTitle);
  }

  public ngOnDestroy(): void {
    super.ngOnDestroy();
    this.title.setTitle(this.appName);
  }
}
