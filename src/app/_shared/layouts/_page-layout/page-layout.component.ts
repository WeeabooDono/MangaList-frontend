import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Destroyed } from '@core/hooks/destroyed';
import { MatSidenav, MatSidenavContainer } from '@angular/material/sidenav';
import { CdkScrollable } from '@angular/cdk/overlay';
import { BehaviorSubject, Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { SidenavMode, SidenavModeType } from '@shared/layouts/main-layout/subheader/subheader.model';

@Directive({ selector: 'page-layout-header' })
export class PageLayoutHeaderDirective {
  @HostBinding('class.page-layout-header') isLayoutHeader: boolean;

  constructor() {
    this.isLayoutHeader = true;
  }
}

@Directive({ selector: 'page-layout-subheader' })
export class PageLayoutSubHeaderDirective {
  @HostBinding('class.page-layout-subheader') isLayoutSubHeader: boolean;

  constructor() {
    this.isLayoutSubHeader = true;
  }
}

@Directive({ selector: 'page-layout-content' })
export class PageLayoutContentDirective {
  @HostBinding('class.page-layout-content') isLayoutContent: boolean;

  constructor() {
    this.isLayoutContent = true;
  }
}

@Directive({ selector: 'page-layout-footer' })
export class PageLayoutFooterDirective {
  @HostBinding('class.page-layout-footer') isLayoutFooter: boolean;

  constructor() {
    this.isLayoutFooter = true;
  }
}

@Directive({ selector: 'page-layout-sidenav' })
export class PageLayoutSidenavDirective {
  @HostBinding('class.page-layout-footer') isLayoutSidenav: boolean;

  constructor() {
    this.isLayoutSidenav = true;
  }
}

@Component({
  selector: 'page-layout',
  templateUrl: 'page-layout.component.html',
  styleUrls: ['page-layout.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageLayoutComponent extends Destroyed implements OnInit, OnChanges, AfterViewInit {
  @Input() public isOpened = true;
  @Input() public disableClose = false;
  @Input() public mode: SidenavModeType = 'side';
  @Input() public onTop = false;
  @Input() public sidenavVisibility: 'visible' | 'hidden' | 'responsive' = 'responsive';
  @Input() public idScroll!: string;
  @Input() public startScrollOnTop = false;

  @Output() public startOpened = new EventEmitter<boolean>();
  @Output() public opened = new EventEmitter<boolean>();

  @HostBinding('class.page-layout') isPageLayout: boolean;

  @ViewChild('sidenav') public sidenav!: MatSidenav;
  @ViewChild('wrapper', { static: true }) public wrapper!: ElementRef;
  @ViewChild('body', { static: true }) public body!: ElementRef;
  @ViewChild(MatSidenavContainer, { static: true }) sidenavContainer!: MatSidenavContainer;
  @ViewChild(CdkScrollable, { static: true }) public scrollable!: CdkScrollable;

  public mobileView$: Observable<boolean>;
  public isMobileView!: boolean;

  public navMode$: Observable<string>;

  private mobileViewSubject: BehaviorSubject<boolean>;
  private navModeSubject: BehaviorSubject<string>;

  constructor(private breakpointObserver: BreakpointObserver,
              private changeDetectorRef: ChangeDetectorRef,
              private renderer: Renderer2,
              private router: Router) {
    super();
    this.isPageLayout = true;
    this.mobileViewSubject = new BehaviorSubject<boolean>(false);
    this.mobileView$ = this.mobileViewSubject.asObservable();
    this.navModeSubject = new BehaviorSubject<string>(this.mode);
    this.navMode$ = this.navModeSubject.asObservable();
  }

  ngAfterViewInit() {
    this.onChangePage();
    this.manageMobileView();
  }

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(takeUntil(this.destroyed$))
      .subscribe((result) => {
        this.isMobileView = result.matches;
        this.mobileViewSubject.next(result.matches);
        this.updateDisplay();
        this.changeDetectorRef.markForCheck();
      });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.displayWidth || changes.isPage) {
      this.updateDisplay();
    } else if (changes.mode) {
      this.manageMobileView();
      this.manageSidenavMode(this.mode);
    }
  }

  public elementScrolled(): Observable<any> {
    return this.scrollable.elementScrolled();
  }

  public open(event: Event) {
    this.sidenav.open();
    PageLayoutComponent.stopEventPropagation(event, 'open');
    this.changeDetectorRef.markForCheck();
  }

  public close(event: Event) {
    this.sidenav.open();
    PageLayoutComponent.stopEventPropagation(event, 'close');
    this.changeDetectorRef.markForCheck();
  }

  public toggle(event: Event) {
    this.sidenav.open();
    PageLayoutComponent.stopEventPropagation(event, 'toggle');
    this.changeDetectorRef.markForCheck();
  }

  public onStartSwitch(value: boolean) {
    this.startOpened.next(value);
  }

  public onSwitch(value: boolean) {
    this.opened.next(value);
  }

  private onChangePage() {
    this.router.events.pipe(takeUntil(this.destroyed$)).subscribe((e) => {
      if (e instanceof NavigationEnd && this.startScrollOnTop) {
        this.scrollable.scrollTo({ top: 0 });
      }
    });
  }

  private manageMobileView() {
    if (this.mobileViewSubject.getValue()) {
      this.mode = SidenavMode.Over;
    }
  }

  private updateDisplay() {
    this.renderer.removeStyle(this.body.nativeElement, 'width');
    this.renderer.removeStyle(this.body.nativeElement, 'margin');
    this.renderer.removeStyle(this.body.nativeElement, 'margin-top');
    this.renderer.removeStyle(this.body.nativeElement, 'margin-bottom');
    this.renderer.removeStyle(this.body.nativeElement, 'page-layout-background');
    this.renderer.removeStyle(this.body.nativeElement, 'mat-elevation-z3');
    this.renderer.removeStyle(this.wrapper.nativeElement, 'page-layout-mobile-container');

    if (this.isMobileView) {
      this.renderer.addClass(this.wrapper.nativeElement, 'page-layout-mobile-container');
      this.renderer.setStyle(this.body.nativeElement, 'margin-top', '10px');
      this.renderer.setStyle(this.body.nativeElement, 'margin-bottom', '10px');
    } else {
      this.renderer.setStyle(this.body.nativeElement, 'margin', 'auto');
      this.renderer.setStyle(this.body.nativeElement, 'margin-top', '30px');
      this.renderer.setStyle(this.body.nativeElement, 'margin-bottom', '30px');
    }
  }

  private manageSidenavMode(mode: SidenavModeType) {
    this.navModeSubject.next(mode as string);
  }

  private static stopEventPropagation(event: Event, origin: string) {
    if (!event) {
      throw new SyntaxError(`Erreur: la fonction ${ origin } attends un paramètre de type Event, utiliser (click)=sidenav.${ origin }($event)`);
    }
    event.stopPropagation();
    return false;
  }
}
