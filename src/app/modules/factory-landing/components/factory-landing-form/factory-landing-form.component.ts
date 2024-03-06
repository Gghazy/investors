import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicInfoService } from 'src/app/modules/basic-info/basic-info.service';
import { FactoryService } from 'src/app/modules/factory/factory.service';
import { PeriodService } from 'src/app/modules/period/period.service';
import { fade } from 'src/app/shared/animation/app.animation';
import { SharedService } from 'src/app/shared/services/shared.service';
import { FactoryLandingService } from '../../factory-landing.service';
import { FactoryStatus } from '../../models/factory-status.model';

@Component({
  selector: 'app-factory-landing-form',
  templateUrl: './factory-landing-form.component.html',
  styleUrls: ['./factory-landing-form.component.scss'],
  animations: [
    fade
  ]
})
export class FactoryLandingFormComponent implements OnInit {
  isChecked: boolean = false;
  factoryId:any;
  periodId:any;
  factoryName!:string;
  periodStartDate!:string;
  periodEndDate!:string;
  request = new FactoryStatus();

  constructor(
    private route: ActivatedRoute,
    private basicInfoService: BasicInfoService,
    private periodService: PeriodService,
    public sharedService: SharedService,
    public factoryLandingService: FactoryLandingService,
    private router: Router,
    ){
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');
    debugger
    
  }

  ngOnInit(): void {
    this.getBasicInfo()
    this.getPeriod()
  }


  getBasicInfo() {
    this.basicInfoService
      .getOne(this.factoryId,this.periodId)
      .subscribe((res: any) => {
        this.sharedService.factoryStatus = res.Data.Status;
        this.factoryName=res.Data.NameAr
      });
  }
  getPeriod() {
    this.periodService
      .getOne(this.periodId)
      .subscribe((res: any) => {
        this.periodStartDate=res.Data.PeriodStartDate
        this.periodEndDate=res.Data.PeriodEndDate
      });
  }


  save(){
    console.log(this.factoryId,this.periodId,true)
this.request.FactoryId=this.factoryId
this.request.PeriodId=this.periodId
this.request.UpdateStatus=true

    console.log(this.request)
    this.factoryLandingService
          .create(this.request)
          .subscribe((res: any) => {
            console.log(this.request)
            this.router.navigate(['/pages/factories-list']);
            
          });
  }
}
