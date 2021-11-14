import { BaseLayout } from '../base-layout';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  HostBinding,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { mainNavbarItems, MenuItem } from '@shared/models/tools/menu.model';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LocalStorageService } from '@core/service/utils/local-storage.service';
import { SidenavMode } from '@shared/layouts/main-layout/subheader/subheader.model';
import { PageLayoutComponent } from '@shared/layouts/_page-layout/page-layout.component';
import { domains, DomainService } from '@core/service/domain/domain.service';
import { Router } from '@angular/router';

@Component({
  selector: 'main-layout',
  templateUrl: 'main-layout.component.html',
  styleUrls: ['main-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent extends BaseLayout implements AfterViewInit, OnChanges, OnInit {
  @HostBinding('class.main-layout') isMainLayout: boolean;

  @ViewChild('pageLayout')
  public pageLayout!: PageLayoutComponent;

  public mobileView$!: Observable<boolean>;

  public isDarkTheme: boolean = false;
  public domain$: Observable<string> = new Observable<string>();

  public isMobile: boolean = false;
  public navbarItems: MenuItem[];

  public mode: SidenavMode;
  public isOpened = false;
  public languageDomain: string[] = domains;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private cd: ChangeDetectorRef,
    private localStorage: LocalStorageService,
    private domainService: DomainService,
    private router: Router,
  ) {
    super();
    this.isMainLayout = true;
    this.navbarItems = mainNavbarItems;
    this.mode = SidenavMode.Side;
    this.sidenavVisibility = 'responsive';
    this.footerCondensed = true;
    this.domain$ = this.domainService.valueChange$;

    breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        this.isMobile = result.matches;
        this.cd.markForCheck();
      });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.sidenavVisibility) {
      this.manageSidenavVisibility();
    }
  }

  public ngAfterViewInit(): void {
    this.mobileView$ = this.pageLayout.mobileView$;
  }

  public storeThemeSelection(): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.localStorage.set('theme', this.isDarkTheme ? 'Dark' : 'Light');
  }

  public ngOnInit(): void {
    this.isDarkTheme = this.localStorage.get('theme') === 'Dark';
  }

  private manageSidenavVisibility() {
    this.footerCondensed = this.sidenavVisibility === 'visible';
  }

  public switchDomain(language: string): void {
    const url: string[] = this.router.url.split('/').filter(route => route);
    const previousDomain: string = domains.filter(domain => url.includes(domain))[0];
    url[url.indexOf(previousDomain)] = language;
    this.router.navigate(url);
  }
}

@Directive({
  selector: 'main-layout-sidenav',
})
export class MainLayoutSidenavDirective {
}

@Directive({
  selector: 'main-layout-subheader',
})
export class MainLayoutSubheaderDirective {
}
