import { Pipe, PipeTransform } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Pipe({
  name: 'getFormGroup',
})
export class GetFormGroupPipe implements PipeTransform {

  transform(formGroup: FormGroup, controlName: string): FormGroup | never {
    const control = formGroup.get(controlName);
    if (!control) {
      throw new Error(`Control with name "${ control }" was not found in form group`);
    }

    if (!(control instanceof FormGroup)) {
      throw new Error(`Control "${ controlName }" is not an instance of FormControl`);
    }

    return control;
  }

}
