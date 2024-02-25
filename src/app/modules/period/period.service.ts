import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PeriodSearch } from './models/period-search';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PeriodService {

  constructor(private http:HttpClient) { }

  getAll(search: PeriodSearch): Observable<any> {
    return this.http.post<any>('Periods', search);
  }
  getOne(id:number): Observable<any> {
    return this.http.get<any>('Periods/'+id);
  }
}
