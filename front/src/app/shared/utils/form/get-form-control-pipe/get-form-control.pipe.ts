import { Pipe, PipeTransform } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Pipe({
  name: 'getFormControl',
})
export class GetFormControlPipe implements PipeTransform {

  transform(formGroup: FormGroup, controlName: string): FormControl | never {
    const control = formGroup.get(controlName);
    if (!control) {
      throw new Error(`Control with name "${ control }" was not found in form group`);
    }

    if (!(control instanceof FormControl)) {
      throw new Error(`Control "${ controlName }" is not an instance of FormControl`);
    }

    return control;
  }

}
