import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductSearch } from '../customs-items-update/models/product-search';
import { Observable } from 'rxjs';
import { CheckLevelModel } from './models/check-level-model';

@Injectable({
  providedIn: 'root'
})
export class CustomsItemsCheckService {

  constructor(private http: HttpClient) { }

  getAllCheckLevel(search: ProductSearch): Observable<any> {
    return this.http.post<any>('Products/GetAllCheckLevel', search);
  }
  saveCheckLevel(req:CheckLevelModel): Observable<any> {
    return this.http.post<any>('Products/SaveCheckLevel',req);
  }
}
