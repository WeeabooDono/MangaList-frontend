import {
  Component,
  Directive,
  Input,
  ViewEncapsulation,
  Renderer2,
  ViewChild,
  ElementRef,
  AfterViewInit,
  OnChanges,
  SimpleChanges,
  OnInit,
  HostListener,
  ChangeDetectionStrategy,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Destroyed } from '@core/hooks/destroyed';
import { PageLayoutComponent } from '@shared/layouts/_page-layout/page-layout.component';
import { SidenavMode, SidenavModeType } from '@shared/layouts/main-layout/subheader/subheader.model';

@Directive({
  selector: 'subheader-unstack',
})
export class SubheaderContentDirective {
}

@Directive({
  selector: 'subheader-stack',
})
export class SubheaderNavbarDirective {
}

@Directive({
  selector: 'subheader-fab',
})
export class SubheaderFabDirective {
}

const linearTransition = 'all 300ms linear 0s';

@Component({
  selector: 'subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubheaderComponent extends Destroyed implements OnChanges, OnInit, AfterViewInit {
  @Input() pageLayout!: PageLayoutComponent;
  @Input() displayWidth!: number;
  @Input() stackHeight!: number;

  @ViewChild('subheader', { static: true }) public subheader!: ElementRef;
  @ViewChild('unstack', { static: true }) public unstack!: ElementRef;
  @ViewChild('stack', { static: true }) private stack!: ElementRef;
  @ViewChild('fab', { static: true }) private fab!: ElementRef;
  @ViewChild('stackContent', { static: true }) private stackContent!: ElementRef;
  @ViewChild('fabContent', { static: true }) private fabContent!: ElementRef;

  public isStacked$: Observable<boolean>;
  // public mobileView$: Observable<boolean>;

  private isMobileView!: boolean;
  private isStackedSubject: BehaviorSubject<boolean>;

  private stickyScroll = 0;

  private navMode: SidenavModeType = SidenavMode.Side;
  private isOpened!: boolean;
  private pageWidth!: number;

  constructor(private renderer: Renderer2, private breakpointObserver: BreakpointObserver) {
    super();
    this.isStackedSubject = new BehaviorSubject<boolean>(false);
    this.isStacked$ = this.isStackedSubject.asObservable();
  }

  @HostListener('window:resize')
  onResize() {
    this.manageWindowResize();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.displayWidth) {
      this.updateDisplay();
    } else if (changes.stackHeight) {
      this.manageStackHeightChange();
    }
  }

  ngOnInit() {
    if (this.pageLayout) {
      this.isOpened = this.pageLayout.isOpened;
      this.navMode = this.pageLayout.mode;
    }

    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(takeUntil(this.destroyed$))
      .subscribe((result) => {
        this.isMobileView = result.matches;
      });
  }

  ngAfterViewInit() {
    this.updateDisplay();
    this.subheaderShadowInit();
    this.manageStackHeightChange();
    this.displayFabSubheader();
    this.pageWidth = this.stack.nativeElement.clientWidth;
    if (this.pageLayout) {
      this.pageLayout.startOpened.pipe(takeUntil(this.destroyed$)).subscribe((result) => {
        this.isOpened = result;
        this.openSideNav(result);
      });

      this.pageLayout.navMode$.pipe(takeUntil(this.destroyed$)).subscribe((mode) => {
        this.navMode = mode as SidenavModeType;
        this.changeMode(mode);
      });
    }
  }

  public stackOnScroll(scroll: number, toolbarHeight: number) {
    if (scroll >= this.stickyScroll && !this.isStackedSubject.getValue()) {
      const nodeList = document.querySelectorAll('.subheader');
      nodeList.forEach((node) => this.renderer.setStyle(node, 'padding-bottom', `${ this.stack.nativeElement.offsetHeight }px`));
      this.stack.nativeElement.classList.add('subheader-sticky');
      this.renderer.setStyle(this.fab.nativeElement, 'position', 'fixed');
      this.subheader.nativeElement.classList.remove('mat-elevation-z3');
      this.renderer.setStyle(this.fab.nativeElement, 'top', `${ toolbarHeight + this.stack.nativeElement.offsetHeight }px`);
      this.renderer.setStyle(this.stack.nativeElement, 'top', `${ toolbarHeight }px`);
      const padding = this.stack.nativeElement.clientWidth - this.pageWidth;
      this.renderer.setStyle(this.stackContent.nativeElement, 'padding-right', `${ padding }px`);
      if (this.isOpened) {
        this.adaptHeaderWidth();
      }
      this.isStackedSubject.next(true);
    } else if (scroll < this.stickyScroll && this.isStackedSubject.getValue()) {
      const nodeList = document.querySelectorAll('.subheader');
      this.subheader.nativeElement.classList.add('mat-elevation-z3');
      nodeList.forEach((node) => this.renderer.removeStyle(node, 'padding-bottom'));
      this.stack.nativeElement.classList.remove('subheader-sticky');
      this.renderer.removeStyle(this.fab.nativeElement, 'position');
      this.renderer.removeStyle(this.fab.nativeElement, 'top');
      this.renderer.removeStyle(this.stack.nativeElement, 'top');
      this.renderer.removeStyle(this.stackContent.nativeElement, 'padding-right');
      if (this.isOpened) {
        this.resetHeaderWidth();
      }
      this.isStackedSubject.next(false);
    }
  }

  private changeMode(mode: string) {
    if (mode === SidenavMode.Over || (this.isStackedSubject.getValue() && mode === SidenavMode.Push)) {
      this.resetHeaderWidth();
    } else if (this.isStackedSubject.getValue() && mode === SidenavMode.Side) {
      this.adaptHeaderWidth();
    }
  }

  private openSideNav(open: boolean) {
    if (open && this.isStackedSubject.getValue() && this.navMode !== SidenavMode.Push && this.navMode !== SidenavMode.Over) {
      this.renderer.setStyle(this.stack.nativeElement, 'transition', linearTransition);
      this.adaptHeaderWidth();
    } else {
      this.resetHeaderWidth();
    }
  }

  private subheaderShadowInit() {
    this.subheader.nativeElement.classList.add('mat-elevation-z3');
  }

  private displayFabSubheader() {
    if (this.fab.nativeElement.offsetHeight) {
      this.renderer.setStyle(this.fab.nativeElement, 'margin-top', '-30px');
    }
  }

  private manageWindowResize() {
    if (this.isStackedSubject.getValue() && this.isOpened && this.navMode === SidenavMode.Side) {
      this.adaptHeaderWidth();
    }
  }

  private updateDisplay(): void {
    if (!this.isMobileView) {
      this.renderer.setStyle(this.unstack.nativeElement, 'max-width', `${ this.displayWidth }px`);
      this.renderer.setStyle(this.stackContent.nativeElement, 'max-width', `${ this.displayWidth }px`);
      this.renderer.setStyle(this.fabContent.nativeElement, 'width', `${ this.displayWidth }px`);
    }
  }

  private manageStackHeightChange(): void {
    this.stickyScroll = this.stackHeight ? this.stackHeight : this.stack.nativeElement.offsetTop;
  }

  private resetHeaderWidth() {
    this.renderer.removeStyle(this.stack.nativeElement, 'transition');
    this.renderer.removeStyle(this.stack.nativeElement, 'width');
    this.renderer.removeStyle(this.fab.nativeElement, 'width');
  }

  private adaptHeaderWidth() {
    const sideNavMargin = parseInt(getComputedStyle(<Element>document.querySelector('.sidemenu-container')).getPropertyValue('width'), 10);
    const headerWidth = window.innerWidth;
    this.renderer.setStyle(this.stack.nativeElement, 'width', `${ headerWidth - sideNavMargin }px`);
    this.renderer.setStyle(this.fab.nativeElement, 'width', `${ headerWidth - sideNavMargin }px`);
  }
}
