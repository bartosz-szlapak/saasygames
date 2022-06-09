import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { requestUser, } from '@root/app/main/modules/user/store/user.actions';
import { selectIsError, selectIsLoading, selectUser, } from '@root/app/main/modules/user/store/user.selectors';

@Component({
  selector: 'app-success',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {

  user$ = this.store.pipe(select(selectUser));
  isError$ = this.store.pipe(select(selectIsError));
  isLoading$ = this.store.pipe(select(selectIsLoading));

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly store: Store,
  ) {
  }

  ngOnInit(): void {
    const userId = this.activatedRoute.snapshot.params.userId;
    this.store.dispatch(requestUser({id: userId}));
  }
}
