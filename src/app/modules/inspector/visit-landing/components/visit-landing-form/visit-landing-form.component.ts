import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VisitLandingService } from '../../visit-landing.service';
import { InspectorScreenStatusModel } from '../../models/inspector-screen-status-model.model';

@Component({
  selector: 'app-visit-landing-form',
  templateUrl: './visit-landing-form.component.html',
  styleUrls: ['./visit-landing-form.component.scss']
})
export class VisitLandingFormComponent implements OnInit  {
  factoryId: any;
  periodId: any;
  allScreenStatus:Boolean=false;
  screenStatuse = new InspectorScreenStatusModel();
  isChecked: boolean = false;
  constructor(
    private route: ActivatedRoute,
   private visitLandingService: VisitLandingService,

  ) {
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');


  }

  ngOnInit(): void {
    this.getScreenStatus()
  }

  getScreenStatus() {
    this.visitLandingService
      .getScreenStatus(this.factoryId, this.periodId)
      .subscribe((res: any) => {
        
        this.screenStatuse = res.Data
        this.checkAllScreenStatus();
        console.log(this.screenStatuse)
      });
  }
save(){
  // this.request.FactoryId = this.factoryId
  // this.request.PeriodId = this.periodId
  // this.request.UpdateStatus = true
  // if(this.request.Id==0){
  //   this.factoryLandingService
  //   .create(this.request)
  //   .subscribe((res: any) => {
  //     console.log(this.request)
  //     this.router.navigate(['/pages/factories-list']);
  //     this.toastr.success("تم الحفظ");
  //   });
  // }
  // else if(this.request.Id!=0){
  //   this.factoryLandingService
  //   .update(this.request)
  //   .subscribe((res: any) => {
  //     console.log(this.request)
  //     this.router.navigate(['/pages/factories-list']);
  //     this.toastr.success("تم الحفظ");
  //   });
  // }
}
  checkAllScreenStatus(){
    debugger
        
        this.allScreenStatus=
        this.screenStatuse.InspectorBasicFactoryInfo&&
        this.screenStatuse.InspectorFactoryContact&&
        this.screenStatuse.InspectorFactoryLocation&&
        this.screenStatuse.InspectorProductData&&
        this.screenStatuse.InspectorActualProduction&&
        this.screenStatuse.InspectorRawMaterial
       
      }
}
