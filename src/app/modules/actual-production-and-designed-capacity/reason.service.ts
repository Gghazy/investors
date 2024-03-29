import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReasonModel } from './models/reason-model';
import { ActualProductionFileModel } from './models/actual-production-file-model';

@Injectable({
  providedIn: 'root'
})
export class ReasonService {

  constructor(private http:HttpClient) { }

  getOne(periodId:number,factoryId:number): Observable<any> {
    return this.http.get<any>(`IncreaseActualProductions?periodId=${periodId}&&factoryId=${factoryId}`);
  }
  create(request: ReasonModel): Observable<any> {
    return this.http.post<any>('IncreaseActualProductions', request);
  }
  update(request: ReasonModel): Observable<any> {
    return this.http.put<any>('IncreaseActualProductions', request);
  }

  getAllFiles(factoryId:number,periodId:number): Observable<any> {
    
    return this.http.get<any>(`ActualProductionAttachments?periodId=${periodId}&&factoryId=${factoryId}`);
  }
  createFile(request: ActualProductionFileModel): Observable<any> {
    return this.http.post<any>('ActualProductionAttachments', request);
  }
  deleteFile(id: number): Observable<any> {
    return this.http.delete<any>('ActualProductionAttachments/' + id);
  }
}
