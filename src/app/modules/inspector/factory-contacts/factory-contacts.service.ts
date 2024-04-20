import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FactoryContactModel } from '../../factory-contacts/models/factory-contact-model';

@Injectable({
  providedIn: 'root'
})
export class FactoryContactsService {

  constructor(private http: HttpClient) { }
  
  create(model: FactoryContactModel): Observable<any> {
    return this.http.post<any>('x', model);
  }
}
