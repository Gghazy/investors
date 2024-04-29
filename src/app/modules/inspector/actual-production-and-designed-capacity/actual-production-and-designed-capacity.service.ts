import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActualProductionAndDesignedCapacityModel } from './models/actual-production-and-designed-capacity.model';
import { ActualProductionAndDesignedCapacityFileModel } from './models/actual-production-and-designed-capacity-file-model.model';

@Injectable({
  providedIn: 'root'
})
export class InspectorActualProductionAndDesignedCapacityService {

  constructor(private http: HttpClient) { }
  
  create(model: ActualProductionAndDesignedCapacityModel): Observable<any> {
    return this.http.post<any>('InspectActualProductions', model);
  }
  getProducts(FactoryId: number,periodId:number): Observable<any> {
    return this.http.get<any>('InspectActualProductions?factoryId='+FactoryId+'&periodId='+periodId);
  }
  update(model: ActualProductionAndDesignedCapacityModel): Observable<any> {
    return this.http.put<any>('InspectActualProductions', model);
  }
 /// Files

 CreateFiles(model: ActualProductionAndDesignedCapacityFileModel): Observable<any> {
  return this.http.post<any>('InspectActualProductionAttchs',model);
}

getFiles(FactoryId: number,periodId:number): Observable<any> {
  return this.http.get<any>('InspectActualProductionAttchs?factoryId='+FactoryId+'&periodId='+periodId);
}

}
