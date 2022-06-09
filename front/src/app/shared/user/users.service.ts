import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '@root/app/shared/models/user';
import { PageableResponse } from '@root/app/shared/models/pageable-response';
import { GetUsersPayload } from '@root/app/shared/user/get-users.payload';
import { HttpParamsHelper } from '@root/app/shared/utils/http-params-helper.service';
import { environment } from '@root/environments/environment';
import { UpdateUserPayload } from '@root/app/shared/user/update-user.payload';

@Injectable({providedIn: 'root'})
export class UsersService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly httpParamsHelper: HttpParamsHelper,
  ) {
  }

  getUsers(payload: GetUsersPayload): Observable<PageableResponse<User>> {
    const url = `${ environment.apiUrl }/users`;
    const params = this.httpParamsHelper.objectToHttpParams(payload);

    return this.httpClient.get<PageableResponse<User>>(url, {params});
  }

  getUser(userId: number): Observable<User> {
    const url = `${ environment.apiUrl }/users/${ userId }`;

    return this.httpClient.get<User>(url);
  }

  update(userId: number, payload: UpdateUserPayload): Observable<User> {
    const url = `${ environment.apiUrl }/users/${ userId }`;

    return this.httpClient.put<User>(url, payload);
  }
}
