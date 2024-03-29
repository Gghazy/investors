import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MonthlyFinancialService } from '../../monthly-financial.service';
import { PeriodService } from 'src/app/modules/period/period.service';
import { ToastrService } from 'ngx-toastr';
import { MonthlyFinancialModel } from '../../models/monthly-financial-model';

@Component({
  selector: 'app-monthly-financial-form',
  templateUrl: './monthly-financial-form.component.html',
  styleUrls: ['./monthly-financial-form.component.scss']
}) 
export class MonthlyFinancialFormComponent implements OnInit {
  factoryId: any;
  periodId: any;
  request = new MonthlyFinancialModel();

  constructor(
    private route: ActivatedRoute,
     private monthlyFinancialService: MonthlyFinancialService,
     private periodService: PeriodService,
     private toastr: ToastrService,
     private router: Router,
     ) {
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');
  }
  ngOnInit(): void {
    this.getFinancial()
  }


  getFinancial() {
    this.monthlyFinancialService
      .getOne(this.factoryId,this.periodId)
      .subscribe((res: any) => {
        this.request = res.Data;
      });
  }

  save(){
    
    this.request.FactoryId=this.factoryId;
    this.request.PeriodId=this.periodId;
    this.request.TotalExpenses=this.getTotalExpenses();
    if (this.request.Id==0){
      this.monthlyFinancialService
      .create(this.request)
      .subscribe((res: any) => {
        this.request=res.Data;
        this.toastr.success("تم الحفظ");
      });
    }
    else{
      this.monthlyFinancialService
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
}
