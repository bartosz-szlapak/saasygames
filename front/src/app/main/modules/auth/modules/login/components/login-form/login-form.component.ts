import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FormValues } from '@root/app/main/modules/auth/modules/login/models/form-values';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit, OnChanges {

  @Input() disabled: boolean;
  @Output() submitted = new EventEmitter<FormValues>();
  formGroup: FormGroup;
  passwordVisible = false;

  ngOnChanges(): void {
    if (this.disabled) {
      this.formGroup?.disable();
    } else {
      this.formGroup?.enable();
    }
  }

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.min(8)]),
    });
  }

  onLogin(): void {
    this.formGroup.markAllAsTouched();
    if (this.formGroup.invalid) {
      return;
    }
    this.submitted.emit(this.formGroup.value);
  }
}
