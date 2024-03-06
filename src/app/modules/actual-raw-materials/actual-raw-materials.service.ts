import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActualRawMaterial } from './models/actual-raw-material.model';
import { RawMaterialSearch } from '../factory-raw-materials/models/raw-material-search.model';
import { ActualRawMaterialFile } from './models/actual-raw-material-file.model';

@Injectable({
  providedIn: 'root'
})
export class ActualRawMaterialsService {

  constructor(private http: HttpClient) { }

  getRawMaterial(search: RawMaterialSearch,id:number): Observable<any> {
    return this.http.post<any>('RawMaterials/pagination?Factoryid='+id,search);
  }

  getByFactory(factoryId:number,periodId:number): Observable<any> {
    return this.http.get<any>('ActualRawMaterials/Period?factoryId='+factoryId+'&Periodid='+periodId);
  }

  getAll(): Observable<any> {
    return this.http.get<any>('ActualRawMaterials');
  }

  getByMonth(id:number): Observable<any> {
    return this.http.get<any>('ActualRawMaterials/Month?month='+id);
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

  getFiles(factoryId:number,periodId:number): Observable<any> {
    return this.http.get<any>(`ActualRawMaterialFile?factoryId=${factoryId}&&periodId=${periodId}`);
  }
  AddFile(request: ActualRawMaterialFile): Observable<any> {
    return this.http.post<any>('ActualRawMaterialFile', request);
  }
  delete(id: number): Observable<any> {
    return this.http.delete<any>('ActualRawMaterialFile/' + id);
  }
}
