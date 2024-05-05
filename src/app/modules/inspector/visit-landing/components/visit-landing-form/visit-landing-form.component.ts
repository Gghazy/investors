import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VisitLandingService } from '../../visit-landing.service';
import { InspectorScreenStatusModel } from '../../models/inspector-screen-status-model.model';
import { ToastrService } from 'ngx-toastr';

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
    private router: Router,
    private toastr: ToastrService,
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
  this.screenStatuse.FactoryId = this.factoryId
  this.screenStatuse.PeriodId = this.periodId
  this.screenStatuse.UpdateStatus = true
  console.log(this.screenStatuse)
  if(this.screenStatuse.Id==0){

    // this.visitLandingService
    // .create(this.screenStatuse)
    // .subscribe((res: any) => {
    //   console.log(this.screenStatuse)
    this.router.navigate(['/pages/Inspector/factories-list']);
    //   this.toastr.success("تم الحفظ");
    // });
  }
  // else if(this.screenStatuse.Id!=0){
  //   this.visitLandingService
  //   .update(this.screenStatuse)
  //   .subscribe((res: any) => {
  //     console.log(this.screenStatuse)
  //     this.router.navigate(['/pages/Inspector/factories-list']);
  //     this.toastr.success("تم الحفظ");
  //   });
  // }
}
  checkAllScreenStatus(){
    // debugger
        
        this.allScreenStatus=
        this.screenStatuse.InspectorBasicFactoryInfo&&
        this.screenStatuse.InspectorFactoryContact&&
        this.screenStatuse.InspectorFactoryLocation&&
        this.screenStatuse.InspectorProductData&&
        this.screenStatuse.InspectorActualProduction&&
        this.screenStatuse.InspectorRawMaterial
       
      }
}
