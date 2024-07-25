import { Injectable, HostListener } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UnloadService {

  @HostListener('window:beforeunload', ['$event'])
  beforeunloadHandler(event: Event) {
    alert("UnloadService")
    const key = 'token';
    localStorage.removeItem(key);
  }
}