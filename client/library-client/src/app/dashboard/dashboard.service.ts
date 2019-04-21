import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthCookieService } from '../shared/services/auth-cookie.service';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  headers: any;
  userBaseUrl = environment.appUrl + 'user/';
  readerBaseUrl = environment.appUrl + 'reader/';
  bookBaseUrl = environment.appUrl + 'book/';
  statBaseUrl = environment.appUrl + 'stat/';

  constructor(private http: HttpClient, private authCookie: AuthCookieService, private router: Router) { }

  logoutUser(): void {
    this.renewHeaders();
    this.http.get(this.userBaseUrl + 'logout', { headers: this.headers });
    this.authCookie.remove();
    this.router.navigate(['/user/login']);
  }

  getReaders() {
    this.renewHeaders();
    return this.http.get(this.readerBaseUrl, { headers: this.headers });
  }

  getBooks() {
    this.renewHeaders();
    return this.http.get(this.bookBaseUrl, { headers: this.headers });
  }

  getStatistics() {
    this.renewHeaders();
    return this.http.get(this.statBaseUrl, { headers: this.headers });
  }

  private renewHeaders() {
    this.headers = {
      'Access-Token': this.authCookie.getAccess(),
      'Refresh-Token': this.authCookie.getRefresh()
    }
  }
}
