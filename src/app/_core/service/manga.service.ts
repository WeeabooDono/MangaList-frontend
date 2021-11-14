import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Manga, MangaDTO } from '@shared/models/manga.model';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '@env';
import { cache } from '@shared/utils/operators';
import { map, switchMap } from 'rxjs/operators';
import { PagedListDTO, PagedSearchDTO, PagerDTO } from '@shared/models/tools/pagination.model';
import { MangaCriteriaDTO } from '@shared/models/tools/criteria.model';

@Injectable({ providedIn: 'root' })
export class MangaService {

  public mangaEndpoint = Location.joinWithSlash(environment.backendEndpoint + environment.apiVersion, 'mangas');

  constructor(private http: HttpClient) {
  }

  /** Retrieve paged Mangas
   *
   * @pager: PagedDTO
   */
  public getMangas(pager: PagerDTO): Observable<PagedListDTO<Manga>> {
    return this.http.get<PagedListDTO<Manga>>(this.mangaEndpoint, { params: { ...pager } }).pipe(cache());
  }

  /** Save a Manga
   *
   * @manga: MangaDto
   */
  public save(manga: MangaDTO): Observable<Manga> {
    return this.http.post<void>(this.mangaEndpoint, { ...manga }, { observe: 'response' })
      .pipe(switchMap(response => {
        if (response.headers.has('Location')) {
          return this.http.get<Manga>(response.headers.get('Location')!);
        } else {
          return throwError('Unable to retrieve created id');
        }
      }));
  }

  /** Edit a Manga
   *
   * @manga: Manga
   */
  public edit(manga: Manga): Observable<void> {
    const { id, ...dto } = manga;
    return this.http.put<void>(`${ this.mangaEndpoint }/${ manga.id }`, { ...dto });
  }

  /** Find a Manga
   *
   * @id: number
   */
  public getManga(id: number): Observable<Manga> {
    return this.http.get<Manga>(`${ this.mangaEndpoint }/${ id }`);
  }

  /** Search a Manga by its name
   *
   * @criteria: MangaCriteriaDTO
   */
  public searchMangaByTitle(pagedSearchDTO: PagedSearchDTO<MangaCriteriaDTO>): Observable<PagedListDTO<Manga>> {
    return this.http.get<PagedListDTO<Manga>>(`${ this.mangaEndpoint }/search`, {
      params: {
        'pager.page': pagedSearchDTO.pager.page,
        'pager.pageSize': pagedSearchDTO.pager.pageSize,
        'criteria.title': pagedSearchDTO.criteria.title,
      },
    });
  }

  public deleteManga(manga: Manga): Observable<void> {
    return this.http.delete(`${ this.mangaEndpoint }/${ manga.id }`)
      .pipe(map(() => void 0)); // To make sure we don't expect anything
  }
}
