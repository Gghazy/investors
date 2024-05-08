import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FactoriesListService {

  constructor(private http: HttpClient) { }

  getFacatories(inspectorId:string): Observable<any> {
    return this.http.get<any>('Inspectors/GetInspectorFactories?InspectorId='+inspectorId);
  }
}
