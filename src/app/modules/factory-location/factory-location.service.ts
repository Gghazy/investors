import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocationFileModel } from './models/location-file-model';
import { LocationModel } from './models/location-model';

@Injectable({
  providedIn: 'root'
})
export class FactoryLocationService {

  constructor(private http: HttpClient) { }

  getAllFiles(factoryFinancialId: number): Observable<any> {
    return this.http.get<any>('FactoryLocationAttachments/' + factoryFinancialId);
  }
  createFile(request: LocationFileModel): Observable<any> {
    return this.http.post<any>('FactoryLocationAttachments', request);
  }
  deleteFile(id: number): Observable<any> {
    return this.http.delete<any>('FactoryLocationAttachments/' + id);
  }

  getOne(id: number,periodId:number): Observable<any> {
    return this.http.get<any>(`FactoryLocations?factoryId=${id}&periodId=${periodId}`);
  }
  create(request: LocationModel): Observable<any> {
    return this.http.post<any>('FactoryLocations', request);
  }
  update(request: LocationModel): Observable<any> {
    return this.http.put<any>('FactoryLocations', request);
  }
}
