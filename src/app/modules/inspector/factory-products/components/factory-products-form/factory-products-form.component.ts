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
  Factoryproducts = new ResultResponse<ProductModel>();
  request = new FactoryProductsModel();
  constructor(
    private route: ActivatedRoute,
    private factoryProductService: FactoryProductService,
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
    
    this.search.FactoryId = this.factoryId;
    this.search.PeriodId = this.periodId;
    this.search.IsActive = true;
    this.factoryProductService
      .getAllPagination(this.search)
      .subscribe((res: any) => {
        this.Factoryproducts = res.Data;
        console.log(this.Factoryproducts)
      });
  }
  pageChanged(data: any) {
    this.search.PageNumber = data;
    this.getProducts();

  }
  getFile(attachmentId:number){
    if(attachmentId==null){
      this.toastr.error("لا يوجد ملف");    }
    else{
      this.fileService.downloadTempelete(attachmentId).subscribe((res: any) => {
        this.downloadattachment(res)    
      });
    }
    
  }
  downloadattachment(data: any) {
    const blob = new Blob([data], { type: data.type });
    const url= window.URL.createObjectURL(blob);
    this.src=url
  }

  save(){
  console.log(this.request)
 this.InspectorService
    .create(this.request)
    .subscribe((res: any) => {
      this.router.navigate(['/pages/Inspector/visit-landing/'+this.factoryId+'/'+this.periodId]);
      
      this.toastr.success("تم الحفظ");
    });


  }
  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const closestRow = target.closest('.row');

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
