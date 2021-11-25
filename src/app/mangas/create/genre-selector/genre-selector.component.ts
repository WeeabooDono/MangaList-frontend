import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { debounceTime, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Genre } from '@shared/models/genre.model';
import { Destroyed } from '@core/hooks/destroyed';
import { cache } from '@shared/utils/operators';
import { GenreService } from '@core/service/genre.service';
import { GenreUtils } from 'app/mangas/create/genre-selector/genre.utils';

@Component({
  selector: 'genre-selector',
  templateUrl: './genre-selector.component.html',
  styleUrls: ['./genre-selector.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenreSelectorComponent extends Destroyed {
  @HostBinding('class.genre-selector') isGenreSelector: boolean;

  public searchedNameCtrl: FormControl = new FormControl(null);
  private searchName$: Observable<string> = new Observable<string>();

  public filteredGenres$: Observable<Genre[]> = new Observable<Genre[]>();
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  @Input()
  public genres: Genre[] = [];

  @Output()
  public genresChange = new EventEmitter<Genre[]>();

  public removable: boolean = true;

  constructor(private genreService: GenreService) {
    super();
    this.isGenreSelector = true;

    this.searchName$ = this.searchedNameCtrl.valueChanges.pipe(debounceTime(500), takeUntil(this.destroyed$));
    this.filteredGenres$ = this.searchName$.pipe(
      startWith(''),
      tap(() => this.loading$.next(true)),
      switchMap(name => this.genreService.searchGenreByName({ name })),
      // TODO: supprimer les valeurs déjà ajoutées
      tap(() => this.loading$.next(false)),
      cache());
  }

  public displayGenreName(genre: Genre) {
    return genre ? genre.name : '';
  }

  public add(genre: Genre): void {
    // On ne fait rien si on a déjà le genre
    if (GenreUtils.findIndex(this.genres, genre) !== -1) {
      return;
    }
    this.genres = [...this.genres, genre];
    this.genresChange.next(this.genres);
  }

  public remove(genre: Genre) {
    // On ne fait rien si on a pas le genre
    if (GenreUtils.findIndex(this.genres, genre) === -1) {
      return;
    }
    this.genres.splice(GenreUtils.findIndex(this.genres, genre), 1);
    this.genres = [...this.genres];
    this.genresChange.next(this.genres);
  }
}
