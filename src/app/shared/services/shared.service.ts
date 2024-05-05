import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private userId!: string;
  private userRole!: string;
  public factoryStatus!:number;

  private pageTitleSource = new BehaviorSubject<string>('');
  routeTitle$ = this.pageTitleSource.asObservable();

  setPageTitle(title: string): void {
    this.pageTitleSource.next(title);
  }

  setUserRole(role: string) {
    this.userRole = role;

  }

  getUserRole() {
    return this.userRole;
  }

  
  setUserId(Id: string) {
    this.userId = Id;

  }

  getUserId() {
    return this.userId;
  }
}
