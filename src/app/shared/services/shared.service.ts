import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FactoryLandingService } from 'src/app/modules/factory-landing/factory-landing.service';

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


  constructor(private statusService:FactoryLandingService) {
  
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
  

  toggleDisable(factoryId:number,periodId:number,userId:string) {

    this.statusService.checkSataus(factoryId,periodId,userId).subscribe(response => {
      this.isDisabled=response.Data.isDisable
     
    });
    console.log(this.isDisabled)
    return this.isDisabled
  }
  getUserId() {
    return this.userId;
  }

}
