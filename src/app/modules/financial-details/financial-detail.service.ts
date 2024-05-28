import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FinancialFileModel } from './Models/financial-file-model';
import { Observable } from 'rxjs';
import { FinancialModel } from './Models/financial-model';

@Injectable({
  providedIn: 'root'
})
export class FinancialDetailService {

  constructor(private http: HttpClient) { }

  getAllFiles(factoryId:number,periodId:number): Observable<any> {
    return this.http.get<any>(`FactoryFinancialAttachments?Factoryid=${factoryId}&&PeriodId=${periodId}`);
  }
  createFile(request: FinancialFileModel): Observable<any> {
    return this.http.post<any>('FactoryFinancialAttachments', request);
  }
  deleteFile(id: number): Observable<any> {
    return this.http.delete<any>('FactoryFinancialAttachments/' + id);
  }

  getOne(id:number,year:number): Observable<any> {
    
    return this.http.get<any>(`FactoryFinancials?id=${id}&&year=${year}`);
  }
  create(request: FinancialModel): Observable<any> {
    return this.http.post<any>('FactoryFinancials', request);
  }
  update(request: FinancialModel): Observable<any> {
    return this.http.put<any>('FactoryFinancials', request);
  }
}
