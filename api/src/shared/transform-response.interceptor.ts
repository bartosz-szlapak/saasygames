import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { classToPlain } from 'class-transformer';

@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> | Promise<Observable<any>> {
    const user = context.switchToHttp().getRequest().user;
    return next.handle()
      .pipe(
        map(data => {
          return classToPlain(data, {
            groups: [user?.roleId.toString()],
          });
        }),
      );
  }
}
