import { NgModule } from '@angular/core';
import { MangaCardModule } from '@shared/components/cards/manga-card/manga-card.module';

@NgModule({
  imports: [MangaCardModule],
  exports: [MangaCardModule],
})
export class CardsModule {
}
