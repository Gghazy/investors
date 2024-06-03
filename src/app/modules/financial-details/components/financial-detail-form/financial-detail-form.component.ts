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
     ) {
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');
  }
  ngOnInit(): void {
    this.ToggleDisable()
    this.getperiod()
    this.getBasicInfo()
    console.log(this.isDisabled)
  }

  getperiod(){
    this.periodService
    .getOne(this.periodId)
    .subscribe((res: any) => {
      
      this.year = res.Data.Year -1;
      this.getFinancial()
    });
  }


  ToggleDisable() {
    let userId=  this.sharedService.getUserId()
    this.factoryLandingService
      .checkSataus(this.factoryId, this.periodId,userId)
      .subscribe((res: any) => {

        this.isDisabled=res.Data.isDisable
        console.log(this.isDisabled)
      });
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
    
    this.request.FactoryId=this.factoryId;
    this.request.Year=this.year;
    this.request.TotalExpenses=this.getTotalExpenses();
    if (this.request.Id==0){
      this.financialDetailService
      .create(this.request)
      .subscribe((res: any) => {
        this.request=res.Data;
        this.toastr.success("تم الحفظ");
      });
    }
    else{
      this.financialDetailService
      .update(this.request)
      .subscribe((res: any) => {
        this.toastr.success("تم الحفظ");
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
