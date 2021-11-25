import { ChangeDetectionStrategy, Component, HostBinding, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MangaService } from '@core/service/manga.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PagedListDTO, PagerDTO } from '@shared/models/tools/pagination.model';
import { defaultPage, Manga } from '@shared/models/manga.model';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { map, pluck, startWith, switchMap, tap } from 'rxjs/operators';
import { cache } from '@shared/utils/operators';
import { Destroyed } from '@core/hooks/destroyed';
import { MatDialog } from '@angular/material/dialog';
import { MangaDeleteDialogComponent } from 'app/mangas/_manga-delete-dialog/manga-delete-dialog.component';
import { SnackbarType } from '@shared/components/snackbar/snackbar.model';
import { SnackbarService } from '@shared/components/snackbar/snackbar.service';

@Component({
  selector: 'app-mangas',
  templateUrl: './mangas.component.html',
  styleUrls: ['./mangas.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MangasComponent extends Destroyed implements OnInit {
  @HostBinding('class.mangas') isMangas: boolean;

  @ViewChild('paginator')
  public paginator!: MatPaginator;

  public displayedColumns: string[] = ['image', 'title', 'author', 'actions'];

  public pageSizeOptions = [20, 50, 100];
  public pager: PagerDTO = {
    page: defaultPage,
    pageSize: 20,
  };

  public pagedMangas$ = new Observable<PagedListDTO<Manga>>();
  public mangas$ = new Observable<Manga[]>();
  public loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public title$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  private pageChanged$: Subject<void> = new Subject<void>();
  private mangaDeleted$: Subject<void> = new Subject<void>();

  constructor(private mangaService: MangaService, private snackbarService: SnackbarService, private dialog: MatDialog) {
    super();
    this.isMangas = true;
  }

  public ngOnInit(): void {
    this.pagedMangas$ = combineLatest([
      this.title$,
      this.pageChanged$.asObservable().pipe(startWith(undefined as void)),
      this.mangaDeleted$.asObservable().pipe(startWith(undefined as void)),
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

  public deleteManga(manga: Manga): void {
    const dialogRef = this.dialog.open(MangaDeleteDialogComponent, {
      width: '250px',
      data: manga,
    });

    dialogRef.afterClosed().subscribe(manga => {
      if (manga) {
        this.mangaService.deleteManga(manga)
          .subscribe(() => {
            this.snackbarService.open('mangas.list.delete.snackbar.content', { title: manga.title }, SnackbarType.Success, '');
            this.mangaDeleted$.next();
          });
      }
    });
  }

  public search(title: string): void {
    this.title$.next(title);
  }
}
