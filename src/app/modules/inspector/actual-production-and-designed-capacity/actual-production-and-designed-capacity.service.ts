import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActualProductionAndDesignedCapacityModel } from './models/actual-production-and-designed-capacity.model';

@Injectable({
  providedIn: 'root'
})
export class ActualProductionAndDesignedCapacityService {

  constructor(private http: HttpClient) { }
  
  create(model: ActualProductionAndDesignedCapacityModel): Observable<any> {
    return this.http.post<any>('x', model);
  }
}
