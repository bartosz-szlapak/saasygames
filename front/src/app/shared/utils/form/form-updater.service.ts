import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class FormUpdater {
  updateFromGroup(group: FormGroup): void {
    Object.keys(group.controls).forEach(key => {
      this.updateAbstractControl(group.get(key));
    });
  }

  updateAbstractControl(control: AbstractControl): void {
    if (control instanceof FormControl) {
      control.markAsTouched();
      control.updateValueAndValidity();
      return;
    }

    if (control instanceof FormArray) {
      control.controls.forEach(c => this.updateAbstractControl(c));
      return;
    }

    if (control instanceof FormGroup) {
      this.updateFromGroup(control);
    }
  }
}

