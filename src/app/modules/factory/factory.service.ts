import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FactoryModel } from './models/factory-model';
import { FactorySearch } from './models/factory-search';

@Injectable({
  providedIn: 'root'
})
export class FactoryService {

  constructor(private http: HttpClient) { }

  getAllPagination(search: FactorySearch): Observable<any> {
    return this.http.post<any>('Factories', search);
  }
  getOne(id:number): Observable<any> {
    return this.http.get<any>('Factories/'+id);
  }
  getFactoryEntity(factoryEntityId:number): Observable<any> {
    return this.http.get<any>('Factories/FactoryByEntity?factoryEntityId='+factoryEntityId);
  }
  update(factory: FactoryModel): Observable<any> {
    return this.http.put<any>('Factories', factory);
  }
}
