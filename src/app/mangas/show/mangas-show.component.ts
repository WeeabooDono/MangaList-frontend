import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { Manga } from '@shared/models/manga.model';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { DomainService } from '@core/service/domain/domain.service';
import { GenreService } from '@core/service/genre.service';
import { Genre } from '@shared/models/genre.model';
import { NavigationDomainRouter } from '@shared/navigation/navigation-domain-router';
import { BrowserTitleService } from '@core/service/utils/browser-title.service';

@Component({
  selector: 'app-mangas-show',
  templateUrl: './mangas-show.component.html',
  styleUrls: ['./mangas-show.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MangasShowComponent extends NavigationDomainRouter {
  @HostBinding('class.mangas-create') isMangasShow: boolean;

  public manga$: Observable<Manga>;
  public genres$: Observable<Genre[]> = new Observable<Genre[]>();

  get mangaTitle$(): Observable<string> {
    return this.manga$.pipe(map(manga => manga.title));
  }

  constructor(protected route: ActivatedRoute,
              protected router: Router,
              protected domainService: DomainService,
              private genreService: GenreService,
              private browserTitleService: BrowserTitleService) {
    super(router, route, domainService);
    this.isMangasShow = true;
    this.manga$ = this.route.data.pipe(map(data => data.manga));
    this.genres$ = this.manga$.pipe(switchMap(manga => this.genreService.getGenresFromManga(manga)));
    this.manageBrowserTitle();
  }

  public navigateToEdit(): void {
    this.manga$.subscribe(manga => this.navigateToDomain(['mangas', String(manga.id), 'edit']));
  }

  private manageBrowserTitle(): void {
    this.mangaTitle$.pipe(takeUntil(this.destroyed$))
      .subscribe(title => this.browserTitleService.setCustomTitle({
        key: 'mangas.show.title',
        interpolateParams: { manga: title },
      }));
    this.destroyed$.subscribe(() => this.browserTitleService.setCustomTitle(null));
  }
}
