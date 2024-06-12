import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActualProductionAndDesignedCapacityService } from '../../actual-production-and-designed-capacity.service';
import { ActualProductModel } from '../../models/actual-product-model';
import { LookUpModel } from 'src/app/core/models/look-up-model';
import { LookUpService } from 'src/app/core/service/look-up.service';
import { ToastrService } from 'ngx-toastr';
import { FactoryProductService } from 'src/app/modules/factory-products/factory-product.service';
import { ProductModel } from 'src/app/modules/customs-items-update/models/product-model';

@Component({
  selector: 'app-actual-production-form',
  templateUrl: './actual-production-form.component.html',
  styleUrls: ['./actual-production-form.component.scss']
})
export class ActualProductionFormComponent implements OnInit {

@Input()factoryId!:number;
@Input()factoryStatus!:number;
@Input()productId!:number;
@Input()actualproductId!:number | undefined;
@Input()actualCapacityProductId!:number|undefined;
@Input()periodId!:number;
request=new ActualProductModel();
units:LookUpModel[]=[];
@Output()close=new EventEmitter<boolean>();
product!:ProductModel;


constructor(
  private actualProductionAndDesignedCapacityService:ActualProductionAndDesignedCapacityService,
  private lookUpService:LookUpService,
  private toastr: ToastrService,
  private factoryProductService: FactoryProductService,
  ){}

  ngOnInit(): void {
   this.getOne();
   this.getunits();
   this.getProduct();
  }

  getOne(){
    
    this.actualProductionAndDesignedCapacityService
    .getOne(this.actualproductId)
    .subscribe((res: any) => {
      
      this.request = res.Data;
console.log(this.request)
      
    });
  }
  getProduct(){
    this.factoryProductService
      .getOne(this.productId)
      .subscribe((res: any) => {

        this.product = res.Data;
        this.request.DesignedCapacityUnitId=this.product.UnitId;
        this.request.ActualProductionUintId=this.product.UnitId;

      });
  }
  getunits(){
    this.lookUpService
    .getAllUnits()
    .subscribe((res: any) => {
      this.units = res.Data;
    });
  }
  save(){
    
    this.request.FactoryProductId=this.productId;
    this.request.PeriodId=this.periodId;
    this.request.FactoryId=this.factoryId;
    if (this.actualCapacityProductId==0){
      this.actualProductionAndDesignedCapacityService
      .create(this.request)
      .subscribe((res: any) => {
        this.close.emit(true);
        this.toastr.success("تم الحفظ");
      });
    }
    else{
      this.actualProductionAndDesignedCapacityService
      .update(this.request)
      .subscribe((res: any) => {
        this.close.emit(true);
        this.toastr.success("تم الحفظ");
      });
    }
  }

}
