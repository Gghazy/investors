import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RawMaterial } from './models/raw-material.model';

@Injectable({
  providedIn: 'root'
})
export class FactoryRawMaterialService {

  constructor(private http: HttpClient) { }

  

  getRawMaterial(id:number): Observable<any> {
    return this.http.get<any>('RawMaterials?Factoryid='+id);
  }
  getOne(id:number): Observable<any> {
    return this.http.get<any>('RawMaterials/'+id);
  }
  update(material: RawMaterial): Observable<any> {
    return this.http.put<any>('RawMaterials', material);
  }
}
