import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Manga } from '@shared/models/manga.model';
import { Observable } from 'rxjs';
import { MangaService } from '@core/service/manga.service';

@Injectable({ providedIn: 'root'})
export class MangaResolver implements Resolve<Manga> {

  constructor(private mangaService: MangaService) {
  }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Manga> | Promise<Manga> | Manga {
    return this.mangaService.getManga(Number(route.paramMap.get('mangaId')));
  }
}
