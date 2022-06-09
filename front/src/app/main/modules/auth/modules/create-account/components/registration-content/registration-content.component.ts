import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectIsSaving } from '@root/app/main/modules/auth/modules/create-account/store/create-account.selectors';
import { createAccount } from '@root/app/main/modules/auth/modules/create-account/store/create-account.actions';
import { RETURN_URL_PARAM_NAME } from '@root/app/shared/url/return-url';
import { ActivatedRoute } from '@angular/router';
import {
  CreateAccountByCredentialsPayload
} from '@root/app/main/modules/auth/modules/create-account/models/create-account-by-credentials-payload';

@Component({
  selector: 'app-registration-content',
  templateUrl: './registration-content.component.html',
  styleUrls: ['./registration-content.component.scss'],
})
export class RegistrationContentComponent {
  returnUrl = this.activatedRoute.snapshot.queryParams[RETURN_URL_PARAM_NAME] ?? '/';
  userSaving$ = this.store.pipe(select(selectIsSaving));

  constructor(
    private readonly store: Store,
    private readonly activatedRoute: ActivatedRoute
  ) {
  }

  onUserCreateByCredentials(payload: CreateAccountByCredentialsPayload): void {
    this.store.dispatch(createAccount({
      userData: payload,
      returnUrl: this.returnUrl
    }));
  }
}
