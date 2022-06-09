import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { requestJwtRestoration } from '@root/app/core/modules/jwt-state/store/jwt-state.actions';

@Injectable({
  providedIn: 'root',
})
export class RestoreGuard implements CanActivate {
  constructor(
    private readonly store: Store,
  ) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): boolean {
    this.store.dispatch(requestJwtRestoration());

    return true;
  }
}
