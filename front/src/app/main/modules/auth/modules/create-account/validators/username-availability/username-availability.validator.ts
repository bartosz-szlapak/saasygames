import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import {
  UsernameAvailabilityService
} from '@root/app/main/modules/auth/modules/create-account/validators/username-availability/username-availability.service';

@Injectable({providedIn: 'root'})
export class UsernameAvailabilityValidator implements AsyncValidator {
  constructor(
    private readonly usernameAvailabilityService: UsernameAvailabilityService
  ) {
  }

  validate(
    ctrl: AbstractControl
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    return this.usernameAvailabilityService.getUsernameAvailability(ctrl.value).pipe(
      map(response => (response.isAvailable ? null : {userNameNotAvailable: true})),
      tap(() => ctrl.markAsTouched())
    );
  }
}
