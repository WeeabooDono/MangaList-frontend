import { Directive, Input } from '@angular/core';
import { Destroyed } from '@core/hooks/destroyed';

@Directive()
export abstract class BaseLayout extends Destroyed {
  @Input() public sidenavVisibility: 'visible' | 'hidden' | 'responsive';

  public footerCondensed: boolean;

  protected constructor() {
    super();
    this.sidenavVisibility = 'responsive';
    this.footerCondensed = false;
  }
}
