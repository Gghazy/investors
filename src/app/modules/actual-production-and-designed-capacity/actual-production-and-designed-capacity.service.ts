import { Injectable } from '@angular/core';
import { ActualProductSearch } from './components/models/actual-product-search';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActualProductionAndDesignedCapacityService {

  constructor(private http:HttpClient) { }
  getAllPagination(search: ActualProductSearch): Observable<any> {
    return this.http.post<any>('ActualProductionAndCapacities/Pagination', search);
  }
}
