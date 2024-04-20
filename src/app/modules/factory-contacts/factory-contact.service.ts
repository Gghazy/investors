import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FactoryContactModel } from './models/factory-contact-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FactoryContactService {

  constructor(private http: HttpClient) { }

  getOne(id: number,periodId:number): Observable<any> {
    return this.http.get<any>(`FactoryContacts?factoryId=${id}&periodId=${periodId}`);
  }
  create(request: FactoryContactModel): Observable<any> {
    return this.http.post<any>('FactoryContacts', request);
  }
  update(request: FactoryContactModel): Observable<any> {
    return this.http.put<any>('FactoryContacts', request);
  }
}
