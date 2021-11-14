import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { Manga } from '@shared/models/manga.model';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { DomainService } from '@core/service/domain/domain.service';
import { GenreService } from '@core/service/genre.service';
import { Genre } from '@shared/models/genre.model';
import { NavigationDomainRouter } from '@shared/navigation/navigation-domain-router';

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

  constructor(protected route: ActivatedRoute, protected router: Router, protected domainService: DomainService, private genreService: GenreService) {
    super(router, route, domainService);
    this.isMangasShow = true;
    this.manga$ = this.route.data.pipe(map(data => data.manga));
    this.genres$ = this.manga$.pipe(switchMap(manga => this.genreService.getGenresFromManga(manga)));
  }

  public navigateToEdit(): void {
    this.manga$.subscribe(manga => this.navigateToDomain(['/mangas', String(manga.id), 'edit']))
  }
}
