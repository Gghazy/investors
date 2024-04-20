import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicInfoModel } from './models/basic-info.model';

@Injectable({
  providedIn: 'root'
})
export class BasicInfoService {
  
  constructor(private http: HttpClient) { }
  
  create(model: BasicInfoModel): Observable<any> {
    return this.http.post<any>('x', model);
  }


  getFiles(FactoryIdid: number,periodId:number): Observable<any> {
    return this.http.get<any>('x'+FactoryIdid);
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>('x'+id);
  }
}
