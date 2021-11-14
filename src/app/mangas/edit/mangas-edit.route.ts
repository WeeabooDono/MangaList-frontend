import { Route } from '@angular/router';
import { MangaResolver } from '@core/service/resolvers/manga.resolver';
import { MangasCreateComponent } from 'app/mangas/create/mangas-create.component';

export const mangasEditRoute: Route = {
  path: ':mangaId/edit',
  component: MangasCreateComponent,
  data: { browserTitle: { title: 'mangas.edit.title', after: true } },
  resolve: { manga: MangaResolver },
}
