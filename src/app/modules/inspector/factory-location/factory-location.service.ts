import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FactoryLocationModel } from './models/factory-location.model';
import { FactoryLocationFileModel } from './models/factory-location-file-model.model';

@Injectable({
  providedIn: 'root'
})
export class InspectorFactoryLocationService {

  constructor(private http: HttpClient) { }
  
  getAll(FactoryId: number,periodId:number,ownerIdentity:string): Observable<any> {
    return this.http.get<any>('InspectFactoryLocations?factoryId='+FactoryId+'&periodId='+periodId+'&ownerIdentity='+ownerIdentity);
  }


  create(model: FactoryLocationModel): Observable<any> {
    return this.http.post<any>('InspectFactoryLocations', model);
  }

  update(model: FactoryLocationModel): Observable<any> {
    return this.http.put<any>('InspectFactoryLocations', model);
  }
  //Files


  CreateFiles(model: FactoryLocationFileModel): Observable<any> {
    return this.http.post<any>('InspectFactoryLocationAttachments',model);
  }

  getFiles(FactoryId: number,periodId:number): Observable<any> {
    return this.http.get<any>('InspectFactoryLocationAttachments?factoryId='+FactoryId+'&periodId='+periodId);
  }
  deleteFile(id: number): Observable<any> {
    return this.http.delete<any>('InspectFactoryLocationAttachments/' + id);
  }
}
