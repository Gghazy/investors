import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicInfoModule } from './basic-info.module';
import { FactoryModel } from '../factory/models/factory-model';

@Injectable({
  providedIn: 'root'
})
export class BasicInfoService {

  constructor(private http: HttpClient) { }

  getOne(id:number,periodId:number): Observable<any> {
    return this.http.get<any>(`Factories?factoryId=${id}&&periodId=${periodId}`);

  }
  createBasicInfo(factory: FactoryModel): Observable<any> {
    return this.http.post<any>('Factories', factory);
  }
  update(factory: FactoryModel): Observable<any> {
    return this.http.put<any>('Factories', factory);
  }

  getAll(factoryId:string,periodId:string): Observable<any> {
    return this.http.get<any>(`FactoryFiles?factoryId=${factoryId}&&periodId=${periodId}`);
  }
  create(request: BasicInfoModule): Observable<any> {
    return this.http.post<any>('FactoryFiles', request);
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>('FactoryFiles/' + id);
  }
 
}
