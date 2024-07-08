import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductSearch } from '../customs-items-update/models/product-search';
import { Observable } from 'rxjs';
import { ProductModel } from '../customs-items-update/models/product-model';
import { NewProductModel } from '../customs-items-update/models/product-model';

import { ProductsNotInFactorySearch } from './models/products-not-in-factory-search';
import { SearchCriteria } from 'src/app/core/models/search-criteria';

@Injectable({
  providedIn: 'root'
})
export class FactoryProductService {

  constructor(private http:HttpClient) { }

  getAllPagination(search: ProductSearch): Observable<any> {
    return this.http.post<any>('Products/Pagination', search);
  }
  GetFactoryProduct(search: ProductSearch): Observable<any> {
    return this.http.post<any>('Products/GetFactoryProduct', search);
  }
  getAllProducts(): Observable<any> {
    return this.http.get<any>('Products/AllProducts');
  }
  AllProductsListToRaw(search: any): Observable<any> {
    return this.http.post<any>('Products/AllProductsListToRaw', search);
  }
  getAllProductsList(search: any): Observable<any> {
    return this.http.post<any>('Products/AllProductsList', search);
  }
  getAll(factoryId:number): Observable<any> {
    return this.http.get<any>(`Products/GetAll?factoryId=${factoryId}`);
  }
  getAddedProducts(search:ProductSearch): Observable<any> {
    //return this.http.get<any>(`Products/GetAddedAll?factoryId=${factoryId}`);
    return this.http.post<any>('Products/GetAddedAll', search);
  }
  getAllProductsNotInFactory(search:ProductsNotInFactorySearch): Observable<any> {
    return this.http.post<any>('Products/getAllProductsNotInFactory',search);
  }
  GetOneAddedProduct(id:number): Observable<any> {
    return this.http.get<any>(`Products/GetOneAddedProduct?id=${id}`);
  }
  GetOneNewProduct(request: NewProductModel): Observable<any> {
    return this.http.post<any>('Products/GetOneNewProduct', request);

    //return this.http.get<any>(`Products/GetOneNewProduct?id=${id}`);
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
