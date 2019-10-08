import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpHandler, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

declare const $: any;

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    /* intercept requests and handle server errors */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            retry(1),
            catchError((error: HttpErrorResponse) => {
                if (error.error.message === 'Failed to authenticate token') {
                    $('.modal').modal('hide');
                    this.router.navigate(['/login']);
                    localStorage.clear();
                    return throwError('Session expired. Please login again');
                } else {
                    return throwError(error);
                }
            })
        );
    }
}
