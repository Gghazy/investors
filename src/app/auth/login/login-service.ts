import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginModel } from './models/login.model';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  Externallogin(): Observable<any> {
    return this.http.get<any>(`Sso/loginbynafathData`);

  }
}
