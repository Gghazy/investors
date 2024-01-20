import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fade } from 'src/app/shared/animation/app.animation';
import { FinancialModel } from '../../Models/financial-model';
import { FinancialDetailService } from '../../financial-detail.service';
import { ToastrService } from 'ngx-toastr';

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
  request = new FinancialModel();

  constructor(
    private route: ActivatedRoute,
     private financialDetailService: FinancialDetailService,
     private toastr: ToastrService,
     private router: Router,
     ) {
    this.factoryId = this.route.snapshot.paramMap.get('id');
  }
  ngOnInit(): void {
    this.getFinancial();
  }

  getFinancial() {
    this.financialDetailService
      .getOne(this.factoryId)
      .subscribe((res: any) => {
        debugger
        this.request = res.Data;
      });
  }

  save(){
    this.request.FactoryId=this.factoryId;
    this.request.TotalExpenses=50000;
    if (this.request.Id==0){
      this.financialDetailService
      .create(this.request)
      .subscribe((res: any) => {
        this.request=res.Data;
        this.router.navigate(['/pages/factory-landing/'+this.factoryId]);
        this.toastr.success("تم الحفظ");
      });
    }
    else{
      this.financialDetailService
      .update(this.request)
      .subscribe((res: any) => {
        this.router.navigate(['/pages/factory-landing/'+this.factoryId]);
        this.toastr.success("تم الحفظ");
      });
    }
   
  }
}
