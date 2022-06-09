import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { logOut } from '@root/app/core/modules/jwt-state/store/jwt-state.actions';
import { init } from '@root/app/main/modules/auth/modules/login/store/login.actions';
import { selectLoginByCredentialsLoading } from '@root/app/main/modules/auth/modules/login/store/login.selectors';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  isLoading$ = this.store$.pipe(select(selectLoginByCredentialsLoading));

  constructor(
    private readonly store$: Store,
  ) {
  }

  ngOnInit(): void {
    this.store$.dispatch(logOut());
    this.store$.dispatch(init());
  }
}
