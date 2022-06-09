import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { logOut } from '@root/app/core/modules/jwt-state/store/jwt-state.actions';
import { init } from '@root/app/main/modules/auth/modules/create-account/store/create-account.actions';

@Component({
  selector: 'app-registration',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
})
export class CreateAccountComponent implements OnInit {

  constructor(
    private readonly store: Store,
  ) {
  }

  ngOnInit(): void {
    this.store.dispatch(logOut());
    this.store.dispatch(init());
  }
}

