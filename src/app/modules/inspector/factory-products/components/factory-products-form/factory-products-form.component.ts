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

@Component({
  selector: 'app-factory-products-form',
  templateUrl: './factory-products-form.component.html',
  styleUrls: ['./factory-products-form.component.scss']
})
export class FactoryProductsFormComponent implements OnInit {
  factoryId: any;
  periodId: any;
  src: any;
  search = new ProductSearch();
  Factoryproducts = new ProductModel();
  request:FactoryProductsModel [] = []
  constructor(
    private route: ActivatedRoute,
    private InspectorService: FactoryProductsService,
    private fileService: FileService,
     private toastr: ToastrService,
     private router: Router,
     ) {
    this.factoryId = this.route.snapshot.paramMap.get('id');
    this.periodId = this.route.snapshot.paramMap.get('periodid');
  }
  ngOnInit() {
    this.getProducts()
  }
  getProducts() {
    
    this.InspectorService
      .getProducts(this.factoryId,this.periodId)
      .subscribe((res: any) => {
        this.request = res.Data;
        console.log(res)
      });
  }
  pageChanged(data: any) {
    this.search.PageNumber = data;
    this.getProducts();

  }
  getFile(attachmentId:number){
    console.log(attachmentId)
    if(attachmentId==null){
      this.toastr.error("لا يوجد ملف");    }
    else{
      this.fileService.getImage(attachmentId).subscribe((res: any) => {
        this.src='data:image/jpeg;base64,'+res.Image
      });
    }
    
  }
  downloadattachment(data: any) {
    const blob = new Blob([data], { type: data.type });
    const url= window.URL.createObjectURL(blob);
    window.open(url)
  }
  savePhoto(file: any) {
    if (file.target.files.length > 0) {
      this.fileService
        .addFile(file.target.files[0])
        .subscribe((res: any) => {
          this.request[0].NewProductPhotoId = res.Data.Id
          console.log(this.request)

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

  save(){
  console.log(this.request)
  
  this.request.forEach(element => {
    if(element.Id ==0){
    
      this.InspectorService
      .create(element)
      .subscribe((res: any) => {
        this.router.navigate(['/pages/Inspector/visit-landing/'+this.factoryId+'/'+this.periodId]);
        
      
      });
    
  }
  else {
    this.InspectorService
    .update(element)
    .subscribe((res: any) => {
      this.router.navigate(['/pages/Inspector/visit-landing/'+this.factoryId+'/'+this.periodId]);
      
      
    });
    this.toastr.success("تم الحفظ");
  }
});

  }
  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const closestRow = target.closest('.row');
    console.log(closestRow)
//this.AddProduct(this.request,)
    const showInputElement = closestRow?.querySelector('.show-input');

    if (showInputElement) {
      if (target.value === 'no') {
        showInputElement.classList.remove('d-none');
      } else {
        showInputElement.classList.add('d-none');
      }
    }
  }
}
