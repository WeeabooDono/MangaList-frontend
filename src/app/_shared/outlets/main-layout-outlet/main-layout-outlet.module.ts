import { NgModule } from '@angular/core';
import { MainLayoutOutletComponent } from './main-layout-outlet.component';
import { RouterModule } from '@angular/router';
import { LayoutsModule } from '@shared/layouts/layouts.module';

@NgModule({
  declarations: [MainLayoutOutletComponent],
  exports: [MainLayoutOutletComponent],
  imports: [
    RouterModule,
    LayoutsModule,
  ],
})
export class MainLayoutOutletModule {
}
