import { Route } from '@angular/router';
import { MangasCreateComponent } from 'app/mangas/create/mangas-create.component';

export const mangasCreateRoute: Route = {
  path: 'create',
  component: MangasCreateComponent,
  data: { browserTitle: { title: 'mangas.create.title', after: true } },
}
