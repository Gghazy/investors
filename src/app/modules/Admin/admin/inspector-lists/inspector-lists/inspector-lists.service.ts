import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InspectorModel } from './models/inspector-lists.model';

@Injectable({
  providedIn: 'root'
})
export class InspectorListsService {

  constructor(private http: HttpClient) { }
    getAll(): Observable<any> {
      return this.http.get<any>('Inspectors');
    }
    getOne(id:number): Observable<any> {
      return this.http.get<any>('Inspectors/'+id);
    }
    create(inpsector: InspectorModel): Observable<any> {
      return this.http.post<any>('Inspectors', inpsector);
    }
    update(inpsector: InspectorModel): Observable<any> {
      return this.http.put<any>('Inspectors', inpsector);
    }
  
    deleteInspector(id:number): Observable<any> {
      return this.http.delete<any>('Inspectors/'+id);
    }
  
}
