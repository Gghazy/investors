import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActualProductionAndDesignedCapacityService } from 'src/app/modules/actual-production-and-designed-capacity/actual-production-and-designed-capacity.service';
import { ActualProductSearch } from 'src/app/modules/actual-production-and-designed-capacity/models/actual-product-search';
import { ActualProductModel } from 'src/app/modules/actual-production-and-designed-capacity/models/actual-product-model';
import { ResultResponse } from 'src/app/core/models/result-response';
import { ActualProductionAndDesignedCapacityModel } from '../../models/actual-production-and-designed-capacity.model';
import { ToastrService } from 'ngx-toastr';
import { InspectorActualProductionAndDesignedCapacityService } from '../../actual-production-and-designed-capacity.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { LookUpService } from 'src/app/core/service/look-up.service';
import { ReasonService } from 'src/app/modules/actual-production-and-designed-capacity/reason.service';
import { ReasonModel } from 'src/app/modules/actual-production-and-designed-capacity/models/reason-model';
import { PeriodService } from 'src/app/modules/period/period.service';

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
  reasons = new ReasonModel();
  Allreasons:any=[]
  PeriodName!:string
  reasonProduct=0;
  validProductList=true;
  constructor(
    private route: ActivatedRoute,
    private shared: SharedService,
    private ActualProductionService: ActualProductionAndDesignedCapacityService,
    private FormService: InspectorActualProductionAndDesignedCapacityService,
    private toastr: ToastrService,
    private lookUpService: LookUpService,
    private reasonService: ReasonService,
    private periodService : PeriodService,
    private router: Router,


    ){
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');
  }
  ngOnInit(): void {
    this.userId = this.shared.getUserId();
    this.getProduct();
   this.getperiod()
  }


  getProduct(){
    this.FormService
    .getProducts(this.factoryId, this.periodId,this.userId)
    .subscribe((res: any) => {
      this.products = res.Data;
      this.getOne()
      this.getAllReasons()
      console.log(this.products)
    });
  }

  getAllReasons() {
    this.lookUpService
      .getAllReasons()
      .subscribe((res: any) => {
        this.Allreasons = res.Data;
      });
  }
  NotValid()
  {
    this.validProductList=false;
  }
  Valid()
  {
    this.validProductList=true;
  }
  getOne() {
    this.reasonService
      .getOne(this.periodId,this.factoryId)
      .subscribe((res: any) => {
       if(res.Data.ReasonId!=null)
       {
        this.reasonProduct= res.Data.ReasonId
        this.products[0].IncreaseReasonId = res.Data.ReasonId;
       }
       else
        this.products[0].IncreaseReasonId = 0;
     
        console.log(this.products[0].IncreaseReasonId)
      });
  }
  onInputChange(product: Event): void {
    if(this.products[0].IsIncreaseReasonCorrect)
     { 
       this.products[0].IncreaseReasonCorrect=0
       this.Valid();

      }
    /*const target = event.target as HTMLInputElement;
    const closestRow = target.closest('.row');

    const showInputElement = closestRow?.querySelector('.show-input');

    if (showInputElement) {
      if (target.value == '0') {
        showInputElement.classList.remove('d-none');
      } else {
        showInputElement.classList.add('d-none');
      }
    }*/
  }
  getperiod(){
    this.periodService
    .getOne(this.periodId)
    .subscribe((res: any) => {
      
      this.PeriodName= res.Data.PeriodName;
    });
  }
  changereason(){
   
    this.reasonProduct=this.products[0].IncreaseReasonId
    this.Valid();
  }
  save(){
    if(!this.validProductList)
      {
        this.toastr.error("الرجاء التأكد من صحة البيانات المدخلة ")
        return
      }
    console.log(this.request)
    let count=this.products.length;
    this.products.forEach(element => {
      if(element.IsDesignedCapacityCorrect)
        {
          element.CorrectDesignedCapacity=0
 
        }
        if(element.IsActualProductionCorrect)
          {
            element.CorrectActualProduction=0
   
          }


      if(element.Id ==0){
        console.log(element)
        element.Comments = this.products[0].Comments
        element.IncreaseReason = this.products[0].IncreaseReason
        element.IncreaseReasonCorrect = this.products[0].IncreaseReasonCorrect
        element.IncreaseReasonId = this.products[0].IncreaseReasonId
        this.FormService
        .create(element)
        .subscribe((res: any) => {
          count--;
          if(count<=0)
            {
            this.toastr.success("تم الحفظ");
            this.router.navigate(['/pages/Inspector/visit-landing/'+this.factoryId+'/'+this.periodId]);
            }
        });
      }
      else{
        element.Comments = this.products[0].Comments
        element.IncreaseReason = this.products[0].IncreaseReason
        element.IncreaseReasonCorrect = this.products[0].IncreaseReasonCorrect
        element.IncreaseReasonId = this.products[0].IncreaseReasonId
        console.log(element)
      this.FormService
      .update(element)
      .subscribe((res: any) => {
        count--;
        if(count<=0)
          {
          this.toastr.success("تم الحفظ");
          this.router.navigate(['/pages/Inspector/visit-landing/'+this.factoryId+'/'+this.periodId]);
          }
      });
    }  
  });

  }
}
