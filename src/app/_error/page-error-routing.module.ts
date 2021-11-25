import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ErrorPageNotFoundComponent } from '@error/error-page-not-found/error-page-not-found.component';
import { MainLayoutOutletComponent } from '@shared/outlets/main-layout-outlet/main-layout-outlet.component';
import { ErrorPageForbiddenComponent } from '@error/error-page-forbidden/error-page-forbidden.component';
import { SimpleOutletComponent } from '@shared/outlets/simple-outlet/simple-outlet.component';

const ROUTES: Routes = [
  {
    path: '',
    component: MainLayoutOutletComponent,
    children: [
      {
        path: '',
        component: SimpleOutletComponent,
        children: [
          {
            path: '403',
            component: ErrorPageForbiddenComponent,
            data: { browserTitle: { title: 'error.403.browser-title' } },
          },
          {
            path: '404',
            component: ErrorPageNotFoundComponent,
            data: { browserTitle: { title: 'error.404.browser-title' } },
          },
          {
            path: '',
            redirectTo: '404',
            pathMatch: 'full',
          },
        ],
      },
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule],
})
export class PageErrorRoutingModule {
}
