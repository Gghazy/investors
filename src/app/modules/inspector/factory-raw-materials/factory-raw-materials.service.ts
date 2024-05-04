import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FactoryRawMaterialsModel } from './models/factory-raw-materials.model';
import { FactoryRawMaterialsFileModel } from './models/factory-raw-materials-file-model.model';

@Injectable({
  providedIn: 'root'
})
export class FactoryRawMaterialsService {

  constructor(private http: HttpClient) { }
  
  getAll(FactoryId: number,periodId:number,ownerIdentity:number): Observable<any> {
    return this.http.get<any>('InspectorRawMaterial?factoryId='+FactoryId+'&periodId='+periodId+'&ownerIdentity='+ownerIdentity);
  }

  create(model: FactoryRawMaterialsModel): Observable<any> {
    return this.http.post<any>('InspectorRawMaterial', model);
  }
  update(model: FactoryRawMaterialsModel): Observable<any> {
    return this.http.put<any>('InspectorRawMaterial', model);
  }

  //Files
  CreateFiles(model: FactoryRawMaterialsFileModel): Observable<any> {
    return this.http.post<any>('InspectorRawMaterialFile',model);
  }

  getFiles(FactoryId: number,periodId:number): Observable<any> {
    return this.http.get<any>('InspectorRawMaterialFile?factoryId='+FactoryId+'&periodId='+periodId);
  }
}
