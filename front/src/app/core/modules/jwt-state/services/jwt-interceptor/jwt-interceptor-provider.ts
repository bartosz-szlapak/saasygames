import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './jwt.interceptor';

export const AUTH_INTERCEPTOR_PROVIDER = {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true};
