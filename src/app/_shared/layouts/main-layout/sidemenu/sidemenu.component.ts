import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  HostBinding,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Portal, TemplatePortal } from '@angular/cdk/portal';

@Directive({ selector: 'sidemenu-content' })
export class SidemenuContentDirective {
  @HostBinding('class.sidemenu-content') isContent: boolean;

  constructor() {
    this.isContent = true;
  }
}

@Component({
  selector: 'sidemenu-fab',
  template: '<ng-content select="[mat-fab],fab"></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidemenuFabComponent {
  @HostBinding('class.sidemenu-fab') isFab: boolean;

  constructor() {
    this.isFab = true;
  }
}

@Component({
  selector: 'sidemenu-header',
  template: '<ng-content></ng-content><ng-content select="sidemenu-fab"></ng-content>',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidemenuHeaderComponent {
  @HostBinding('class.sidemenu-header') isHeader: boolean;

  constructor() {
    this.isHeader = true;
  }
}


@Directive({ selector: 'sidemenu-footer' })
export class SidemenuFooterDirective {
  @HostBinding('class.sidemenu-footer') isFooter: boolean;

  constructor() {
    this.isFooter = true;
  }
}

@Component({
  selector: 'sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class SidemenuComponent implements OnInit {
  @HostBinding('class.sidemenu') isSidemenu: boolean;

  @Input() public hasStackedHeader: boolean;
  @Input() public hasStackedFooter: boolean;

  @ViewChild('header', { static: true }) header!: TemplatePortal;
  @ViewChild('content', { static: true }) content!: TemplatePortal;
  @ViewChild('footer', { static: true }) footer!: TemplatePortal;

  public _portalHeader!: Portal<any>;
  public _portalContent!: Portal<any>;
  public _portalFooter!: Portal<any>;

  constructor() {
    this.isSidemenu = true;
    this.hasStackedHeader = true;
    this.hasStackedFooter = true;
  }

  ngOnInit() {
    this._portalHeader = this.header;
    this._portalContent = this.content;
    this._portalFooter = this.footer;
  }
}
