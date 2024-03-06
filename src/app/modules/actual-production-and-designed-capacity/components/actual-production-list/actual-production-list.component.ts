import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActualProductModel } from '../../models/actual-product-model';
import { ResultResponse } from 'src/app/core/models/result-response';
import { ActualProductionAndDesignedCapacityService } from '../../actual-production-and-designed-capacity.service';
import { ActualProductSearch } from '../../models/actual-product-search';
import { BasicInfoService } from 'src/app/modules/basic-info/basic-info.service';

@Component({
  selector: 'app-actual-production-list',
  templateUrl: './actual-production-list.component.html',
  styleUrls: ['./actual-production-list.component.scss']
})
export class ActualProductionListComponent implements OnInit {
  factoryId:any;
  periodId:any;
  products = new ResultResponse<ActualProductModel>();
  search=new ActualProductSearch();
  actualCapacityProductId!:number |undefined;
  productId!:number |undefined;
  factoryStatus!:number;

  @ViewChild('closeModal') Modal!: ElementRef;

  constructor(
    private route: ActivatedRoute,
    private ActualProductionService: ActualProductionAndDesignedCapacityService,
    private basicInfoService: BasicInfoService,
    ){
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');
  }
  ngOnInit(): void {
    this.getLevel12Product();
    this.getBasicInfo();
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
  pageChanged(data:any){
    this.search.PageNumber=data;
    this.getLevel12Product();

  }

  getBasicInfo() {
    this.basicInfoService
      .getOne(this.factoryId,this.periodId)
      .subscribe((res: any) => {
        this.factoryStatus = res.Data.Status;
      });
  }
  edit(id: number,productId:number) {
    this.actualCapacityProductId = id;
    this.productId = productId;
  }
  closePopUp(){
    this.actualCapacityProductId=undefined
    this.productId=undefined
    this.Modal.nativeElement.click()
    this.getLevel12Product();
  }

}
