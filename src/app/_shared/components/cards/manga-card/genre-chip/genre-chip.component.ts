import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';
import { Genre } from '@shared/models/genre.model';

@Component({
  selector: 'genre-chip',
  templateUrl: 'genre-chip.component.html',
  styleUrls: ['genre-chip.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenreChipComponent {
  @HostBinding('class.genre-chip') isGenreChip: boolean;

  @Input()
  public genre!: Genre;

  constructor() {
    this.isGenreChip = true;
  }
}
