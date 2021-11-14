import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { MangaService } from '@core/service/manga.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorTranslateModel } from '@shared/models/tools/form.model';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { SnackbarService } from '@shared/components/snackbar/snackbar.service';
import { SnackbarType } from '@shared/components/snackbar/snackbar.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Manga } from '@shared/models/manga.model';
import { GenreService } from '@core/service/genre.service';
import { Genre } from '@shared/models/genre.model';
import { DomainService } from '@core/service/domain/domain.service';
import { NavigationDomainRouter } from '@shared/navigation/navigation-domain-router';

@Component({
  selector: 'app-mangas-create',
  templateUrl: './mangas-create.component.html',
  styleUrls: ['./mangas-create.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MangasCreateComponent extends NavigationDomainRouter {
  @HostBinding('class.mangas-create') isMangasCreate: boolean;

  public form!: FormGroup;

  public manga$: Observable<Manga> = new Observable<Manga>();
  public genres$: Observable<Genre[]> = new Observable<Genre[]>();
  public editionMode$: Observable<boolean> = new Observable<boolean>();

  get titleCtrl(): AbstractControl | null {
    return this.form?.get('title');
  }

  get descriptionCtrl(): AbstractControl | null {
    return this.form?.get('description');
  }

  get authorCtrl(): AbstractControl | null {
    return this.form?.get('author');
  }

  get titleErrorCtrl(): ErrorTranslateModel {
    if (this.titleCtrl?.hasError('required')) {
      return { key: 'mangas.create.form.title.errors.required' };
    } else if (this.titleCtrl?.hasError('minlength')) {
      return { key: 'mangas.create.form.title.errors.min-length', interpolateParams: { minLength: 3 } };
    } else if (this.titleCtrl?.hasError('invalidMangaTitle')) {
      return { key: 'mangas.create.form.title.errors.invalid-manga-title' };
    } else {
      return { key: 'mangas.create.form.title.errors.max-length', interpolateParams: { maxLength: 100 } };
    }
  }

  get descriptionErrorCtrl(): ErrorTranslateModel {
    if (this.descriptionCtrl?.hasError('required')) {
      return { key: 'mangas.create.form.description.errors.required' };
    } else if (this.descriptionCtrl?.hasError('minlength')) {
      return { key: 'mangas.create.description.title.errors.min-length', interpolateParams: { minLength: 3 } };
    } else {
      return { key: 'mangas.create.description.title.errors.max-length', interpolateParams: { maxLength: 255 } };
    }
  }

  get authorErrorCtrl(): ErrorTranslateModel {
    if (this.authorCtrl?.hasError('required')) {
      return { key: 'mangas.create.form.author.errors.required' };
    } else if (this.authorCtrl?.hasError('minlength')) {
      return { key: 'mangas.create.form.author.errors.min-length', interpolateParams: { minLength: 3 } };
    } else {
      return { key: 'mangas.create.form.author.errors.max-length', interpolateParams: { maxLength: 100 } };
    }
  }

  constructor(private mangaService: MangaService,
              private genreService: GenreService,
              protected domainService: DomainService,
              private fb: FormBuilder,
              private snackbarService: SnackbarService,
              protected router: Router,
              protected route: ActivatedRoute) {
    super(router, route, domainService);
    this.isMangasCreate = true;
    this.manga$ = this.route.data.pipe(map(data => data.manga));
    this.editionMode$ = this.manga$.pipe(map(manga => !!manga));
    this.genres$ = this.manga$.pipe(switchMap(manga => {
      if (manga) {
        return this.genreService.getGenresFromManga(manga);
      }
      return [];
    }));
    this.initForm();
  }

  public validate(): void {
    if (this.form.valid) {
      combineLatest([this.manga$, this.editionMode$])
        .subscribe(([manga, editionMode]) => {
          if (editionMode) {
            this.mangaService.edit({ id: manga.id, ...this.form.value }).subscribe();
            //TODO : faire l'édition
          } else {
            this.mangaService.save({ ...this.form.value })
              .subscribe(manga => {
                this.snackbarService.open('mangas.create.form.snackbar.create', { title: manga.title }, SnackbarType.Success, '');
                this.navigateToDomain('mangas');
              });
          }
        });
    }
  }

  // private uniqueMangaTitleValidator(): AsyncValidatorFn {
  //   return (control: AbstractControl): Observable<ValidationErrors | null> => {
  //     return this.mangaService.getMangaByTitle(control.value)
  //       .pipe(map(manga => manga ? null : { invalidMangaTitle: true }));
  //   };
  // }

  private initForm(): void {
    this.form = this.fb.group({
      title: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)] /*[this.uniqueMangaTitleValidator()]*/],
      description: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      author: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      genres: [null, []],
      // image: [null, []],
    });

    combineLatest([this.manga$, this.genres$])
      .subscribe(([manga, genres]) => this.form.patchValue({
        title: manga?.title,
        description: manga?.description,
        author: manga?.author,
        genres,
      }));

    this.form.statusChanges.subscribe();
  }

  public getTitle(): Observable<string> {
    return this.getValue('mangas.edit.title', 'mangas.create.title');
  }

  public getButtonName(): Observable<string> {
    return this.getValue('mangas.edit.form.validate', 'mangas.create.form.validate');
  }

  private getValue(editValue: string, createValue: string): Observable<string> {
    return this.editionMode$.pipe(map(editionMode => editionMode ? editValue : createValue));
  }

  public updateGenres(genres: Genre[]) {
    this.form.patchValue({ genres });
  }
}
