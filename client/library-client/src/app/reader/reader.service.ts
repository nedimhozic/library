import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthCookieService } from '../shared/services/auth-cookie.service';

import { ReaderModel } from './reader.model';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { headersToString } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class ReaderService {
  headers: any;
  baseUrl = environment.appUrl + 'reader/';

  constructor(private http: HttpClient, private authCookie: AuthCookieService) { }

  private renewHeaders() {
    this.headers = {
      'Access-Token': this.authCookie.getAccess(),
      'Refresh-Token': this.authCookie.getRefresh()
    }
  }

  getReader(id: String) {
    this.renewHeaders();
    return this.http.get(this.baseUrl + id, { headers: this.headers })
  }

  getAllReaders() {
    this.renewHeaders();
    return this.http.get(this.baseUrl, { headers: this.headers })
  }

  createReader(reader: ReaderModel) {
    this.renewHeaders();
    return this.http.post(this.baseUrl, reader, { headers: this.headers });
  }

  editReader(reader: ReaderModel) {
    this.renewHeaders();
    return this.http.put(this.baseUrl + reader._id, reader, { headers: this.headers });
  }

  deleteReader(id: String){
    this.renewHeaders();
    return this.http.delete(this.baseUrl + id, { headers: this.headers });
  }

}
