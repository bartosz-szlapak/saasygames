import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import {
  selectUsersError,
  selectUsersLoading,
  selectUsersResponse,
} from '@root/app/main/modules/users/store/users.selectors';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-users-body',
  templateUrl: './users-body.component.html',
  styleUrls: ['./users-body.component.scss'],
})
export class UsersBodyComponent {

  usersResponse$ = this.store.pipe(select(selectUsersResponse));
  usersLoading$ = this.store.pipe(select(selectUsersLoading));
  usersError$ = this.store.pipe(select(selectUsersError));

  constructor(
    private readonly store: Store,
    public readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
  ) {
  }

  onPageChange(page: number): void {
    this.router.navigate([], {
      queryParamsHandling: 'merge',
      queryParams: {page},
      relativeTo: this.activatedRoute,
    });
  }
}
