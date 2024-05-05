import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActualProductionAndDesignedCapacityService } from 'src/app/modules/actual-production-and-designed-capacity/actual-production-and-designed-capacity.service';
import { ActualProductSearch } from 'src/app/modules/actual-production-and-designed-capacity/models/actual-product-search';
import { ActualProductModel } from 'src/app/modules/actual-production-and-designed-capacity/models/actual-product-model';
import { ResultResponse } from 'src/app/core/models/result-response';
import { ActualProductionAndDesignedCapacityModel } from '../../models/actual-production-and-designed-capacity.model';
import { ToastrService } from 'ngx-toastr';
import { InspectorActualProductionAndDesignedCapacityService } from '../../actual-production-and-designed-capacity.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-actual-production-and-designed-capacity-form',
  templateUrl: './actual-production-and-designed-capacity-form.component.html',
  styleUrls: ['./actual-production-and-designed-capacity-form.component.scss']
})
export class ActualProductionAndDesignedCapacityFormComponent {
  factoryId:any;
  periodId:any;
  userId: any;
  products:ActualProductionAndDesignedCapacityModel[]= [];
  search=new ActualProductSearch();
  request=new ActualProductionAndDesignedCapacityModel();
  
  constructor(
    private route: ActivatedRoute,
    private shared: SharedService,
    private ActualProductionService: ActualProductionAndDesignedCapacityService,
    private FormService: InspectorActualProductionAndDesignedCapacityService,
    private toastr: ToastrService,
    ){
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');
  }
  ngOnInit(): void {
    this.userId = this.shared.getUserId();
    this.getProduct();
  }
  getProduct(){
    console.log(this.userId)
    this.FormService
    .getProducts(this.factoryId, this.periodId,this.userId)
    .subscribe((res: any) => {
      this.products = res.Data;
      console.log(res)
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

    this.products.forEach(element => {

      if(element.Id ==0){
        console.log(element)
        element.Comments = this.request.Comments
        element.IncreaseReason = this.request.IncreaseReason
        element.IncreaseReasonCorrect = this.request.IncreaseReasonCorrect
        element.IncreaseReasonId = this.request.IncreaseReasonId
        this.FormService
        .create(element)
        .subscribe((res: any) => {
        
        });
      }
      else{
        element.Comments = this.request.Comments
        element.IncreaseReason = this.request.IncreaseReason
        element.IncreaseReasonCorrect = this.request.IncreaseReasonCorrect
        element.IncreaseReasonId = this.request.IncreaseReasonId
        console.log(element)
      this.FormService
      .update(element)
      .subscribe((res: any) => {
       
      });
    }  
  });
  this.toastr.success("تم الحفظ");
  }
}
