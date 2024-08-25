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
import {ParamService}from 'src/app/core/service/paramService'

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
  validProductList=true;
  inspectorApproved=false;
  constructor(
    private route: ActivatedRoute,
    private InspectorService: FactoryProductsService,
    private shared: SharedService,
    private fileService: FileService,
     private toastr: ToastrService,
     private router: Router,
     private periodService : PeriodService,
     private paramService: ParamService


     ) {
      this.factoryId = paramService.getfactoryId();
      this.periodId = paramService.getperiodId();
      this.inspectorApproved=paramService.getInspectorStatus()
  }
  ngOnInit() {
    if( this.factoryId==null||this.periodId==null)
      {
        this.router.navigate(['error']);
        return
      }
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
      const fileImage = file.target.files[0];
    const maxFileSize = 5 * 1024 * 1024; // 5 MB in bytes
    if (fileImage.size > maxFileSize) {
      // If the file is larger than 5 MB
      this.toastr.error (' 5MB حجم الملف أكبر من');
            console.error(' 5MB حجم الملف أكبر من');
            
    }
    else {
      const file1 = file.target.files[0];
      const fileType = file1.type;
       let validType=false;
      if (type == 'photo')
      {
        if (!(fileType === 'image/png' || fileType === 'image/jpeg') )
        {
          this.toastr.error (' الرجاء رفع المستند بالصيغة jpeg , jpg , png ');
          validType=false;
        }
        else
        {
          validType=true;
        }
      }
      else
      if (type == 'paper')
      {
      const validFileTypes = ['application/pdf'];
      if (!validFileTypes.includes(fileType)) 
      {
        this.toastr.error (' الرجاء رفع المستند بالصيغة  pdf');
          validType=false;
        
      }
      else
          validType=true;
       }
      if(validType)
      {


      this.fileService
        .addFile(file.target.files[0])
        .subscribe((res: any) => {
        
          if (type == 'photo') {
            this.request[i].NewProductPhotoId = res.Data.Id
            this.toastr.success( " تم إرفاق صورة المنتج"+"("+this.request[i].ProductName+")");
          } else if (type == 'paper') {
            this.request[i].NewProductPaperId = res.Data.Id
            this.toastr.success( " تم إرفاق ورقة البيانات للمنتج"+"("+this.request[i].ProductName+")");
          }
        

          this.Valid()
        });
    }
  }
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
  create(element:any,count:number)
  {
    this.InspectorService
    .create(element)
    .subscribe((res: any) => {
      count--;
     
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
  save(){

    if(!this.validProductList)
    {
      this.toastr.error("الرجاء التأكد من صحة البيانات المدخلة ")
      return
    }
  console.log(this.request)
  let count=this.request.length;
 let newProduct:FactoryProductsModel [] = []
 let UpdateProduct:FactoryProductsModel [] = []


  this.request.forEach(element => {
    
    element.Comments=  this.request[0].Comments
    if(element.IsProductPhotoCorrect)
    {
      element.NewProductPaperId=0
      element.NewProductPhotoId=0
    }
    if(element.Id ==0)
    {
    
      this.InspectorService
      .create(element)
      .subscribe((res: any) => {
        count--;
        if(count<=0)
          {
            this.toastr.success(" تم حفظ بيانات المنتجات بنجاح");
            this.router.navigate(['/pages/Inspector/visit-landing']);
          }
      });
    }

  else {
    element.Comments=  this.request[0].Comments
    this.InspectorService
    .update(element)
    .subscribe((res: any) => {
     count--;
     if(count<=0)
      {
        this.toastr.success(" تم حفظ بيانات المنتجات بنجاح");
        this.router.navigate(['/pages/Inspector/visit-landing']);
      }
    });
     
  }
});

    
  }


deleteImage(product:FactoryProductsModel,i:number){
console.log(product)
this.request[i].NewProductPhotoId=0
this.toastr.success( " تم حذف  صورة المنتج"+"("+ product.ProductName+")");

}

deleteFile(product:FactoryProductsModel,i:number){
  console.log(product)
  this.request[i].NewProductPaperId=0
  this.toastr.success( " تم حذف ورقة بيانات المنتج"+"("+ product.ProductName+")");
}
  onInputChange(event: Event): void {
    this.validProductList=true;
    
      //     if (target.value === 'no') {
      //   showInputElement.classList.remove('d-none');
      // } else {
      //   showInputElement.classList.add('d-none');
      // }
   
  }
}
