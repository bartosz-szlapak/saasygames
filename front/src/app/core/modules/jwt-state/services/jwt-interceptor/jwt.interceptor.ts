import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, concatMap, switchMap, take } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Observable, of, Subject, throwError } from 'rxjs';
import { JwtService } from '../jwt.service';
import { logOut, updateAccessToken } from '../../store/jwt-state.actions';
import { JwtStorageService } from '@root/app/core/modules/jwt-state/services/jwt-storage.service';
import { environment } from '@root/environments/environment';
import { Router } from '@angular/router';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  private reauthorize$?: Subject<string>;

  constructor(
    private readonly authService: JwtService,
    private readonly store$: Store,
    private readonly jwtService: JwtStorageService,
    private readonly router: Router
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const excludedUrl = `${ environment.apiUrl }/auth`;
    if (!req.url.includes(environment.apiUrl)
      || req.url.includes(excludedUrl)) {
      return next.handle(req);
    }


    return of(this.jwtService.getAccessToken()).pipe(
      switchMap(accessToken => of(this.setAuthorizationHeaders(req, accessToken))),
      switchMap(request => {
        return next.handle(request)
          .pipe(
            catchError(error => {
              if (error.status === 401) {
                return this.handleUnauthorizedStatus(req, next);
              }
              return throwError(error || 'Server error');
            }),
          );
      }),
    );
  }

  setAuthorizationHeaders(req: HttpRequest<any>, token: string): HttpRequest<any> {
    if (token) {
      return req.clone({
        headers: req.headers.set('Authorization', `Bearer ${ token }`),
      });
    }

    return req.clone();
  }

  handleUnauthorizedStatus(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.reauthorize$) {
      this.reauthorize$ = new Subject<string>();
      const refreshToken = this.jwtService.getRefreshToken();

      if (!refreshToken) {
        of(null).subscribe(() => {
          this.reauthorize$.complete();
          this.reauthorize$ = undefined;
          this.store$.dispatch(logOut());
          this.redirectToMainPage();
        });
      } else {
        this.authService.refreshToken(refreshToken)
          .subscribe(refreshTokenResponse => {
              this.store$.dispatch(updateAccessToken({accessToken: refreshTokenResponse.accessToken}));
              this.reauthorize$.next(refreshTokenResponse.accessToken);
              this.reauthorize$.complete();
              this.reauthorize$ = undefined;
            },
            () => {
              this.reauthorize$.complete();
              this.reauthorize$ = undefined;
              this.store$.dispatch(logOut());
              this.redirectToMainPage();
            });
      }

    }

    return this.reauthorize$.pipe(
      take(1),
      concatMap(accessToken => {
        return next.handle(this.setAuthorizationHeaders(req, accessToken));
      }),
      catchError(error => {
        return throwError(error || 'Server error');
      }),
    );
  }

  private redirectToMainPage(): void {
    this.router.navigateByUrl('/');
  }
}
