import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient) { }


  addFile(file:any): Observable<any> {
    const formData = new FormData();
    formData.append('File', file);
    return this.http.post('Attachments', formData);
  }
  downloadTempelete(id: number): Observable<any> {
    return this.http.get('Attachments/' + id,{responseType: 'blob'});
  }
  getImage(id: number): Observable<any> {
    return this.http.get('Attachments/DownloadImageBas64?id=' + id);
  }

}
