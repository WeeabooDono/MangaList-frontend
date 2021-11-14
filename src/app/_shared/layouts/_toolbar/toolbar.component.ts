import { ChangeDetectionStrategy, Component, Directive, HostBinding, ViewEncapsulation } from '@angular/core';
import { Destroyed } from '@core/hooks/destroyed';

@Component({
  selector: 'toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent extends Destroyed {
  @HostBinding('class.toolbar') isToolbar: boolean;

  constructor() {
    super();
    this.isToolbar = true;
  }
}

@Directive({
  selector: 'toolbar-left',
})
export class ToolbarLeftDirective {
  @HostBinding('class.toolbar-left') isToolbarLeft: boolean;

  constructor() {
    this.isToolbarLeft = true;
  }
}

@Directive({
  selector: 'toolbar-logo',
})
export class ToolbarLogoDirective {
  @HostBinding('class.toolbar-logo') isToolbarLogo: boolean;

  constructor() {
    this.isToolbarLogo = true;
  }
}

@Directive({
  selector: 'toolbar-nav',
})
export class ToolbarNavDirective {
  @HostBinding('class.toolbar-nav') isToolbarNav: boolean;

  constructor() {
    this.isToolbarNav = true;
  }
}

@Directive({
  selector: 'toolbar-right',
})
export class ToolbarRightDirective {
  @HostBinding('class.toolbar-right') isToolbarRight: boolean;

  constructor() {
    this.isToolbarRight = true;
  }
}
