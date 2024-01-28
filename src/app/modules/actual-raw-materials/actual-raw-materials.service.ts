import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActualRawMaterial } from './models/actual-raw-material.model';

@Injectable({
  providedIn: 'root'
})
export class ActualRawMaterialsService {

  constructor(private http: HttpClient) { }

  getRawMaterial(id:number): Observable<any> {
    return this.http.get<any>('RawMaterials?Factoryid='+id);
  }
  getAll(): Observable<any> {
    return this.http.get<any>('ActualRawMaterials');
  }
  getOne(id:number): Observable<any> {
    return this.http.get<any>('ActualRawMaterials/'+id);
  }
  update(material: ActualRawMaterial): Observable<any> {
    return this.http.put<any>('ActualRawMaterials', material);
  }

  create(material: ActualRawMaterial): Observable<any> {
    return this.http.post<any>('ActualRawMaterials', material);
  }


  //ActualRawMaterialFiles

  getFiles(itemId:number): Observable<any> {
    return this.http.get<any>('ActualRawMaterialFile/'+itemId);
  }
  AddFile(request: ActualRawMaterial): Observable<any> {
    return this.http.post<any>('ActualRawMaterialFile', request);
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>('ActualRawMaterialFile/' + id);
  }
}
