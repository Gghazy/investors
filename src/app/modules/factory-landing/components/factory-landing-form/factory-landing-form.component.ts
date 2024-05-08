import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasicInfoService } from 'src/app/modules/basic-info/basic-info.service';
import { FactoryService } from 'src/app/modules/factory/factory.service';
import { PeriodService } from 'src/app/modules/period/period.service';
import { fade } from 'src/app/shared/animation/app.animation';
import { SharedService } from 'src/app/shared/services/shared.service';
import { FactoryLandingService } from '../../factory-landing.service';
import { ScreenStatusModel } from '../../models/screen-status-model';
import { FactoryStatus } from '../../models/factory-status.model';
import { ToastrService } from 'ngx-toastr';

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
  factoryId: any;
  periodId: any;
  factoryName!: string;
  periodStartDate!: string;
  periodMonth!:number;
  periodEndDate!: string;
  screenStatuse = new ScreenStatusModel();
  allScreenStatus:Boolean=false;
  FactoryStatus: string = 'Default Label';
  FactoryStatusId!:number
  request = new FactoryStatus();
  Year!:string
  constructor(
    private route: ActivatedRoute,
    private basicInfoService: BasicInfoService,
    private periodService: PeriodService,
    public sharedService: SharedService,
    public factoryLandingService: FactoryLandingService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');


  }

  ngOnInit(): void {
    this.getBasicInfo()
    this.getPeriod()
    this.getScreenStatus()
    this.getFactUpdateStatus()
  }

  getScreenStatus() {
    this.factoryLandingService
      .getScreenStatus(this.factoryId, this.periodId)
      .subscribe((res: any) => {
        
        this.screenStatuse = res.Data
        this.checkAllScreenStatus();
      });
  }


  getBasicInfo() {
    this.basicInfoService
      .getOne(this.factoryId, this.periodId)
      .subscribe((res: any) => {
        this.sharedService.factoryStatus = res.Data.Status;
        this.factoryName = res.Data.NameAr
      });
  }
  getPeriod() {
    this.periodService
      .getOne(this.periodId)
      .subscribe((res: any) => {
        this.periodStartDate = res.Data.PeriodStartDate
        this.periodEndDate = res.Data.PeriodEndDate
        this.Year= res.Data.Year
        debugger
        this.periodMonth = res.Data.Month
      });
  }

  getFactUpdateStatus() {
    this.factoryLandingService
      .getOne(this.factoryId,this.periodId)
      .subscribe((res: any) => {
        this.isChecked=res.Data.UpdateStatus;
        this.FactoryStatusId = res.Data.DataStatus;
        if(this.FactoryStatusId==0){
          this.FactoryStatus= ' ادخال'
        }
        if(this.FactoryStatusId==1 ){
          this.FactoryStatus=  ' اعتماد البيانات المدخلة'
        }
        if(this.FactoryStatusId==2){
          this.FactoryStatus= ' الاعتمادالنهائي للبيانات وارسالها'
        }
        if(this.FactoryStatusId==3){
          this.FactoryStatus= ' الاعتمادالنهائي للبيانات وارسالها'
        }
        
                console.log(this.FactoryStatus)
            
      });
  }

  save() {
    this.request.FactoryId = this.factoryId
    this.request.PeriodId = this.periodId
    this.request.UpdateStatus = true
    if(this.request.Id==0){
      this.factoryLandingService
      .create(this.request)
      .subscribe((res: any) => {
        console.log(this.request)
        this.router.navigate(['/pages/factories-list']);
        this.toastr.success("تم الحفظ");
      });
    }
    else if(this.request.Id!=0){
      this.factoryLandingService
      .update(this.request)
      .subscribe((res: any) => {
        console.log(this.request)
        this.router.navigate(['/pages/factories-list']);
        this.toastr.success("تم الحفظ");
      });
    }
    
  }


  checkAllScreenStatus(){
debugger
    
    this.allScreenStatus=
    this.screenStatuse.ProductData&&
    this.screenStatuse.BasicFactoryInfo&&
    this.screenStatuse.FinancialData&&
    this.screenStatuse.MonthlyFinancialData&&
    this.screenStatuse.FactoryLocation&&
    this.screenStatuse.FactoryContact&&
    this.screenStatuse.CustomItemsUpdated&&
    //this.screenStatuse.CustomItemValidity&&
    this.screenStatuse.ActualProduction
    // this.screenStatuse.RawMaterial&&
    // this.screenStatuse.ActualRawMaterila&&
   
  }
}
