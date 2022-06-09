import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {

  private defaultDuration = 5000;

  constructor(
    private readonly snackBar: MatSnackBar,
  ) {
  }

  error(message: string): void {
    this.snackBar.open(message, null, {duration: this.defaultDuration});
  }

  success(message: string): void {
    this.snackBar.open(message, null, {duration: this.defaultDuration});
  }

  warning(message: string): void {
    this.snackBar.open(message, null, {duration: this.defaultDuration});
  }
}
