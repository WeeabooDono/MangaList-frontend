import { ChangeDetectionStrategy, Component, HostBinding, Inject, ViewEncapsulation } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackbarData } from '@shared/components/snackbar/snackbar.model';

@Component({
  selector: 'app-snackbar',
  templateUrl: 'snackbar.component.html',
  styleUrls: ['snackbar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnackbarComponent {
  @HostBinding('class.app-snackbar')
  private isSnackbar: boolean;

  public data: SnackbarData;

  constructor(
    public snackBarRef: MatSnackBarRef<SnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) data: SnackbarData) {
    this.isSnackbar = true;
    this.data = data;
  }

  public action(): void {
    this.snackBarRef.dismissWithAction();
  }

  public close(): void {
    this.snackBarRef.dismiss();
  }

  get hasAction(): boolean {
    return !!this.data.action;
  }

  get hasActionOrCloseable(): boolean {
    return !!this.data.action || this.data.closeable;
  }
}
