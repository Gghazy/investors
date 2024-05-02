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

  update(model: FactoryContactsModel): Observable<any> {
    return this.http.put<any>('InspectFactoryContact', model);
  }
  getOne(factoryId:number, periodId :number , OwnerIdentity :string): Observable<any> {
    return this.http.get<any>('InspectFactoryContact?factoryId='+factoryId+'&periodId='+periodId+'&ownerIdentity='+OwnerIdentity);
  }
}
