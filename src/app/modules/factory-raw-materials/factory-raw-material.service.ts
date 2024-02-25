import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RawMaterial } from './models/raw-material.model';
import { RawMaterialSearch } from './models/raw-material-search.model';

@Injectable({
  providedIn: 'root'
})
export class FactoryRawMaterialService {

  constructor(private http: HttpClient) { }

  

  getRawMaterial(search: RawMaterialSearch,id:number): Observable<any> {
    return this.http.post<any>('RawMaterials/pagination?Factoryid='+id,search);
  }

  getByPeriod(factoryId:number, periodId:number): Observable<any> {
    return this.http.get<any>('RawMaterials?Factoryid='+factoryId+'&Periodid='+periodId);
  }
  getOne(id:number): Observable<any> {
    return this.http.get<any>('RawMaterials/'+id);
  }


  getCustomItemRawMaterial(): Observable<any> {
    return this.http.get<any>('CustomItemRawMaterial');
  }


  update(material: RawMaterial): Observable<any> {
    return this.http.put<any>('RawMaterials', material);
  }
  create(material: RawMaterial): Observable<any> {
    return this.http.post<any>('RawMaterials', material);
  }


//AttachmentService

Upload(attach: RawMaterial): Observable<any> {
  return this.http.post<any>('RawMaterials', attach);
}

}
