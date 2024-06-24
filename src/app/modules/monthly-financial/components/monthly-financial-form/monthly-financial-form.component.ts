import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MonthlyFinancialService } from '../../monthly-financial.service';
import { PeriodService } from 'src/app/modules/period/period.service';
import { ToastrService } from 'ngx-toastr';
import { MonthlyFinancialModel } from '../../models/monthly-financial-model';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-monthly-financial-form',
  templateUrl: './monthly-financial-form.component.html',
  styleUrls: ['./monthly-financial-form.component.scss']
}) 
export class MonthlyFinancialFormComponent implements OnInit {
  isDisabled!:boolean;
  factoryId: any;
  periodId: any;
  request = new MonthlyFinancialModel();
PeriodName!:string
lockSaveItem=false;
  constructor(
    private route: ActivatedRoute,
     private monthlyFinancialService: MonthlyFinancialService,
     private periodService: PeriodService,
     private toastr: ToastrService,
     private sharedService: SharedService,
     private router: Router,

     ) {
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');
  }
  ngOnInit(): void {
    this.ToggleDisable()
    this.getFinancial()
    this.getperiod()
  }
  getperiod(){
    this.periodService
    .getOne(this.periodId)
    .subscribe((res: any) => {
      
      this.PeriodName= res.Data.PeriodName;
    });
  }
  ToggleDisable() {
    let userId=  this.sharedService.getUserId()

   this.isDisabled= this.sharedService.toggleDisable(this.factoryId,this.periodId,userId)
  
  }
  getFinancial() {
    this.monthlyFinancialService
      .getOne(this.factoryId,this.periodId)
      .subscribe((res: any) => {
        this.request = res.Data;
      });
  }

  save(){
    if(this.lockSaveItem)
      {
          this.toastr.error("عملية حفظ/تعديل البيانات المالية قيد التنفيذ")
          return
          
      }
    this.request.FactoryId=this.factoryId;
    this.request.PeriodId=this.periodId;
    this.request.TotalExpenses=this.getTotalExpenses();
    if (this.request.Id==0){
      this.lockSaveItem=true;

      this.monthlyFinancialService
      .create(this.request)
      .subscribe((res: any) => {
        this.request=res.Data;
        this.toastr.success("تم حفظ البيانات المالية بنجاح");
        this.lockSaveItem=false;

        this.router.navigate(['/pages/factory-landing/'+this.factoryId+'/'+this.periodId]);

      });
    }
    else{
      this.lockSaveItem=true;

      this.monthlyFinancialService
      .update(this.request)
      .subscribe((res: any) => {
        this.toastr.success("تم تعديل البيانات المالية بنجاح");
        this.lockSaveItem=false;

        this.router.navigate(['/pages/factory-landing/'+this.factoryId+'/'+this.periodId]);

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
}
