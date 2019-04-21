import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { AuthCookieService } from '../shared/services/auth-cookie.service';

import { BookModel } from './book.model';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { headersToString } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  headers: any;
  baseUrl = environment.appUrl + 'book/';
  baseReaderUrl = environment.appUrl + 'reader/';

  constructor(private http: HttpClient, private authCookie: AuthCookieService) { }

  private renewHeaders() {
    this.headers = {
      'Access-Token': this.authCookie.getAccess(),
      'Refresh-Token': this.authCookie.getRefresh()
    }
  }

  getBook(id: String) {
    this.renewHeaders();
    return this.http.get(this.baseUrl + id, { headers: this.headers })
  }

  getAllBooks() {
    this.renewHeaders();
    return this.http.get(this.baseUrl, { headers: this.headers })
  }

  getReadersByBook(bookId: String){
    this.renewHeaders();
    return this.http.get(this.baseReaderUrl + 'book/' + bookId, { headers: this.headers })
  }

  createBook(book: BookModel) {
    this.renewHeaders();
    return this.http.post(this.baseUrl, book, { headers: this.headers });
  }

  editBook(book: BookModel) {
    this.renewHeaders();
    return this.http.put(this.baseUrl + book._id, book, { headers: this.headers });
  }

  deleteBook(id: String){
    this.renewHeaders();
    return this.http.delete(this.baseUrl + id, { headers: this.headers });
  }

  getReaders(){
    this.renewHeaders();
    return this.http.get(this.baseReaderUrl, { headers: this.headers });
  }

  rentBook(readerId: String, bookId: String) {
    this.renewHeaders();
    return this.http.get(this.baseReaderUrl + 'rent/' + readerId + '/' + bookId, { headers: this.headers });
  }

  returnBook(uuid: String, bookId: String) {
    this.renewHeaders();
    return this.http.get(this.baseReaderUrl + 'return/' + uuid + '/' + bookId, { headers: this.headers });
  }
}
