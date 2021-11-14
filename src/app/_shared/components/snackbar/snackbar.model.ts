import { InjectionToken } from '@angular/core';
import { MatSnackBarConfig } from '@angular/material/snack-bar';

export const SNACKBAR_DEFAULT_OPTIONS = new InjectionToken<SnackbarConfig>('snackbar-default-options');

export enum SnackbarType {
  Default = 'Default',
  Error = 'Error',
  Success = 'Success'
}

export interface SnackbarStyle {
  type: SnackbarType;
  style: string;
}

export const snackbarStyles: SnackbarStyle[] = [
  {
    type: SnackbarType.Default,
    style: 'app-snackbar-default',
  },
  {
    type: SnackbarType.Error,
    style: 'app-snackbar-error',
  },
  {
    type: SnackbarType.Success,
    style: 'app-snackbar-success',
  },
];

export interface SnackbarData {
  message: string;
  action: string;
  closeable: boolean;
}

export class SnackbarConfig extends MatSnackBarConfig {
  closeable?: boolean;
}
