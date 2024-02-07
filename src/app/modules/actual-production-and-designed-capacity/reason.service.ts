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

  getOne(monthId:number,factoryId:number): Observable<any> {
    return this.http.get<any>(`IncreaseActualProductions?id=${monthId}&&factoryId=${factoryId}`);
  }
  create(request: ReasonModel): Observable<any> {
    return this.http.post<any>('IncreaseActualProductions', request);
  }
  update(request: ReasonModel): Observable<any> {
    return this.http.put<any>('IncreaseActualProductions', request);
  }

  getAllFiles(ActualProductionId:number): Observable<any> {
    return this.http.get<any>('ActualProductionAttachments/'+ActualProductionId);
  }
  createFile(request: ActualProductionFileModel): Observable<any> {
    return this.http.post<any>('ActualProductionAttachments', request);
  }
  deleteFile(id: number): Observable<any> {
    return this.http.delete<any>('ActualProductionAttachments/' + id);
  }
}
