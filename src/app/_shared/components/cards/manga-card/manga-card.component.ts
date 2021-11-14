import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { Manga } from '@shared/models/manga.model';
import { DomainService } from '@core/service/domain/domain.service';
import { GenreService } from '@core/service/genre.service';
import { Observable } from 'rxjs';
import { Genre } from '@shared/models/genre.model';
import { cache } from '@shared/utils/operators';
import { NavigationDomainRouter } from '@shared/navigation/navigation-domain-router';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'manga-card',
  templateUrl: 'manga-card.component.html',
  styleUrls: ['manga-card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MangaCardComponent extends NavigationDomainRouter implements AfterViewInit {
  @HostBinding('class.manga-card') isMangaCard: boolean;

  @Input()
  public manga!: Manga;

  public genres$: Observable<Genre[]> = new Observable<Genre[]>();

  constructor(protected router: Router, protected route: ActivatedRoute, protected domainService: DomainService, private genreService: GenreService, private cd: ChangeDetectorRef) {
    super(router, route, domainService);
    this.isMangaCard = true;
  }

  public ngAfterViewInit(): void {
    this.genres$ = this.genreService.getGenresFromManga(this.manga).pipe(cache());
    // The changeDetection has already been triggered by AsyncPipe, with OnPush I'll have to manually trigger it after I subscribe
    this.genres$.subscribe(() => this.cd.markForCheck());
  }

  public getMangaImage(): string {
    // return this.manga?.image ? this.manga?.image : 'assets/img/default/default.jpg';
    return 'assets/img/default/default.jpg';
  }

  public getMangaRoute(): string[] {
    return ['/mangas', String(this.manga.id), 'show'];
  }
}
