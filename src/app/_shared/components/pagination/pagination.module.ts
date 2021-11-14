import { NgModule } from '@angular/core';
import { PaginatorDirective } from '@shared/components/pagination/pagination.directive';

@NgModule({
  declarations: [PaginatorDirective],
  exports: [PaginatorDirective],
})
export class PaginationModule {
}
