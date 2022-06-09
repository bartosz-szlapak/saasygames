import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Injectable({providedIn: 'root'})
export class FormControlErrorService {
  addError(errorKey: string, errorValue: any, control: AbstractControl): void {
    const errors = control.errors ? {...control.errors} : {};
    errors[errorKey] = errorValue;
    control.setErrors(errors);
  }

  removeError(errorKey: string, control: AbstractControl): void {
    let errors = {...control.errors};
    delete errors[errorKey];
    if (Object.keys(errors).length === 0) {
      errors = null;
    }

    control.setErrors(errors);
  }
}
