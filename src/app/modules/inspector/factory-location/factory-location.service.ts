import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FactoryLocationModel } from './models/factory-location.model';

@Injectable({
  providedIn: 'root'
})
export class FactoryLocationService {

  constructor(private http: HttpClient) { }
  
  create(model: FactoryLocationModel): Observable<any> {
    return this.http.post<any>('x', model);
  }
}
