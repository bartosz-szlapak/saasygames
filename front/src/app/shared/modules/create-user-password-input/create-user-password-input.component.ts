import { Component, Input, OnInit, } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ValidationMessages } from '@root/app/shared/utils/form/form-errors/validation-messages';
import {
  digit,
  lowercase,
  uppercase
} from '@root/app/shared/modules/create-user-password-input/user-password.validators';

@Component({
  selector: 'app-create-user-password-input',
  templateUrl: './create-user-password-input.component.html',
  styleUrls: ['./create-user-password-input.component.scss'],
})
export class CreateUserPasswordInputComponent implements OnInit {
  @Input() label: string;
  @Input() control: FormControl;

  validationMessages: ValidationMessages = {
    required: 'Required',
    minlength: 'Min. length: 8',
    lowercase: 'Min. 1 lowercase',
    uppercase: 'Min. 1 uppercase',
    digit: 'Min. 1 digit',
  };
  passwordVisible = false;

  ngOnInit(): void {
    this.control.setValidators([
      Validators.required,
      Validators.minLength(8),
      lowercase(),
      uppercase(),
      digit()
    ]);
  }
}

