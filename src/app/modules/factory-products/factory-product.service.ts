import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductSearch } from '../customs-items-update/models/product-search';
import { Observable } from 'rxjs';
import { ProductModel } from '../customs-items-update/models/product-model';
import { ProductsNotInFactorySearch } from './models/products-not-in-factory-search';

@Injectable({
  providedIn: 'root'
})
export class FactoryProductService {

  constructor(private http:HttpClient) { }

  getAllPagination(search: ProductSearch): Observable<any> {
    return this.http.post<any>('Products/Pagination', search);
  }
  getAll(factoryId:number): Observable<any> {
    return this.http.get<any>(`Products/GetAll?factoryId=${factoryId}`);
  }
  getAllProductsNotInFactory(search:ProductsNotInFactorySearch): Observable<any> {
    return this.http.post<any>('Products/getAllProductsNotInFactory',search);
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
 
}
