import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FactoryProductsModel } from './models/factory-products.model';
import { FactoryProductsFileModel } from './models/factory-products-file-model.model';

@Injectable({
  providedIn: 'root'
})
export class FactoryProductsService {

  constructor(private http: HttpClient) { }
  

  getProducts(FactoryId: number,periodId :number): Observable<any> {
    return this.http.get<any>('InspectProducts?factoryId='+FactoryId+'&periodId='+periodId);
  }
  create(model: FactoryProductsModel): Observable<any> {
    return this.http.post<any>('InspectProducts', model);
  }

  update(model: FactoryProductsModel): Observable<any> {
    return this.http.put<any>('InspectProducts', model);
  }
//Files
  CreateFiles(model: FactoryProductsFileModel): Observable<any> {
    return this.http.post<any>('InspectProductAttachments',model);
  }

  getFiles(FactoryId: number): Observable<any> {
    return this.http.get<any>('InspectProductAttachments/'+FactoryId);
  }
}
