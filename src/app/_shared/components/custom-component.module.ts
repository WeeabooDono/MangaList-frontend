import { NgModule } from '@angular/core';
import { SnackbarModule } from '@shared/components/snackbar/snackbar.module';
import { CardsModule } from '@shared/components/cards/cards.module';
import { LanguageItemModule } from '@shared/components/language-item/language-item.module';
import { PaginationModule } from '@shared/components/pagination/pagination.module';
import { SearchModule } from '@shared/components/search/search.module';

@NgModule({
  imports: [
    SnackbarModule.forRoot(),
    CardsModule,
    LanguageItemModule,
    PaginationModule,
    SearchModule,
  ],
  exports: [
    SnackbarModule,
    CardsModule,
    LanguageItemModule,
    PaginationModule,
    SearchModule,
  ],
})
export class CustomComponentModule {
}
