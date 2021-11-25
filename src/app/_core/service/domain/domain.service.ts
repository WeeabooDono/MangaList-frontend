import { Injectable } from '@angular/core';
import { Destroyed } from '@core/hooks/destroyed';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { NavigationEnd, ResolveEnd, Router } from '@angular/router';
import { filter, map, pluck, takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

export const domains = ['fr', 'us'];

@Injectable({ providedIn: 'root' })
export class DomainService extends Destroyed {

  public static readonly KEY = 'domain';
  public static readonly DEFAULT_DOMAIN = domains[0];

  private _valueChange$: BehaviorSubject<string> = new BehaviorSubject<string>(DomainService.getDefaultDomain());

  get valueChange$(): Observable<string> {
    return this._valueChange$.asObservable();
  }

  constructor(private router: Router,
              private translate: TranslateService) {
    super();
  }

  private static getDefaultDomain(): string {
    const storedDomain = localStorage.getItem(DomainService.KEY);
    return storedDomain ? storedDomain : DomainService.DEFAULT_DOMAIN;
  }

  private switchDomain(domain: string) {
    if (this._valueChange$.value !== domain) {
      this._valueChange$.next(domain);
    }
  }

  public init(): void {
    this.initLocalStorageDomainListeners();
    this.initNavigationEndEventListener();
    this.initSwitchLangListener();
  }

  private initLocalStorageDomainListeners(): void {
    this.valueChange$.pipe(takeUntil(this.destroyed$))
      .subscribe(domain => {
        if (domain) {
          localStorage.setItem(DomainService.KEY, domain);
        } else {
          // Should never happen
          localStorage.removeItem(DomainService.KEY);
        }
      });
  }

  private initNavigationEndEventListener(): void {
    const navigationEndEvent$ = this.router.events.pipe(takeUntil(this.destroyed$), filter((event) => event instanceof NavigationEnd));
    navigationEndEvent$.pipe(map(() => this.getDomainIfExists()))
      .subscribe(domain => {
        if (domain) {
          this.switchDomain(domain);
        }
      });
  }

  private initSwitchLangListener(): void {
    // On check les "ResolveEnd" pour la traduction
    const resolveEndEvent$ = this.router.events.pipe(takeUntil(this.destroyed$), filter((event) => event instanceof ResolveEnd));
    combineLatest([this.valueChange$, resolveEndEvent$])
      .pipe(takeUntil(this.destroyed$), pluck(0))
      .subscribe(domain => {
        if (domain) {
          this.translate.addLangs([domain]);
          this.translate.setDefaultLang(domain);
          this.translate.use(domain);
        }
      });
  }

  private getDomainIfExists(): string | undefined {
    let route = this.router.routerState.root;
    while (route.firstChild) {
      const domain = route.snapshot.paramMap.get(DomainService.KEY);
      if (domain) {
        return domain;
      }
      route = route.firstChild;
    }
    return undefined;
  }
}
