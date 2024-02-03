import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActualProductionAndDesignedCapacityService } from '../../actual-production-and-designed-capacity.service';
import { ActualProductModel } from '../models/actual-product-model';
import { LookUpModel } from 'src/app/core/models/look-up-model';
import { LookUpService } from 'src/app/core/service/look-up.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-actual-production-form',
  templateUrl: './actual-production-form.component.html',
  styleUrls: ['./actual-production-form.component.scss']
})
export class ActualProductionFormComponent implements OnInit {

@Input()factoryId!:number;
@Input()productId!:number;
@Input()monthId!:number;
request=new ActualProductModel();
units:LookUpModel[]=[];
@Output()close=new EventEmitter<boolean>();


constructor(
  private actualProductionAndDesignedCapacityService:ActualProductionAndDesignedCapacityService,
  private lookUpService:LookUpService,
  private toastr: ToastrService
  ){}

  ngOnInit(): void {
   this.getOne();
   this.getunits();
  }

  getOne(){
    
    this.actualProductionAndDesignedCapacityService
    .getOne(this.productId)
    .subscribe((res: any) => {
      debugger
      this.request = res.Data;
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
    debugger
    this.request.ProductId=this.productId;
    this.request.MonthId=this.monthId;
    if (this.productId==0){
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
