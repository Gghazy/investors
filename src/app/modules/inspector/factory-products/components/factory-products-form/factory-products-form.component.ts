import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResultResponse } from 'src/app/core/models/result-response';
import { FileService } from 'src/app/core/service/file.service';
import { ProductModel } from 'src/app/modules/customs-items-update/models/product-model';
import { ProductSearch } from 'src/app/modules/customs-items-update/models/product-search';
import { FactoryProductService } from 'src/app/modules/factory-products/factory-product.service';
import { FactoryProductsModel } from '../../models/factory-products.model';
import { FactoryProductsService } from '../../factory-products.service';
import { SharedService } from 'src/app/shared/services/shared.service';
import { PeriodService } from 'src/app/modules/period/period.service';

@Component({
  selector: 'app-factory-products-form',
  templateUrl: './factory-products-form.component.html',
  styleUrls: ['./factory-products-form.component.scss']
})
export class FactoryProductsFormComponent implements OnInit {
  factoryId: any;
  periodId: any;
  userId: any;
  src: any;
  search = new ProductSearch();
  Factoryproducts = new ProductModel();
  request:FactoryProductsModel [] = []
  PeriodName!:string
  constructor(
    private route: ActivatedRoute,
    private InspectorService: FactoryProductsService,
    private shared: SharedService,
    private fileService: FileService,
     private toastr: ToastrService,
     private router: Router,
     private periodService : PeriodService,

     ) {
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');
  }
  ngOnInit() {
    this.userId = this.shared.getUserId();
    this.getProducts()
    this.getperiod()
  }
  getProducts() {
    
    this.InspectorService
      .getProducts(this.factoryId,this.periodId,this.userId)
      .subscribe((res: any) => {
        this.request = res.Data;
        console.log(res)
      });
  }
  pageChanged(data: any) {
    this.search.PageNumber = data;
    this.getProducts();

  }
  getImage(attachmentId:number){
    this.src= ""
    console.log(attachmentId)
    if(attachmentId==0){
      this.toastr.error("لا يوجد صورة");    }
    else{
      this.fileService.getImage(attachmentId).subscribe((res: any) => {
        this.src='data:image/jpeg;base64,'+res.Image
      });
    }
    
  }


  getFile(attachmentId:number){
    if(attachmentId==0){
      this.toastr.error("لا يوجد ملف");    }
    else{
    this.fileService.downloadTempelete(attachmentId).subscribe((res: any) => {
      this.downloadattachment(res)    });
    }
  }
  downloadattachment(data: any) {
    const blob = new Blob([data], { type: data.type });
    const url= window.URL.createObjectURL(blob);
    window.open(url);
  }
  saveAttachment(file: any, i :number,type: string) {
console.log(type)
    if (file.target.files.length > 0) {
      this.fileService
        .addFile(file.target.files[0])
        .subscribe((res: any) => {
        
          if (type == 'photo') {
            this.request[i].NewProductPhotoId = res.Data.Id
          } else if (type == 'paper') {
            this.request[i].NewProductPaperId = res.Data.Id
          }

        });
    }
  }


  AddProduct(row:FactoryProductsModel,product:ProductModel){
this.request.forEach(element => {
 
    this.InspectorService
    .create(element)
    .subscribe((res: any) => {
    });
     
});
    console.log(row)
  }
  getperiod(){
    this.periodService
    .getOne(this.periodId)
    .subscribe((res: any) => {
      
      this.PeriodName= res.Data.PeriodName;
    });
  }
  save(){
  console.log(this.request)
 
  this.request.forEach(element => {
    if(element.Id ==0){
    element.Comments=  this.request[0].Comments
      this.InspectorService
      .create(element)
      .subscribe((res: any) => {
       
      });
    
  }
  else {
    element.Comments=  this.request[0].Comments
    this.InspectorService
    .update(element)
    .subscribe((res: any) => {
      
      
    });
     
  }
});
this.toastr.success("تم الحفظ");
    this.router.navigate(['/pages/Inspector/visit-landing/'+this.factoryId+'/'+this.periodId]);
    
  }


deleteImage(product:FactoryProductsModel,i:number){
console.log(product)
this.request[i].NewProductPhotoId=0
this.toastr.success("تم الحذف  ");  
}

deleteFile(product:FactoryProductsModel,i:number){
  console.log(product)
  this.request[i].NewProductPaperId=0
  this.toastr.success("تم الحذف  ");  
  }
  onInputChange(event: Event): void {
      //     if (target.value === 'no') {
      //   showInputElement.classList.remove('d-none');
      // } else {
      //   showInputElement.classList.add('d-none');
      // }
   
  }
}
