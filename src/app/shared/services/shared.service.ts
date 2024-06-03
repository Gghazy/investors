import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private userId!: string;
  private userRole!: string;
  public factoryStatus!:number;
  public CurrentfactoryStatus!:number;
  public isDisabled = false;
  private pageTitleSource = new BehaviorSubject<string>('');
  routeTitle$ = this.pageTitleSource.asObservable();


  constructor() {
  
    this.userRole = 'admin'; 
  }
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
  

  toggleDisable() {

    
    if(this.CurrentfactoryStatus==3){
    this.isDisabled = !this.isDisabled;
   
    }
    console.log(this.CurrentfactoryStatus)
    console.log(this.isDisabled)
  }
  getUserId() {
    return this.userId;
  }

}
