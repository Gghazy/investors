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
  

  getOne(id:number,periodId:number,ownerIdentity:string): Observable<any> {
    return this.http.get<any>('InspectBaiscDatas?factoryId='+id+'&periodId='+periodId+'&OwnerIdentity='+ownerIdentity);
 
  }
  create(model: BasicInfoModel): Observable<any> {
    return this.http.post<any>('InspectBaiscDatas', model);
  }

  update(model: BasicInfoModel): Observable<any> {
    return this.http.put<any>('InspectBaiscDatas', model);
  }

//Files

  CreateFiles(model: BasicFileModel): Observable<any> {
    return this.http.post<any>('InspectFactoryFiles',model);
  }

  getFiles(FactoryId: number,periodId:number): Observable<any> {
    return this.http.get<any>('InspectFactoryFiles?factoryId='+FactoryId+'&periodId='+periodId);
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>('InspectFactoryFiles/'+id);
  }
}
