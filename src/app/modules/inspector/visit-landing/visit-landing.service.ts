import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InspectorScreenStatusModel } from './models/inspector-screen-status-model.model';

@Injectable({
  providedIn: 'root'
})
export class VisitLandingService {

  constructor(private http:HttpClient) { }

  getScreenStatus(factoryId:number,periodId:number): Observable<any> {
    return this.http.get<any>(`InspectorScreenStatus?factoryId=${factoryId}&&periodId=${periodId}`);

  }


  create(data: InspectorScreenStatusModel): Observable<any> {
    return this.http.post<any>('InspectorUpdateStatus', data);
  }
  getOne(factoryId:number,periodId:number): Observable<any> {
    return this.http.get<any>(`InspectorUpdateStatus?factoryId=${factoryId}&&periodId=${periodId}`);
  }

  update(data: InspectorScreenStatusModel): Observable<any> {
    return this.http.put<any>('InspectorUpdateStatus', data);
  }
}
