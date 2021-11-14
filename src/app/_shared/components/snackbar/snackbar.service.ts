import { Inject, Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import {
  SNACKBAR_DEFAULT_OPTIONS,
  SnackbarConfig,
  snackbarStyles,
  SnackbarType,
} from '@shared/components/snackbar/snackbar.model';
import { SnackbarComponent } from '@shared/components/snackbar/snackbar.component';

@Injectable({ providedIn: 'root' })
export class SnackbarService {

  constructor(
    private snackbar: MatSnackBar,
    private translate: TranslateService,
    @Inject(SNACKBAR_DEFAULT_OPTIONS) private defaultConfig: SnackbarConfig,
  ) {
  }

  public open(messageKey: string, params?: any, snackbarType: SnackbarType = SnackbarType.Default, action: string = '', config?: SnackbarConfig): MatSnackBarRef<SnackbarComponent> {
    const message = this.translate.instant(messageKey, params);

    let mergePanelClass: string[] = [];

    const mergeConfig = { ...this.defaultConfig, ...config };
    mergeConfig.data = { message, closeable: mergeConfig.closeable, action };

    if (mergeConfig.panelClass) {
      mergePanelClass = typeof mergeConfig.panelClass === 'string' ? [mergeConfig.panelClass] : mergeConfig.panelClass;
    }

    mergePanelClass.push(this.getSnackbarStyle(snackbarType)!.style);
    mergeConfig.panelClass = mergePanelClass;

    return this.snackbar.openFromComponent(SnackbarComponent, mergeConfig);
  }

  private getSnackbarStyle(snackbarType: SnackbarType) {
    if (!snackbarType) {
      snackbarType = SnackbarType.Default;
    }
    return snackbarStyles.find((snackbarStyle) => snackbarStyle.type == snackbarType);
  }
}
