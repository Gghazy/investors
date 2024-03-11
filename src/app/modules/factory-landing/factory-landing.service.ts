import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FactoryStatus } from './models/factory-status.model';

@Injectable({
  providedIn: 'root'
})
export class FactoryLandingService {

  constructor(private http:HttpClient) { }

  getScreenStatus(factoryId:number,periodId:number): Observable<any> {
    return this.http.get<any>(`ScreenStatuses?factoryId=${factoryId}&&periodId=${periodId}`);

  }

  create(data: FactoryStatus): Observable<any> {
    return this.http.post<any>('FactoryUpdateStatuses', data);
  }
  getOne(factoryId:number,periodId:number): Observable<any> {
    return this.http.get<any>(`FactoryUpdateStatuses?factoryId=${factoryId}&&periodId=${periodId}`);
  }

  update(data: FactoryStatus): Observable<any> {
    return this.http.put<any>('FactoryUpdateStatuses', data);
  }
  
}
