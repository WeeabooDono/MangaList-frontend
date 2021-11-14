import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MangasComponent } from 'app/mangas/mangas.component';
import { MangasCreateComponent } from 'app/mangas/create/mangas-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MangasShowComponent } from 'app/mangas/show/mangas-show.component';
import { RouterModule } from '@angular/router';
import { GenreSelectorComponent } from 'app/mangas/create/genre-selector/genre-selector.component';
import { MangaDeleteDialogComponent } from 'app/mangas/_manga-delete-dialog/manga-delete-dialog.component';

@NgModule({
  imports: [SharedModule, ReactiveFormsModule, RouterModule],
  declarations: [MangasComponent, MangasCreateComponent, MangasShowComponent, GenreSelectorComponent, MangaDeleteDialogComponent],
  exports: [MangasComponent, MangasCreateComponent, MangasShowComponent, GenreSelectorComponent, MangaDeleteDialogComponent],
})
export class MangasModule {
}
