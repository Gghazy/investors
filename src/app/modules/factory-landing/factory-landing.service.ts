import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FactoryLandingService {

  constructor(private http:HttpClient) { }

  getScreenStatus(factoryId:number,periodId:number): Observable<any> {
    return this.http.get<any>(`ScreenStatuses?factoryId=${factoryId}&&periodId=${periodId}`);

  }
}
