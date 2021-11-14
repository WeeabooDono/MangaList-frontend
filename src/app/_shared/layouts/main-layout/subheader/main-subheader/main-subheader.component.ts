import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'main-subheader',
  templateUrl: 'main-subheader.component.html',
  styleUrls: ['main-subheader.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainSubheaderComponent {
  @HostBinding('class.main-subheader') isMainSubheader: boolean;

  constructor() {
    this.isMainSubheader = true;
  }
}
