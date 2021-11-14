import { ChangeDetectionStrategy, Component, HostBinding, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Manga } from '@shared/models/manga.model';

class DialogData {
}

@Component({
  selector: 'manga-delete-dialog',
  templateUrl: './manga-delete-dialog.component.html',
  styleUrls: ['./manga-delete-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MangaDeleteDialogComponent {
  @HostBinding('class.manga-delete-dialog') isMangaDeleteDialog: boolean;

  public manga: Manga;

  constructor(public dialogRef: MatDialogRef<MangaDeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
    this.isMangaDeleteDialog = true;
    this.manga = data as Manga;
  }

  public onCancel(): void {
    this.dialogRef.close();
  }
}
