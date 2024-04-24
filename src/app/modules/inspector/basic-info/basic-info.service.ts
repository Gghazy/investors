import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicInfoModel } from './models/basic-info.model';
import { BasicFileModel } from '../../basic-info/models/basic-file-model';

@Injectable({
  providedIn: 'root'
})
export class InspectorBasicInfoService {
  
  constructor(private http: HttpClient) { }
  
  create(model: BasicInfoModel): Observable<any> {
    return this.http.post<any>('InspectBaiscDatas', model);
  }

  CreateFiles(model: BasicFileModel): Observable<any> {
    return this.http.post<any>('InspectFactoryFiles',model);
  }

  getFiles(FactoryId: number,periodId:number): Observable<any> {
    return this.http.get<any>('InspectFactoryFiles?factoryId='+FactoryId+'&periodId='+periodId);
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>('x'+id);
  }
}
