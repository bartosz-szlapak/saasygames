import { Injectable } from '@angular/core';
import { LocalStorageService } from '@root/app/shared/services/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class JwtStorageService {

  private readonly accessTokenKey = 'access_token';
  private readonly refreshTokenKey = 'refresh_token';

  constructor(
    private readonly localStorageService: LocalStorageService,
  ) {
  }

  getAccessToken(): string | undefined {
    return this.localStorageService.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | undefined {
    return this.localStorageService.getItem(this.refreshTokenKey);
  }

  saveAccessToken(token: string): void {
    if (token) {
      this.localStorageService.setItem(this.accessTokenKey, token);
    } else {
      this.localStorageService.removeItem(this.accessTokenKey);
    }
  }

  saveRefreshToken(token: string): void {
    if (token) {
      this.localStorageService.setItem(this.refreshTokenKey, token);
    } else {
      this.localStorageService.removeItem(this.refreshTokenKey);
    }
  }

  clear(): void {
    this.localStorageService.removeItem(this.accessTokenKey);
    this.localStorageService.removeItem(this.refreshTokenKey);
  }
}
