import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fade } from 'src/app/shared/animation/app.animation';
import { FinancialModel } from '../../Models/financial-model';
import { FinancialDetailService } from '../../financial-detail.service';
import { ToastrService } from 'ngx-toastr';
import { PeriodService } from 'src/app/modules/period/period.service';
import { BasicInfoService } from 'src/app/modules/basic-info/basic-info.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { FactoryLandingService } from 'src/app/modules/factory-landing/factory-landing.service';
import {ParamService}from 'src/app/core/service/paramService'

@Component({
  selector: 'app-financial-detail-form',
  templateUrl: './financial-detail-form.component.html',
  styleUrls: ['./financial-detail-form.component.scss'],
  animations: [
    fade
  ]
})
export class FinancialDetailFormComponent {
  factoryId: any;
  periodId: any;
  approveStatus:boolean;
  approveStatusText:any;
  statusFile!:number;
  statusFileType!:boolean;
  lockSaveItem=false;
  year!:number;
   isDisabled!:boolean;
  factoryStatus!:number;
  request = new FinancialModel();
  min: number = 10000;
  max: number = 50000000000;
  constructor(
    private route: ActivatedRoute,
     private financialDetailService: FinancialDetailService,
     private periodService: PeriodService,
     private toastr: ToastrService,
     private router: Router,
     private basicInfoService: BasicInfoService,
     private sharedService: SharedService,
     public factoryLandingService: FactoryLandingService,
     private paramService: ParamService,

     ) {
      this.factoryId = paramService.getfactoryId();
      this.periodId = paramService.getperiodId();
      this.approveStatus=paramService.getstatus()

  }
  ngOnInit(): void {
    this.ToggleDisable()
    this.getperiod()
    this.getBasicInfo()
  }

  getperiod(){
    this.periodService
    .getOne(this.periodId)
    .subscribe((res: any) => {
      
      this.year = res.Data.Year -1;
      this.getFinancial()
    });
  }

  public getFilestatus(item: any):void {
    this.statusFile=item;
}
public getFilestatusType(item: any):void {
  this.statusFileType=item;
}
  ToggleDisable() {
    let userId=  this.sharedService.getUserId()

   //this.isDisabled= this.sharedService.toggleDisable(this.factoryId,this.periodId,userId)
  
  }
  getFinancial() {
    this.financialDetailService
      .getOne(this.factoryId,this.year)
      .subscribe((res: any) => {
        this.request = res.Data;
      });
  }
  getBasicInfo() {
    this.basicInfoService
      .getOne(this.factoryId,this.periodId)
      .subscribe((res: any) => {
        this.factoryStatus = res.Data.Status;
        console.log(this.factoryStatus)
      });
  }
  save(){

   if(!this.statusFileType)
      {  this.toastr.error( 'الرجاء إرفاق الإقرار الزكوي  و القوائم المالية');
        return;
      }
      if(this.lockSaveItem)
        {
            this.toastr.error("عملية حفظ/تعديل البيانات المالية  قيد التنفيذ")
            return
            
        }
    this.request.FactoryId=this.factoryId;
    this.request.Year=this.year;
    this.request.TotalExpenses=this.getTotalExpenses();
    if (this.request.Id==0){
      this.lockSaveItem=true;
      this.financialDetailService
      .create(this.request)
      .subscribe((res: any) => {
        this.request=res.Data;
        this.toastr.success("تم حفظ البيانات المالية بنجاح");
        this.lockSaveItem=false;

        this.router.navigate(['/pages/factory-landing/'+this.factoryId+'/'+this.periodId+'/'+this.approveStatusText]);

      });
    }
    else{
      this.lockSaveItem=true;

      this.financialDetailService
      .update(this.request)
      .subscribe((res: any) => {
        this.toastr.success("تم تعديل البيانات المالية بنجاح");
        this.lockSaveItem=false;

        this.router.navigate(['/pages/factory-landing/'+this.factoryId+'/'+this.periodId+'/'+this.approveStatusText]);

      });
    }
   
  }

  getTotalExpenses(){
    let total= this.request.FuelExpenses
    +this.request.WaterExpenses
    +this.request.EmploymentExpenses
    +this.request.RawMterialExpenses
    +this.request.ElectricityExpenses
    +this.request.OtherOperatingExpenses

    return total
  }

  onChange() {
    if (this.request.Revenues < this.min || this.request.Revenues > this.max) {
      // Handle validation error
      // For example, you can set a flag to display error message in the template
    } else {
      // Input is valid, handle accordingly
    }
  }
}
