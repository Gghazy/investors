import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductModel } from '../../models/product-model';
import { ResultResponse } from 'src/app/core/models/result-response';
import { ProductSearch } from '../../models/product-search';
import { ActivatedRoute, Router } from '@angular/router';
import { FactoryProductService } from 'src/app/modules/factory-products/factory-product.service';
import { ProductPeriodActiveModel } from '../../models/product-period-active-model';
import { CustomsItemsUpdateService } from '../../customs-items-update.service';
import { ToastrService } from 'ngx-toastr';
import { PeriodService } from 'src/app/modules/period/period.service';
import {ParamService}from 'src/app/core/service/paramService'

@Component({
  selector: 'app-customer-update-list',
  templateUrl: './customer-update-list.component.html',
  styleUrls: ['./customer-update-list.component.scss']
})
export class CustomerUpdateListComponent implements OnInit {

  factoryId: any;
  periodId: any;
  approveStatus:boolean;
  approveStatusText:any;
  search = new ProductSearch();
  products = new ResultResponse<ProductModel>();
PeriodName!:string
year!:number;
  ProductPeriodActives:ProductPeriodActiveModel[]=[];
  lockSaveItem=false;
  constructor(
    private router: Router,

    private route: ActivatedRoute,
     private factoryProductService: FactoryProductService,
     private customsItemsUpdateService: CustomsItemsUpdateService,
     private toastr: ToastrService,
     private periodService : PeriodService,
     private paramService: ParamService,


  ) {
    this.factoryId = paramService.getfactoryId();
    this.periodId = paramService.getperiodId();
    this.approveStatus=paramService.getstatus()
  }
  ngOnInit() {
    this.getProducts()
    this.getperiod()
  }

    isChecked(item: ProductPeriodActiveModel): boolean {
            let x=this.ProductPeriodActives.filter(x=>x.ProductId==item.ProductId) as ProductPeriodActiveModel[];
      return x.length > 0;
    }

    handleCheckboxChange(productId: number) {
      
    let newObject: ProductPeriodActiveModel = {
      Id:0,
      PeriodId:parseInt(this.periodId),
      FactoryId:parseInt(this.factoryId),
      ProductId:productId
    };
    if (this.isChecked(newObject)) {
      // Item is checked, remove it from the list
      this.ProductPeriodActives = this.ProductPeriodActives.filter(i => i.ProductId !== newObject.ProductId);
    } else {
      // Item is unchecked, add it to the list
      this.ProductPeriodActives.push(newObject);
    }
  }
  getperiod(){
    this.periodService
    .getOne(this.periodId)
    .subscribe((res: any) => {
      this.year = res.Data.Year -1;
      this.PeriodName= res.Data.PeriodName;
    });
  }
  getProducts() {

    this.search.FactoryId = this.factoryId;
    this.search.PeriodId = parseInt(this.periodId);
    this.factoryProductService
      .getAllPagination(this.search)
      .subscribe((res: any) => {
        this.products = res.Data;
        let activeProducts=this.products.Items.filter(x=>x.IsActive);
        activeProducts.forEach((obj) => {
          this.ProductPeriodActives.push({
            Id:0,
            PeriodId:parseInt(this.periodId),
            FactoryId:parseInt(this.factoryId),
            ProductId:obj.Id
          })
        });        
      });
  }
  pageChanged(data: any) {
    this.search.PageNumber = data;
    this.getProducts();

  }
 
  save(){
   
    if(this.ProductPeriodActives.length<=0)
    { this.toastr.error( ' الرجاء إختيار بند جمركي واحد على الأقل ');
    return;
    }
    if(this.lockSaveItem)
      {
          this.toastr.error("عملية حفظ/تعديل البند الجمركي قيد التنفيذ")
          return
          
      }
    this.lockSaveItem=true;
      this.customsItemsUpdateService
      .create(this.ProductPeriodActives)
      .subscribe((res: any) => {
        this.lockSaveItem=false
        this.toastr.success("تم تحديث البند الجمركي بنجاح");
        this.router.navigate(['/pages/factory-landing/'+this.factoryId+'/'+this.periodId+'/'+this.approveStatusText]);

      });
    
   
   
  }
}
