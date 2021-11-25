import { ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MangaService } from '@core/service/manga.service';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { defaultPage, defaultPageSize, Manga, pageSizeOptions } from '@shared/models/manga.model';
import { PagedListDTO, PagerDTO } from '@shared/models/tools/pagination.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { map, pluck, startWith, switchMap, tap } from 'rxjs/operators';
import { cache } from '@shared/utils/operators';
import { Destroyed } from '@core/hooks/destroyed';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent extends Destroyed implements OnInit {
  @HostBinding('class.home') isHome: boolean;

  @ViewChild('paginator')
  public paginator!: MatPaginator;

  public pageSizeOptions = pageSizeOptions;
  public pager: PagerDTO = {
    page: defaultPage,
    pageSize: defaultPageSize,
  };

  public pagedMangas$ = new Observable<PagedListDTO<Manga>>();
  public mangas$ = new Observable<Manga[]>();

  public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public title$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  private pageChanged$: Subject<void> = new Subject<void>();

  constructor(private mangaService: MangaService) {
    super();
    this.isHome = true;
  }

  public ngOnInit(): void {
    this.pagedMangas$ = combineLatest([
      this.title$,
      this.pageChanged$.asObservable().pipe(startWith(undefined as void)),
    ]).pipe(
      pluck(0),
      tap(() => this.loading$.next(true)),
      switchMap((title) => this.mangaService.searchMangaByTitle({ pager: this.pager, criteria: { title } })),
      tap(() => this.loading$.next(false)),
      cache());

    this.mangas$ = this.pagedMangas$.pipe(map(pagedMangaDTO => pagedMangaDTO.items));
  }

  public pageActions(pageEvent: PageEvent): void {
    this.pager.page = pageEvent.pageIndex;
    this.pager.pageSize = pageEvent.pageSize;
    this.pageChanged$.next();
  }

  public search(title: string): void {
    this.title$.next(title);
  }
}
