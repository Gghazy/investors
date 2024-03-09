import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductSearch } from './models/product-search';
import { ProductPeriodActiveModel } from './models/product-period-active-model';

@Injectable({
  providedIn: 'root'
})
export class CustomsItemsUpdateService {

  constructor(private http: HttpClient) { }

  getAllPagination(search: ProductSearch): Observable<any> {
    return this.http.post<any>('Products/ProductLevel10', search);
  }

  create(request: ProductPeriodActiveModel[]): Observable<any> {
    return this.http.post<any>('ProductPeriodActives', request);
  }
  update(request: ProductPeriodActiveModel[]): Observable<any> {
    return this.http.put<any>('ProductPeriodActives', request);
  }

 
}
