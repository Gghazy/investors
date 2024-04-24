import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FactoryContactsModel } from '../factory-contacts/models/factory-contacts.model';

@Injectable({
  providedIn: 'root'
})
export class InspectorFactoryContactsService {

  constructor(private http: HttpClient) { }
  
  create(model: FactoryContactsModel): Observable<any> {
    return this.http.post<any>('InspectFactoryContact', model);
  }
}
