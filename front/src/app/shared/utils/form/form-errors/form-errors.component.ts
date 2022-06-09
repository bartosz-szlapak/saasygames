import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ValidationMessages } from '@root/app/shared/utils/form/form-errors/validation-messages';

@Component({
  selector: 'app-form-errors',
  templateUrl: './form-errors.component.html',
  styleUrls: ['./form-errors.component.scss'],
})
export class FormErrorsComponent {
  @Input() control: AbstractControl;
  @Input() messages: ValidationMessages;
}
