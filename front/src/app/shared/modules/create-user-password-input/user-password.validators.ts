import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function lowercase(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value == null || control.value.length === 0) {
      return null;
    }

    const regex = new RegExp('[a-z]');
    if (regex.test(control.value)) {
      return null;
    }

    return {lowercase: true};
  };
}

export function uppercase(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value == null || control.value.length === 0) {
      return null;
    }

    const regex = new RegExp('[A-Z]');
    if (regex.test(control.value)) {
      return null;
    }

    return {uppercase: true};
  };
}

export function digit(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value == null || control.value.length === 0) {
      return null;
    }

    const regex = new RegExp('[0-9]');
    if (regex.test(control.value)) {
      return null;
    }

    return {digit: true};
  };
}
