import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VisitLandingService } from '../../visit-landing.service';
import { InspectorScreenStatusModel } from '../../models/inspector-screen-status-model.model';
import { ToastrService } from 'ngx-toastr';
import {ParamService}from 'src/app/core/service/paramService'

@Component({
  selector: 'app-visit-landing-form',
  templateUrl: './visit-landing-form.component.html',
  styleUrls: ['./visit-landing-form.component.scss']
})
export class VisitLandingFormComponent implements OnInit  {
  factoryId: any;
  periodId: any;
  approveStatus:any;
  allScreenStatus:Boolean=false;
  screenStatuse = new InspectorScreenStatusModel();
  isChecked: boolean = false;
  inspectorApproved=false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
   private visitLandingService: VisitLandingService,
   private paramService: ParamService

  ) {
    this.factoryId = paramService.getfactoryId();
    this.periodId = paramService.getperiodId();
    this.inspectorApproved=paramService.getInspectorStatus()
   
  }

  ngOnInit(): void {
    this.getScreenStatus()
  }

  getScreenStatus() {
    this.visitLandingService
      .getScreenStatus(this.factoryId, this.periodId)
      .subscribe((res: any) => {
        
        this.screenStatuse = res.Data
       this.paramService.setInspectorfactoryStatus(this.screenStatuse.factorystatus)

        console.log(this.screenStatuse)
        this.checkAllScreenStatus();
        console.log(this.screenStatuse)
      });
  }
save(){
  console.log(this.screenStatuse)
  this.screenStatuse.FactoryId = this.factoryId
  this.screenStatuse.PeriodId = this.periodId
  this.screenStatuse.UpdateStatus = true
  console.log(this.screenStatuse)

  if(this.screenStatuse.Id==0){

    this.visitLandingService
    .create(this.screenStatuse)
    .subscribe((res: any) => {
      console.log(this.screenStatuse)
      this.router.navigate(['/pages/period/'+this.factoryId+'/Inspector']);
      this.toastr.success("تم إعتماد بيانات الزيارة وارسالها");
    });
  }
  else if(this.screenStatuse.Id!=0){
    this.visitLandingService
    .update(this.screenStatuse)
    .subscribe((res: any) => {
      console.log(this.screenStatuse)
      this.router.navigate(['/pages/period/'+this.factoryId+'/Inspector']);
      this.toastr.success("تم إعتماد بيانات الزيارة وارسالها");
    });
  }
}
  checkAllScreenStatus(){
    // debugger
        
       /* this.allScreenStatus=
        this.screenStatuse.InspectorBasicFactoryInfo&&
        this.screenStatuse.InspectorFactoryContact&&
        this.screenStatuse.InspectorFactoryLocation&&
        this.screenStatuse.InspectorProductData&&
        this.screenStatuse.InspectorActualProduction&&
        this.screenStatuse.InspectorRawMaterial*/
        if (this.screenStatuse.factorystatus == 1) {
          this.allScreenStatus =
            this.screenStatuse.InspectorBasicFactoryInfo &&
            this.screenStatuse.InspectorFactoryLocation &&
            this.screenStatuse.InspectorFactoryContact
        }else
        if (this.screenStatuse.factorystatus == 0 || this.screenStatuse.factorystatus == 2 || this.screenStatuse.factorystatus == 3) {
          this.allScreenStatus =
            this.screenStatuse.InspectorProductData &&
            this.screenStatuse.InspectorBasicFactoryInfo &&
            this.screenStatuse.InspectorFactoryContact &&
            this.screenStatuse.InspectorFactoryLocation &&
            this.screenStatuse.InspectorActualProduction&&
            this.screenStatuse.InspectorRawMaterial 
        }
      else
        if (this.screenStatuse.factorystatus == 4) {
          this.allScreenStatus =
            this.screenStatuse.InspectorBasicFactoryInfo
        }
       
      }
}
