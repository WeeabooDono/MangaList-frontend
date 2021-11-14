import { NgModule } from '@angular/core';
import { MainLayoutOutletModule } from './main-layout-outlet/main-layout-outlet.module';
import { SimpleOutletModule } from '@shared/outlets/simple-outlet/simple-outlet.module';

@NgModule({
  exports: [MainLayoutOutletModule, SimpleOutletModule],
})
export class OutletsModule {
}
