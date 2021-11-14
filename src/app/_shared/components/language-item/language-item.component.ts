import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'language-item',
  templateUrl: 'language-item.component.html',
  styleUrls: ['language-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LanguageItemComponent {
  @HostBinding('class.language-item') isLanguageItem: boolean;

  @Input()
  public language!: string;

  constructor() {
    this.isLanguageItem = true;
  }
}
