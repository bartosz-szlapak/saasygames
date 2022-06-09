import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { AppRootComponent } from './core/components/app-root/app-root.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { AppRoutingModule } from './app-routing.module';
import { rootReducers } from './store/store';
import { environment } from '../environments/environment';
import { AUTH_INTERCEPTOR_PROVIDER } from './core/modules/jwt-state/services/jwt-interceptor/jwt-interceptor-provider';
import { RouterState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule } from '@angular/material/snack-bar';
import { JwtStateModule } from '@root/app/core/modules/jwt-state/jwt-state.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import * as Sentry from '@sentry/angular';
import { Router, RouterModule } from '@angular/router';
import { NotFoundModule } from '@root/app/shared/modules/not-found/not-found.module';

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppRootComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    AppRoutingModule,
    StoreModule.forRoot(
      rootReducers,
      {
        runtimeChecks: {
          strictStateImmutability: !environment.production,
          strictActionImmutability: !environment.production,
          strictStateSerializability: !environment.production,
          strictActionWithinNgZone: !environment.production,
          strictActionTypeUniqueness: !environment.production,
        },
      }),
    !environment.production ? StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}) : [],
    EffectsModule.forRoot([]),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    StoreRouterConnectingModule.forRoot({
      routerState: RouterState.Minimal,
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    JwtStateModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    NotFoundModule,
    RouterModule,
  ],
  providers: [
    AUTH_INTERCEPTOR_PROVIDER,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 5000}},
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({
        showDialog: false,
      }),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => {
        //
      },
      deps: [Sentry.TraceService],
      multi: true,
    },
  ],
  bootstrap: [AppRootComponent],
})
export class AppModule {
}
