import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from './models/login.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
    private router: Router,
  ) { }

  Externallogin(): Observable<any> {
    return this.http.get<any>(`Sso/loginbynafathData`);

  }
  loginByNafath() : Observable<any> {
           
    var r= this.http.get<any>(`Sso/redirectoUrl1`)
        .pipe(map(result => {
      
          if(result.status){
            localStorage.setItem('user', JSON.stringify(result));
            this.router.navigate(['/pages/factories-list']);

          //  this.userSubject.next(result);
            return true;
        }
            else
            return false
  
        }))
        ;
      
        return r;
  }
}
