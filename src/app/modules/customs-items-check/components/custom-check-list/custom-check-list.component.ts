import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResultResponse } from 'src/app/core/models/result-response';
import { ProductModel } from 'src/app/modules/customs-items-update/models/product-model';
import { ProductSearch } from 'src/app/modules/customs-items-update/models/product-search';
import { CustomsItemsCheckService } from '../../customs-items-check.service';

@Component({
  selector: 'app-custom-check-list',
  templateUrl: './custom-check-list.component.html',
  styleUrls: ['./custom-check-list.component.scss']
})
export class CustomCheckListComponent {
  factoryId:any;
  periodId:any;
  search=new ProductSearch(); 
  products = new ResultResponse<ProductModel>();
  parentName!:string;
  parentId!:number;
  productId!:number;
  @ViewChild('closeModal') Modal!: ElementRef

  constructor(private route: ActivatedRoute,private customsItemsCheckService:CustomsItemsCheckService){
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');
  }

  ngOnInit() {
    this.getProducts()
  }
 

  getProducts() { 
    
    this.search.FactoryId=this.factoryId;
    this.customsItemsCheckService
      .getAllCheckLevel(this.search)
      .subscribe((res: any) => {
        this.products = res.Data;
      });
  }
  pageChanged(data:any){
    this.search.PageNumber=data;
    this.getProducts();

  }
  selectLevel(productId:number,productName:string,parentId:number){
    this.productId=productId;
    this.parentName=productName;
    this.parentId=parentId;
  }
  saveChanage(){
    this.parentName="";
    this.productId=0;
    this.Modal.nativeElement.click()
    this.getProducts();
    
  }
}
