import { Route } from '@angular/router';
import { MangasComponent } from 'app/mangas/mangas.component';
import { mangasCreateRoute } from 'app/mangas/create/mangas-create.route';
import { mangasShowRoute } from 'app/mangas/show/mangas-show.route';
import { mangasEditRoute } from 'app/mangas/edit/mangas-edit.route';
import { MainLayoutOutletComponent } from '@shared/outlets/main-layout-outlet/main-layout-outlet.component';

export const mangasRoute: Route = {
  path: 'mangas',
  component: MainLayoutOutletComponent,
  children: [
    {
      path: '',
      component: MangasComponent,
      data: { browserTitle: { title: 'mangas.title', after: true } },
    },
    mangasCreateRoute,
    mangasShowRoute,
    mangasEditRoute,
  ],
};
