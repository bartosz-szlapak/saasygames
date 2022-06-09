import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectIsAuthenticated } from '@root/app/core/modules/jwt-state/store/jwt-state.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  isLogged$ = this.store$.pipe(select(selectIsAuthenticated));

  constructor(
    private readonly store$: Store,
  ) {
  }
}
