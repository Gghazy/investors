import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FactoryProductsModel } from './models/factory-products.model';

@Injectable({
  providedIn: 'root'
})
export class FactoryProductsService {

  constructor(private http: HttpClient) { }
  
  create(model: FactoryProductsModel): Observable<any> {
    return this.http.post<any>('x', model);
  }
}
