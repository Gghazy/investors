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
  
  create(model: FactoryProductsModel): Observable<any> {
    return this.http.post<any>('InspectProducts', model);
  }
//Files
  CreateFiles(model: FactoryProductsFileModel): Observable<any> {
    return this.http.post<any>('InspectProductAttachments',model);
  }

  getFiles(FactoryId: number): Observable<any> {
    return this.http.get<any>('InspectProductAttachments?factoryId='+FactoryId);
  }
}
