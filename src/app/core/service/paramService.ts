import { Injectable,HostListener } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParamService {
  
  private readonly factoryId = 'factoryId';
  private readonly periodId = 'periodId';
  private readonly status = 'status';
  private readonly addedStatus = 'addedStatus';
  private readonly reviewerStatus = 'reviewerStatus';
  private readonly InspectorStatus = 'InspectorStatus';
  


  setfactoryId(factoryId: any) {
    sessionStorage.setItem(this.factoryId, factoryId);

  }

  getfactoryId(): any {
    return sessionStorage.getItem(this.factoryId);
  }

  setperiodId(periodId: any) {
    sessionStorage.setItem(this.periodId, periodId);
  }

  getperiodId(): any {
    return sessionStorage.getItem(this.periodId);
  }
  setstatus(status: any) {
    sessionStorage.setItem(this.status, status);
  }

  getstatus(): any {
    let value= sessionStorage.getItem(this.status)?.toString().toLowerCase();
    if(value === 'true')
      return true
    else
    return false
  }
  setReviewerStatus(status: any) {
    sessionStorage.setItem(this.reviewerStatus, status);
  }

  getReviewerStatus(): any {
    let value= sessionStorage.getItem(this.reviewerStatus)?.toString().toLowerCase();
    if(value === 'true')
      return true
    else
    return false
  }
  setAddedStatus(status: any) {
    sessionStorage.setItem(this.addedStatus, status);
  }

  getAddedStatus(): any {
    let value= sessionStorage.getItem(this.addedStatus)?.toString().toLowerCase();
    if(value === 'true')
      return true
    else
    return false
  }
  setInspectorStatus(InspectorStatus: any) {
    sessionStorage.setItem(this.InspectorStatus, InspectorStatus);
  }

  getInspectorStatus(): boolean {
    let value= sessionStorage.getItem(this.InspectorStatus)?.toString().toLowerCase();
    if(value === 'true')
      return true
    else
    return false
    
  }
  clearAll() {
    sessionStorage.clear();
  }
  @HostListener('window:beforeunload', ['$event'])
  clearStorage(event: Event) {
    this.clearAll();
  }
}