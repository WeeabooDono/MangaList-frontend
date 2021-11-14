import { Route } from '@angular/router';
import { MangasShowComponent } from 'app/mangas/show/mangas-show.component';
import { MangaResolver } from '@core/service/resolvers/manga.resolver';

export const mangasShowRoute: Route = {
  path: ':mangaId/show',
  component: MangasShowComponent,
  data: { browserTitle: { title: 'mangas.show.title', after: true } },
  resolve: { manga: MangaResolver },
}
