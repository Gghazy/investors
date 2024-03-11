import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductModel } from '../../models/product-model';
import { ResultResponse } from 'src/app/core/models/result-response';
import { ProductSearch } from '../../models/product-search';
import { ActivatedRoute } from '@angular/router';
import { FactoryProductService } from 'src/app/modules/factory-products/factory-product.service';
import { ProductPeriodActiveModel } from '../../models/product-period-active-model';
import { CustomsItemsUpdateService } from '../../customs-items-update.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-customer-update-list',
  templateUrl: './customer-update-list.component.html',
  styleUrls: ['./customer-update-list.component.scss']
})
export class CustomerUpdateListComponent implements OnInit {

  factoryId: any;
  periodId: any;
  search = new ProductSearch();
  products = new ResultResponse<ProductModel>();

  ProductPeriodActives:ProductPeriodActiveModel[]=[];

  constructor(
    private route: ActivatedRoute,
     private factoryProductService: FactoryProductService,
     private customsItemsUpdateService: CustomsItemsUpdateService,
     private toastr: ToastrService,

  ) {
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');
  }
  ngOnInit() {
    this.getProducts()
  }

    isChecked(item: ProductPeriodActiveModel): boolean {
            let x=this.ProductPeriodActives.filter(x=>x.FactoryProductId==item.FactoryProductId) as ProductPeriodActiveModel[];
      return x.length > 0;
    }

    handleCheckboxChange(productId: number) {
      
    let newObject: ProductPeriodActiveModel = {
      Id:0,
      PeriodId:parseInt(this.periodId),
      FactoryId:parseInt(this.factoryId),
      FactoryProductId:productId
    };
    if (this.isChecked(newObject)) {
      // Item is checked, remove it from the list
      this.ProductPeriodActives = this.ProductPeriodActives.filter(i => i.FactoryProductId !== newObject.FactoryProductId);
    } else {
      // Item is unchecked, add it to the list
      this.ProductPeriodActives.push(newObject);
    }
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
            FactoryProductId:obj.Id
          })
        });        
      });
  }
  pageChanged(data: any) {
    this.search.PageNumber = data;
    this.getProducts();

  }
 
  save(){
    
      this.customsItemsUpdateService
      .create(this.ProductPeriodActives)
      .subscribe((res: any) => {
        this.toastr.success("تم الحفظ");
      });
    
   
   
  }
}
