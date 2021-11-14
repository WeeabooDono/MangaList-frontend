import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { environment } from '@env';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Genre } from '@shared/models/genre.model';
import { Manga } from '@shared/models/manga.model';
import { GenreCriteriaDTO } from '@shared/models/tools/criteria.model';

@Injectable({ providedIn: 'root' })
export class GenreService {

  public genreEndpoint = Location.joinWithSlash(environment.backendEndpoint + environment.apiVersion, 'genres');

  constructor(private http: HttpClient) {
  }

  public getGenres(): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.genreEndpoint);
  }

  public getGenresFromManga(manga: Manga): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.genreEndpoint, { params: { mangaId: manga.id } });
  }

  public searchGenreByName(criteria: GenreCriteriaDTO): Observable<Genre[]> {
    return this.http.get<Genre[]>(this.genreEndpoint, { params: { ...criteria } });
  }
}
