import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";

import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    private toastr: ToastrService,
    private readonly router: Router,
    private readonly spinner: NgxSpinnerService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinner.show();
    return next.handle(request).pipe(
      tap(
        (event) => {
          if (event instanceof HttpResponse) {
            this.spinner.hide();
          }
        },
        (error: HttpErrorResponse) => {
          let errorMsg = '';
          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message}`;
            this.toastr.error(errorMsg);
          } else {
            if (error.status === 401) {
              this.toastr.error('TOKEN IS EXPIRED , LOGIN AGAIN !');
              localStorage.clear();
              sessionStorage.clear();
              this.router.navigate(['./auth/login']);
              this.spinner.hide();
              return throwError('token expired !');
            }
            if (error.status === 400) {
              (Object.keys(error.error.errors) as (keyof typeof error.error.errors)[]).forEach((key, index) => {

                errorMsg += error.error.errors[key] +"\n";
                console.log(key, error.error.errors[key], index);
              });

              this.toastr.error(errorMsg)
              console.log(error)
              this.spinner.hide();
              return throwError(errorMsg);
            }
            if (error.status === 500) {
              this.toastr.error('SERVER ERROR !, try later thank you :)');
              this.spinner.hide();
              return throwError(errorMsg);
            }
            if (error.status === 0) {
              this.toastr.error('SERVER ERROR !, try later thank you :)');
              this.spinner.hide();
              return throwError(errorMsg);
            }

            if (error.status === 800) {


              this.toastr.error(error.error.Errors[0]);
              this.spinner.hide();
              return throwError(errorMsg);
            }
          }
          this.spinner.hide();
          return throwError(errorMsg);
        }
      )
    );
  }
}
