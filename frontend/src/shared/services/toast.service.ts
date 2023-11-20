import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private _snackbar: MatSnackBar) {}

  /**
   * @description Pops up a snackbar/toast at the bottom of the screen
   * @param message To display
   */
  makeToast(message: string): void {
    this._snackbar.open(message, 'Close', { duration: 5000 });
  }
}
