import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FactoryStatus } from './models/factory-status.model';

@Injectable({
  providedIn: 'root'
})
export class FactoryLandingService {

  constructor(private http: HttpClient) { }


  create(data: FactoryStatus): Observable<any> {
    return this.http.post<any>('FactoryUpdateStatuses', data);
  }


  update(data: FactoryStatus): Observable<any> {
    return this.http.put<any>('FactoryUpdateStatuses', data);
  }
  
}
