import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { AuthCookieService } from '../services/auth-cookie.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
    constructor(private toastr: ToastrService, private router: Router, private cookie: AuthCookieService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retry(1),
                catchError((error: HttpErrorResponse) => {
                    let errorMessage = '';
                    if (error.error instanceof ErrorEvent) {
                        // client-side error
                        errorMessage = `Error: ${error.error.message}`;
                    } else {
                        // server-side error
                        if (error.status == 500) {
                            this.toastr.error(error.error, 'Error');
                        } else if(error.status == 401) {
                            this.router.navigate(['/user', 'login']);
                        } else {
                            this.toastr.warning(error.error, 'Warning');
                        }
                        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
                    }

                    return throwError(errorMessage);
                }),
                tap(event => {
                   if(event instanceof HttpResponse) {
                     var accessToken = event.headers.get('Access-Token') || event.headers.get('access-token');
                     var refreshToken = event.headers.get('Refresh-Token') || event.headers.get('refresh-token');
                     if(accessToken && refreshToken){
                         this.cookie.set(accessToken, refreshToken);
                     }
                   }
                })
            )
    }
}