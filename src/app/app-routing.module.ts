import { Route, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainLayoutOutletComponent } from '@shared/outlets/main-layout-outlet/main-layout-outlet.component';
import { HomeComponent } from 'app/home/home.component';
import { MainSubheaderComponent } from '@shared/layouts/main-layout/subheader/main-subheader/main-subheader.component';
import { mangasRoute } from 'app/mangas/mangas.route';
import { DomainExistsGuard } from '@core/service/domain/domain-exists.guard';
import { SimpleOutletComponent } from '@shared/outlets/simple-outlet/simple-outlet.component';
import { DomainRedirectGuard } from '@core/service/domain/domain-redirect.guard';

const domainRoute: Route = {
  path: ':domain',
  component: SimpleOutletComponent,
  canActivate: [DomainExistsGuard],
  children: [
    {
      path: 'home',
      component: MainLayoutOutletComponent,
      children: [
        {
          path: '',
          component: HomeComponent,
          data: { browserTitle: { title: 'home.title', after: true } },
        },
        {
          path: '',
          component: MainSubheaderComponent,
          outlet: 'subheader',
        },
      ],
    },
    mangasRoute,
    {
      path: 'error',
      loadChildren: () => import('@error/page-error.module').then(m => m.PageErrorModule),
    },
    {
      path: '**',
      redirectTo: 'error',
      pathMatch: 'full',
    },
  ],
};

export const ROUTES: Routes = [
  {
    path: '',
    component: SimpleOutletComponent, // Un guard à besoin d'un composant, celui-ci sert de placeholder
    canActivate: [DomainRedirectGuard],
    pathMatch: 'full',
  },
  domainRoute,
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES, { enableTracing: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
