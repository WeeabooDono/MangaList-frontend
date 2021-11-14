import { ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MangaService } from '@core/service/manga.service';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { defaultPage, defaultPageSize, Manga, pageSizeOptions } from '@shared/models/manga.model';
import { PagedListDTO, PagerDTO } from '@shared/models/tools/pagination.model';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { debounceTime, map, pluck, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
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

  public searchedTitleCtrl: FormControl = new FormControl(null);

  public pagedMangas$ = new Observable<PagedListDTO<Manga>>();
  public mangas$ = new Observable<Manga[]>();
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public pageChanged$: Subject<void> = new Subject<void>();

  private searchTitle$: Observable<string> = new Observable<string>();

  constructor(private mangaService: MangaService) {
    super();
    this.isHome = true;
  }

  public ngOnInit(): void {
    this.searchTitle$ = this.searchedTitleCtrl.valueChanges.pipe(debounceTime(500), takeUntil(this.destroyed));

    this.pagedMangas$ = combineLatest([this.searchTitle$.pipe(startWith('')), this.pageChanged$.asObservable()])
      .pipe(
        pluck(0),
        startWith(''),
        tap(() => this.loading$.next(true)),
        switchMap(title => this.mangaService.searchMangaByTitle({ pager: this.pager, criteria: { title } })),
        tap(() => this.loading$.next(false)),
        cache(),
      );

    this.mangas$ = this.pagedMangas$.pipe(map(pagedMangaDTO => pagedMangaDTO.items));
  }

  public pageActions(pageEvent: PageEvent) {
    this.pager.page = pageEvent.pageIndex;
    this.pager.pageSize = pageEvent.pageSize;
    this.pageChanged$.next();
  }
}
