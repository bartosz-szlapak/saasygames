import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { logOut } from '@root/app/core/modules/jwt-state/store/jwt-state.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header-auth',
  templateUrl: './header-auth.component.html',
  styleUrls: ['./header-auth.component.scss'],
})
export class HeaderAuthComponent {
  @Input() isLogged: boolean;

  constructor(
    private readonly store: Store,
    private readonly router: Router,
  ) {
  }

  async logout(): Promise<void> {
    await this.router.navigateByUrl('/');
    this.store.dispatch(logOut());
  }
}
