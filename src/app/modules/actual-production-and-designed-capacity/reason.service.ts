import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReasonModel } from './models/reason-model';

@Injectable({
  providedIn: 'root'
})
export class ReasonService {

  constructor(private http:HttpClient) { }

  getOne(monthId:number): Observable<any> {
    return this.http.get<any>('IncreaseActualProductions/'+monthId);
  }
  create(request: ReasonModel): Observable<any> {
    return this.http.post<any>('IncreaseActualProductions', request);
  }
  update(request: ReasonModel): Observable<any> {
    return this.http.put<any>('IncreaseActualProductions', request);
  }
}
