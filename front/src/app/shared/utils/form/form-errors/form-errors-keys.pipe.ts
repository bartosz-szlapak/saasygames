import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'formErrorsKeys',
})
export class FormErrorsKeysPipe implements PipeTransform {

  transform(value: ValidationErrors): string[] {
    if (!value) {
      return [];
    }

    return Object.keys(value);
  }
}
