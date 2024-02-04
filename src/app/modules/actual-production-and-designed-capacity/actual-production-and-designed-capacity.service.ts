import { Injectable } from '@angular/core';
import { ActualProductSearch } from './models/actual-product-search';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ActualProductModel } from './models/actual-product-model';

@Injectable({
  providedIn: 'root'
})
export class ActualProductionAndDesignedCapacityService {

  constructor(private http:HttpClient) { }
  getAllPagination(search: ActualProductSearch): Observable<any> {
    return this.http.post<any>('ActualProductionAndCapacities/Pagination', search);
  }
  getOne(id:number|undefined): Observable<any> {
    return this.http.get<any>('ActualProductionAndCapacities/'+id);
  }
  create(request: ActualProductModel): Observable<any> {
    return this.http.post<any>('ActualProductionAndCapacities', request);
  }
  update(request: ActualProductModel): Observable<any> {
    return this.http.put<any>('ActualProductionAndCapacities', request);
  }
}
