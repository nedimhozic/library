import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthCookieService } from '../shared/services/auth-cookie.service';

import { UserModel } from './user.model';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.appUrl + 'user/';

  constructor(private http: HttpClient, private authCookie: AuthCookieService, private router: Router) { }

  registerUser(user: UserModel) {
    return this.http.post(this.baseUrl + 'register', user);
  }

  confirmUser(token: string) {
    let headers = { 'Registration-Token': token };
    return this.http.get(this.baseUrl + 'signin', { headers });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(this.baseUrl + 'login', { email: email, password: password });
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(this.baseUrl + 'forgot-password', { email: email });
  }

  resetPassword(token: string, password: string): Observable<any> {
    let headers = { 'Registration-Token': token };
    return this.http.post(this.baseUrl + 'reset-password', { password: password }, { headers: headers });
  }

  logout(): void {
    let headers = {
      'Access-Token': this.authCookie.getAccess(),
      'Refresh-Token': this.authCookie.getRefresh()
    };
    this.authCookie.remove();
    this.http.get(this.baseUrl + 'logout', { headers: headers });
    this.router.navigate(['/user/login']);
  }
}
