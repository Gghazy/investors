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
