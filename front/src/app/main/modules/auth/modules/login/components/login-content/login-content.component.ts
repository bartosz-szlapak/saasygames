import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { loginByCredentials } from '@root/app/main/modules/auth/modules/login/store/login.actions';
import { FormValues } from '@root/app/main/modules/auth/modules/login/models/form-values';
import { RETURN_URL_PARAM_NAME } from '@root/app/shared/url/return-url';

@Component({
  selector: 'app-login-content',
  templateUrl: './login-content.component.html',
  styleUrls: ['./login-content.component.scss']
})
export class LoginContentComponent {
  returnUrl = this.activatedRoute.snapshot.queryParams[RETURN_URL_PARAM_NAME];
  @Input() isLoading: boolean;

  constructor(
    private readonly store$: Store,
    public readonly activatedRoute: ActivatedRoute,
  ) {
  }

  onSubmit(formValues: FormValues): void {
    const payload = {
      ...formValues,
      returnUrl: this.returnUrl,
    };
    this.store$.dispatch(loginByCredentials({payload}));
  }
}
