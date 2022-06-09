import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpParamsHelper {

  objectToHttpParams(input: object): HttpParams {
    let params = new HttpParams();
    Object.keys(input).forEach(key => {
      if (input[key] == null) {
        return;
      }

      params = params.append(key, input[key]);
    });

    return params;
  }
}
