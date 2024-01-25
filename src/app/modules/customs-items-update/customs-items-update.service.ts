import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductSearch } from './models/product-search';
import { SaveCustomLevelModel } from './models/save-custom-level-model';

@Injectable({
  providedIn: 'root'
})
export class CustomsItemsUpdateService {

  constructor(private http: HttpClient) { }

  getAllPagination(search: ProductSearch): Observable<any> {
    return this.http.post<any>('Products/ProductLevel10', search);
  }

  getLevel12Product(factoryId:number,productId:number): Observable<any> {
    return this.http.get<any>(`Products/ProductLevel12?factoryId=${factoryId}&&productId=${productId}`);
  }
  getCustomProductLevel(productId:number): Observable<any> {
    return this.http.get<any>('Products/GetCustomProductLevel?productId='+productId);
  }
  SaveCustomLevel(req:SaveCustomLevelModel): Observable<any> {
    return this.http.post<any>('Products/SaveCustomLevel',req);
  }
}
