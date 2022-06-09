import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidationMessages } from '@root/app/shared/utils/form/form-errors/validation-messages';
import { FormUpdater } from '@root/app/shared/utils/form/form-updater.service';
import { MatInput } from '@angular/material/input';
import {
  CreateAccountByCredentialsPayload
} from '@root/app/main/modules/auth/modules/create-account/models/create-account-by-credentials-payload';
import { filter, take } from 'rxjs/operators';
import {
  UsernameAvailabilityValidator
} from '@root/app/main/modules/auth/modules/create-account/validators/username-availability/username-availability.validator';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit, OnChanges {
  @ViewChild('userNameMatInput', {read: MatInput}) userNameMatInput: MatInput;
  @Input() disabled: boolean;
  @Output() create = new EventEmitter<CreateAccountByCredentialsPayload>();

  formGroup: FormGroup;
  validationMessages: ValidationMessages = {
    required: 'Required',
    userNameNotAvailable: 'User name is not available (Only letters and numbers, min. 4 characters)',
  };

  constructor(
    private readonly formUpdater: FormUpdater,
    private readonly cdr: ChangeDetectorRef,
    private readonly userNameAvailabilityValidator: UsernameAvailabilityValidator,
  ) {
  }

  ngOnChanges(): void {
    if (this.disabled) {
      this.formGroup?.disable();
    } else {
      this.formGroup?.enable();
    }
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      userName: new FormControl('', [
        Validators.required,
      ], this.userNameAvailabilityValidator.validate.bind(this.userNameAvailabilityValidator)),
      password: new FormControl(),
    });
  }

  submit(): void {
    this.formUpdater.updateFromGroup(this.formGroup);
    this.formGroup.statusChanges.pipe(
      filter(status => ['INVALID', 'VALID'].includes(status)),
      take(1)
    ).subscribe(status => {
      if (status === 'INVALID') {
        return;
      }

      this.create.emit(this.formGroup.value);
    });
  }
}
