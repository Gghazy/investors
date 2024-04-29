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
  
  create(model: FactoryLocationModel): Observable<any> {
    return this.http.post<any>('InspectFactoryLocations', model);
  }


  //Files


  CreateFiles(model: FactoryLocationFileModel): Observable<any> {
    return this.http.post<any>('InspectFactoryLocationAttachments',model);
  }

  getFiles(FactoryId: number,periodId:number): Observable<any> {
    return this.http.get<any>('InspectFactoryLocationAttachments?factoryId='+FactoryId+'&periodId='+periodId);
  }
}
