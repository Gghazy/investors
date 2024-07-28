import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActualProductModel } from '../../models/actual-product-model';
import { ResultResponse } from 'src/app/core/models/result-response';
import { ActualProductionAndDesignedCapacityService } from '../../actual-production-and-designed-capacity.service';
import { ActualProductSearch } from '../../models/actual-product-search';
import { BasicInfoService } from 'src/app/modules/basic-info/basic-info.service';
import { PeriodService } from 'src/app/modules/period/period.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-actual-production-list',
  templateUrl: './actual-production-list.component.html',
  styleUrls: ['./actual-production-list.component.scss']
})
export class ActualProductionListComponent implements OnInit {
  factoryId:any;
  periodId:any;
  approveStatus:boolean;
  approveStatusText:any;
  products = new ResultResponse<ActualProductModel>();
  search=new ActualProductSearch();
  actualCapacityProductId!:number |undefined;
  actualproductId!:number |undefined;
  productId!:number |undefined;
  factoryStatus!:number;
  PeriodName!:string;
  year!:number;
  @ViewChild('closeModal') Modal!: ElementRef;
  showReason: boolean = false
  constructor(
    private route: ActivatedRoute,
    private ActualProductionService: ActualProductionAndDesignedCapacityService,
    private basicInfoService: BasicInfoService,
    private toastr: ToastrService,
    private router: Router,
    private periodService : PeriodService, 
    ){
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');
    this.approveStatusText = this.route.snapshot.paramMap.get('isApproveStatus');
    if(this.approveStatusText=='3')
      this.approveStatus=true;
    else
    this.approveStatus=false;
  }
  ngOnInit(): void {
    this.getLevel12Product();
    this.getBasicInfo();
    this.getperiod()
  }

  getLevel12Product(){
    this.search.FactoryId=this.factoryId;
    this.search.PeriodId=this.periodId;
    this.ActualProductionService
    .getAllPagination(this.search)
    .subscribe((res: any) => {
      
      this.products = res.Data;
      console.log(this.products)
      this.showReason = false;
      
      this.products.Items.forEach((element:any) => {
       
        if (element.ActualProduction > element.DesignedCapacity){
      
          this.showReason = true
          return
         }
      });
     
    });
  }
  getperiod(){
    this.periodService
    .getOne(this.periodId)
    .subscribe((res: any) => {
      this.year = res.Data.Year -1;
      this.PeriodName= res.Data.PeriodName;
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
  edit(id: number,productId:number,pid:number) {
    this.actualCapacityProductId = id;
    this.productId = productId;
    this.actualproductId = pid;
   
  }
  closePopUp(){
    this.actualCapacityProductId=undefined
    this.productId=undefined
    this.Modal.nativeElement.click()
    this.getLevel12Product();
  }
save(){
  this.toastr.success("تم الحفظ");
  this.router.navigate(['/pages/factory-landing/'+this.factoryId+'/'+this.periodId+'/'+this.approveStatusText]);

}
}
