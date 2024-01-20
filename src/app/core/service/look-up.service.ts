import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LookUpService {

  constructor(private http: HttpClient) { } 

  getAllCities(): Observable<any> {
    return this.http.get<any>('Cities');
  }
  getAllIndustrialAreas(): Observable<any> {
    return this.http.get<any>('IndustrialAreas');
  }
  getAllFactoryEntities(): Observable<any> {
    return this.http.get<any>('FactoryEntities');
  }
}
