import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { selectDecodedAccessToken } from '@root/app/core/modules/jwt-state/store/jwt-state.selectors';
import { RoleEnum } from '@root/app/shared/models/role.enum';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent {
  jwt$ = this.store$.pipe(select(selectDecodedAccessToken));
  roleEnum = RoleEnum;

  constructor(
    private store$: Store
  ) {
  }
}
