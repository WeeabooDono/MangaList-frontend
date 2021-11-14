import { ChangeDetectionStrategy, Component, Directive, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Directive({ selector: 'app-page-error-title' })
export class AppPageErrorTitleDirective { }

@Directive({ selector: 'app-page-error-info' })
export class AppPageErrorInfoDirective { }

@Directive({ selector: 'app-page-error-action' })
export class AppPageErrorActionDirective { }

@Component({
  selector       : 'app-page-error',
  templateUrl    : 'page-error.component.html',
  styleUrls      : ['page-error.component.scss'],
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageErrorComponent {
  @HostBinding('class.app-page-error')
  private isPageError: boolean;

  @Input()
  public svgIcon!: string;

  constructor() {
    this.isPageError = true;
  }
}
