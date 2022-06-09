import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { combineLatest, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import {
  selectDecodedAccessToken,
  selectIsAuthenticated,
  selectIsAuthenticationFinished
} from '@root/app/core/modules/jwt-state/store/jwt-state.selectors';
import { map, skipWhile, tap } from 'rxjs/operators';
import { RoleEnum } from '@root/app/shared/models/role.enum';

@Injectable({
  providedIn: 'root',
})
export class IsAdminGuard implements CanActivate {
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
      this.store.pipe(select(selectDecodedAccessToken)),
    ]).pipe(
      skipWhile(([isAuthenticated, isTokenRestored, token]) => !isTokenRestored),
      map(([isAuthenticated, isTokenRestored, token]) => {
        return token.roleId === RoleEnum.administrator;
      }),
      tap((canAccess) => {
        if (!canAccess) {
          this.router.navigateByUrl('/');
        }
      })
    );
  }
}
