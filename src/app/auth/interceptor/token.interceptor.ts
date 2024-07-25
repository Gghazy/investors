import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      if (!this.tokenExpired(token)) 
        {
          alert("token start")
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`
           
            }
          });
        }
        else
        {
          alert("token end")
        }
        
    
    }
    return next.handle(request);
  }
  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
  
}