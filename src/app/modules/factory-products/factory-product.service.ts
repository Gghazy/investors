import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductSearch } from '../customs-items-update/models/product-search';
import { Observable } from 'rxjs';
import { ProductModel } from '../customs-items-update/models/product-model';

@Injectable({
  providedIn: 'root'
})
export class FactoryProductService {

  constructor(private http:HttpClient) { }

  getAllPagination(search: ProductSearch): Observable<any> {
    return this.http.post<any>('Products/Pagination', search);
  }
  getOne(id:number): Observable<any> {
    return this.http.get<any>('Products/'+id);
  }
  create(request: ProductModel): Observable<any> {
    return this.http.post<any>('Products', request);
  }
  update(request: ProductModel): Observable<any> {
    return this.http.put<any>('Products', request);
  }
  getAll(id:number): Observable<any> {
    return this.http.get<any>('Products/GetAll?factoryId='+id);
  }
  
}
