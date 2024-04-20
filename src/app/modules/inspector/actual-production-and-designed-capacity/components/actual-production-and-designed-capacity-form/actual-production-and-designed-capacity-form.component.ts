import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActualProductionAndDesignedCapacityService } from 'src/app/modules/actual-production-and-designed-capacity/actual-production-and-designed-capacity.service';
import { ActualProductSearch } from 'src/app/modules/actual-production-and-designed-capacity/models/actual-product-search';
import { ActualProductModel } from 'src/app/modules/actual-production-and-designed-capacity/models/actual-product-model';
import { ResultResponse } from 'src/app/core/models/result-response';
import { ActualProductionAndDesignedCapacityModel } from '../../models/actual-production-and-designed-capacity.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-actual-production-and-designed-capacity-form',
  templateUrl: './actual-production-and-designed-capacity-form.component.html',
  styleUrls: ['./actual-production-and-designed-capacity-form.component.scss']
})
export class ActualProductionAndDesignedCapacityFormComponent {
  factoryId:any;
  periodId:any;
  products = new ResultResponse<ActualProductModel>();
  search=new ActualProductSearch();
  request=new ActualProductionAndDesignedCapacityModel();
  
  constructor(
    private route: ActivatedRoute,
    private ActualProductionService: ActualProductionAndDesignedCapacityService,
    private FormService: ActualProductionAndDesignedCapacityService,
    private toastr: ToastrService,
    ){
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');
  }
  ngOnInit(): void {
    this.getLevel12Product();
  }
  getLevel12Product(){
    this.search.FactoryId=this.factoryId;
    this.search.PeriodId=this.periodId;
    this.ActualProductionService
    .getAllPagination(this.search)
    .subscribe((res: any) => {
      this.products = res.Data;
    });
  }
  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const closestRow = target.closest('.row');

    const showInputElement = closestRow?.querySelector('.show-input');

    if (showInputElement) {
      if (target.value == '0') {
        showInputElement.classList.remove('d-none');
      } else {
        showInputElement.classList.add('d-none');
      }
    }
  }

  save(){
    
    console.log(this.request)
    // this.FormService
    // .create(this.request)
    // .subscribe((res: any) => {
    //   this.toastr.success("تم الحفظ");
    // });

  }
}
