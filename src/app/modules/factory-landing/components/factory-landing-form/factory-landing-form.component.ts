import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasicInfoService } from 'src/app/modules/basic-info/basic-info.service';
import { FactoryService } from 'src/app/modules/factory/factory.service';
import { PeriodService } from 'src/app/modules/period/period.service';
import { fade } from 'src/app/shared/animation/app.animation';
import { SharedService } from 'src/app/shared/services/shared.service';
import { FactoryLandingService } from '../../factory-landing.service';
import { ScreenStatusModel } from '../../models/screen-status-model';

@Component({
  selector: 'app-factory-landing-form',
  templateUrl: './factory-landing-form.component.html',
  styleUrls: ['./factory-landing-form.component.scss'],
  animations: [
    fade
  ]
})
export class FactoryLandingFormComponent implements OnInit {

  factoryId:any;
  periodId:any;
  factoryName!:string;
  periodStartDate!:string;
  periodEndDate!:string;
  screenStatuse!:ScreenStatusModel;



  constructor(
    private route: ActivatedRoute,
    private basicInfoService: BasicInfoService,
    private periodService: PeriodService,
    private factoryLandingService: FactoryLandingService,
    public sharedService: SharedService,
    ){
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');
    
    
  }

  ngOnInit(): void {
    this.getBasicInfo()
    this.getPeriod()
    this.getScreenStatus()
  }

  getScreenStatus() {
    this.factoryLandingService
      .getScreenStatus(this.factoryId,this.periodId)
      .subscribe((res: any) => {
        this.screenStatuse=res.Data
      });
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
}
