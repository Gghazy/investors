import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MonthlyFinancialModel } from './models/monthly-financial-model';

@Injectable({
  providedIn: 'root'
})
export class MonthlyFinancialService {

  constructor(private http:HttpClient) { }

  getOne(id:number,periodId:number): Observable<any> {
    debugger
    return this.http.get<any>(`FactoryMonthlyFinancials?id=${id}&&periodId=${periodId}`);
  }
  create(request: MonthlyFinancialModel): Observable<any> {
    return this.http.post<any>('FactoryMonthlyFinancials', request);
  }
  update(request: MonthlyFinancialModel): Observable<any> {
    return this.http.put<any>('FactoryMonthlyFinancials', request);
  }
}
