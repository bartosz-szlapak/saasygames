import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { DecodedJwt } from '@root/app/shared/utils/jwt/decoded-jwt';


@Injectable({
  providedIn: 'root',
})
export class JwtService {
  decode(token: string): DecodedJwt | undefined {
    try {
      return jwt_decode<DecodedJwt>(token);
    } catch (e) {
      return undefined;
    }
  }
}
