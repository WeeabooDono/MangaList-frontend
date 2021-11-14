import { NgModule } from '@angular/core';
import { AngularMaterialModule } from '@shared/angular-material.module';
import { MangaCardComponent } from '@shared/components/cards/manga-card/manga-card.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GenreChipComponent } from '@shared/components/cards/manga-card/genre-chip/genre-chip.component';

@NgModule({
  imports: [AngularMaterialModule, CommonModule, RouterModule],
  declarations: [MangaCardComponent, GenreChipComponent],
  exports: [MangaCardComponent, GenreChipComponent],
})
export class MangaCardModule {
}
