import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductSearch } from '../customs-items-update/models/product-search';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FactoryProductService {

  constructor(private http:HttpClient) { }

  getAllPagination(search: ProductSearch): Observable<any> {
    return this.http.post<any>('Products/Pagination', search);
  }
}
