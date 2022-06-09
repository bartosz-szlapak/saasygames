import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import {
  selectIsAuthenticated,
  selectIsAuthenticationFinished
} from '@root/app/core/modules/jwt-state/store/jwt-state.selectors';
import { map, skipWhile, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IsLoggedGuard implements CanActivate {
  constructor(
    private readonly store: Store,
    private readonly router: Router,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return combineLatest([
      this.store.pipe(select(selectIsAuthenticated)),
      this.store.pipe(select(selectIsAuthenticationFinished)),
    ]).pipe(
      skipWhile(([isAuthenticated, isTokenRestored]) => !isTokenRestored),
      tap(([isAuthenticated, isTokenRestored]) => {
        if (!isAuthenticated) {
          this.router.navigateByUrl('/');
        }
      }),
      map(([isAuthenticated, isTokenRestored]) => isAuthenticated)
    );
  }
}
