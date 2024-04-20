import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FactoryRawMaterialsModel } from './models/factory-raw-materials.model';

@Injectable({
  providedIn: 'root'
})
export class FactoryRawMaterialsService {

  constructor(private http: HttpClient) { }
  
  create(model: FactoryRawMaterialsModel): Observable<any> {
    return this.http.post<any>('x', model);
  }
}
