import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthCookieService {
  accessTokenKey: string = "Library_AccessToken";
  refreshTokenKey: string = "Library_RefreshToken";

  constructor(private cookie: CookieService) { }

  set(accessToken: string, refreshToken: string) {
    this.remove();
    var expiration = new Date();
    expiration.setDate(expiration.getDate() + 1);
    this.cookie.set(this.accessTokenKey, accessToken, expiration);
    this.cookie.set(this.refreshTokenKey, refreshToken, expiration);
  }

  getAccess(){
    return this.cookie.get(this.accessTokenKey);
  }

  getRefresh(){
    return this.cookie.get(this.refreshTokenKey);
  }

  remove() {
    this.cookie.delete(this.accessTokenKey);
    this.cookie.delete(this.refreshTokenKey);
  }
}
